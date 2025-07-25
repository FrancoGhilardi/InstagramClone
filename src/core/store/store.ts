import { configureStore } from "@reduxjs/toolkit";
import savedPostsReducer from "../../features/posts/redux/savedPostsSlice";

export const store = configureStore({
  reducer: {
    savedPosts: savedPostsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
