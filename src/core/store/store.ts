import { configureStore } from "@reduxjs/toolkit";
import savedPostsReducer from "../../features/posts/redux/savedPostsSlice";
import postsReducer from "../../features/posts/redux/postsSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    savedPosts: savedPostsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
