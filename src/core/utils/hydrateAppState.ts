import { setInitialState } from "../../features/posts/redux/commentsSlice";
import { setInitialLikes } from "../../features/posts/redux/postActionSlice";
import { loadFromStorage } from "../store/middleware/postPersistence";
import { AppDispatch } from "../store/store";

export const hydrateState = async (dispatch: AppDispatch) => {
  const { postActions, comments } = await loadFromStorage();
  if (postActions) dispatch(setInitialLikes(Object.values(postActions)));
  if (comments) {
    dispatch(setInitialState(comments));
  }
};
