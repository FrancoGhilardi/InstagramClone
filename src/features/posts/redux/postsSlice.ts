import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../../domain/models/Post";
import { PostsRepositoryImpl } from "../../../data/repositories/postsRepositoryImpl";
import { PostsStorage } from "../../../core/storage/postStorage";

type PostsState = {
  posts: Post[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  refreshing: false,
  error: null,
  page: 1,
  hasMore: true,
};

// Cargar posts desde API (inicio)
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const repo = new PostsRepositoryImpl();
      return await repo.getPosts(); // Devuelve la primera página de posts
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Cargar más posts (paginación)
export const fetchMorePosts = createAsyncThunk(
  "posts/fetchMorePosts",
  async (page: number, { rejectWithValue }) => {
    try {
      const repo = new PostsRepositoryImpl();
      // Para un endpoint real, aquí se haría algo como repo.getPosts(page)
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
    startRefreshing: (state) => {
      state.refreshing = true;
    },
    stopRefreshing: (state) => {
      state.refreshing = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.page = 1;
        state.hasMore = true;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchMorePosts
      .addCase(fetchMorePosts.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
          state.hasMore = false;
        } else {
          state.posts = [...state.posts, ...action.payload];
          state.page += 1;
        }
      })

      // loadPostsFromStorage
      .addCase(loadPostsFromStorage.fulfilled, (state, action) => {
        if (action.payload.length > 0) {
          state.posts = action.payload;
        }
      });
  },
});

export const { toggleLike, toggleSave, startRefreshing, stopRefreshing } =
  postsSlice.actions;
export default postsSlice.reducer;
