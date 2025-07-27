import { AppDispatch } from "../store/store";
import { commentsRepository } from "../../data/repositories/commentsRepositoryImpl";
import { setInitialLikes } from "../../features/posts/redux/postActionSlice";
import { setInitialState as setCommentsInitialState } from "../../features/posts/redux/commentsSlice";
import { loadFromStorage } from "../store/middleware/postPersistence";

export const hydrateAppState = async (dispatch: AppDispatch) => {
  const { postActions } = await loadFromStorage();
  const comments = await commentsRepository.getComments();
  if (postActions) {
    dispatch(setInitialLikes(Object.values(postActions)));
  }
  if (comments) {
    dispatch(setCommentsInitialState(comments));
  }
};
