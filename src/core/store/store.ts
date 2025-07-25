import { configureStore } from "@reduxjs/toolkit";
import savedPostsReducer from "../../features/posts/redux/savedPostsSlice";
import postsReducer from "../../features/posts/redux/postsSlice";
import postActionsReducer from "../../features/posts/redux/postActionSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    savedPosts: savedPostsReducer,
    postActions: postActionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
