import { Middleware } from "@reduxjs/toolkit";
import { PostsStorage } from "../../storage/postStorage";

export const postsPersistenceMiddleware: Middleware =
  (store) => (next) => async (action) => {
    const result = next(action);

    // Guardamos solo si es una acción relevante
    if (
      action.type.includes("posts/toggleLike") ||
      action.type.includes("posts/toggleSave")
    ) {
      const state = store.getState();
      await PostsStorage.savePosts(state.posts.posts);
    }

    return result;
  };
