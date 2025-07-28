import { configureStore } from "@reduxjs/toolkit";
import { postsPersistenceMiddleware } from "./middleware/postPersistence";
import {
  commentsReducer,
  postActionsReducer,
  postsReducer,
  savedPostsReducer,
} from "@src/features/posts/redux";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    savedPosts: savedPostsReducer,
    postActions: postActionsReducer,
    comments: commentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(postsPersistenceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
