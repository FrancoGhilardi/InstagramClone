import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../../domain/models/Post";
import { PostsRepositoryImpl } from "../../../data/repositories/postsRepositoryImpl";

type PostsState = {
  posts: Post[];
  loading: boolean;
  error: string | null;
  refreshing: boolean;
  page: number;
  hasMore: boolean;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
  refreshing: false,
  page: 1,
  hasMore: true,
};

// Fetch inicial
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

// Cargar más posts (paginación)
export const fetchMorePosts = createAsyncThunk(
  "posts/fetchMorePosts",
  async (page: number, { rejectWithValue }) => {
    try {
      const repo = new PostsRepositoryImpl();
      const data = await repo.getPosts();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    startRefreshing: (state) => {
      state.refreshing = true;
    },
    stopRefreshing: (state) => {
      state.refreshing = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch inicial
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

      // Fetch paginación
      .addCase(fetchMorePosts.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
          state.hasMore = false;
        } else {
          state.posts = [...state.posts, ...action.payload];
          state.page += 1;
        }
      });
  },
});

export const { startRefreshing, stopRefreshing } = postsSlice.actions;
export default postsSlice.reducer;
