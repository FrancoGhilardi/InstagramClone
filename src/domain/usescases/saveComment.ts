import { AppDispatch } from "../../core/store/store";
import { Comment } from "../models/Post";
import { commentsRepository } from "../../data/repositories/commentsRepositoryImpl";
import { addComment } from "../../features/posts/redux/commentsSlice";

/**
 * Caso de uso para agregar un comentario a un post.
 * 1. Agrega el comentario al estado en Redux.
 * 2. Persiste el estado actualizado en el storage.
 */
export const saveComment = async (
  dispatch: AppDispatch,
  postId: string,
  comment: Comment
) => {
  // 1. Agregar comentario al estado
  dispatch(addComment({ postId, comment }));

  // 2. Persistir todos los comentarios
  const commentsState = (await commentsRepository.getComments()) || {};
  if (!commentsState[postId]) {
    commentsState[postId] = [];
  }
  commentsState[postId].unshift(comment);

  await commentsRepository.saveComments(commentsState);
};
