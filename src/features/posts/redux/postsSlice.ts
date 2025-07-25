import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../../domain/models/Post";
import { PostsRepositoryImpl } from "../../../data/repositories/postsRepositoryImpl";

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

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default postsSlice.reducer;
