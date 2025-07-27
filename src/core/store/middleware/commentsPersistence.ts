import { Middleware } from "@reduxjs/toolkit";
import { commentsStorage } from "../../storage/commentsStorage";

export const commentsPersistenceMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);

    // Persistir solo si la acción es sobre comentarios
    if (action.type.startsWith("comments/")) {
      const comments = store.getState().comments;
      commentsStorage.save(comments);
    }

    return result;
  };
