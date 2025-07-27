import { Middleware } from "@reduxjs/toolkit";
import { commentsRepository } from "../../../data/repositories/commentsRepositoryImpl";

export const commentsPersistenceMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);

    if (action.type.startsWith("comments/")) {
      const comments = store.getState().comments;
      commentsRepository.saveComments(comments);
    }

    return result;
  };
