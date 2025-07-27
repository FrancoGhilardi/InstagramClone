import { AppDispatch } from "../../core/store/store";
import { commentsRepository } from "../../data/repositories/commentsRepositoryImpl";
import { deleteComment } from "../../features/posts/redux/commentsSlice";

/**
 * Caso de uso para eliminar un comentario y persistir el estado.
 */
export const removeComment = async (
  dispatch: AppDispatch,
  postId: string,
  commentId: string
) => {
  dispatch(deleteComment({ postId, commentId }));

  const commentsState = await commentsRepository.getComments();
  commentsState[postId] =
    commentsState[postId]?.filter((c) => c.id !== commentId) || [];
  await commentsRepository.saveComments(commentsState);
};
