import { AppDispatch } from "../../core/store/store";
import { commentsRepository } from "../../data/repositories/commentsRepositoryImpl";
import { editComment } from "../../features/posts/redux/commentsSlice";

/**
 * Caso de uso para editar un comentario y persistirlo.
 */
export const updateComment = async (
  dispatch: AppDispatch,
  postId: string,
  commentId: string,
  newText: string
) => {
  dispatch(editComment({ postId, commentId, newText }));

  const commentsState = await commentsRepository.getComments();
  const comments = commentsState[postId];
  if (comments) {
    const comment = comments.find((c) => c.id === commentId);
    if (comment) comment.text = newText;
  }
  await commentsRepository.saveComments(commentsState);
};
