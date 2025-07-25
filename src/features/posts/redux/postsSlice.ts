import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../../domain/models/Post";
import { PostsRepositoryImpl } from "../../../data/repositories/postsRepositoryImpl";
import { PostsStorage } from "../../../core/storage/postStorage";

type PostsState = {
  posts: Post[];
  loading: boolean;
  error: string | null;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

// Cargar posts desde API
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const repo = new PostsRepositoryImpl();
      return await repo.getPosts();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Cargar estado persistido desde AsyncStorage
export const loadPostsFromStorage = createAsyncThunk(
  "posts/loadPostsFromStorage",
  async (_, { rejectWithValue }) => {
    try {
      const localData = await PostsStorage.loadPosts();
      return localData || [];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
      }
    },
    toggleSave: (state, action: PayloadAction<string>) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        post.saved = !post.saved;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        // Si no hay datos en AsyncStorage, usar los del JSON
        if (state.posts.length === 0) {
          state.posts = action.payload;
        }
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loadPostsFromStorage.fulfilled, (state, action) => {
        if (action.payload.length > 0) {
          state.posts = action.payload;
        }
      });
  },
});

export const { toggleLike, toggleSave } = postsSlice.actions;
export default postsSlice.reducer;
