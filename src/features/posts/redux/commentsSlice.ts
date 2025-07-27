import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../core/store/store";
import { Comment } from "../../../domain/models/Post";
import { createSelector } from "reselect";

type CommentsState = Record<string, Comment[]>;

const initialState: CommentsState = {};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (
      state,
      action: PayloadAction<{ postId: string; comment: Comment }>
    ) => {
      const { postId, comment } = action.payload;
      if (!state[postId]) state[postId] = [];
      state[postId].unshift(comment);
    },
    editComment: (
      state,
      action: PayloadAction<{
        postId: string;
        commentId: string;
        newText: string;
      }>
    ) => {
      const { postId, commentId, newText } = action.payload;
      const comments = state[postId];
      if (comments) {
        const comment = comments.find((c) => c.id === commentId);
        if (comment) comment.text = newText;
      }
    },
    deleteComment: (
      state,
      action: PayloadAction<{ postId: string; commentId: string }>
    ) => {
      const { postId, commentId } = action.payload;
      state[postId] = state[postId].filter((c) => c.id !== commentId);
    },
    setComments: (
      state,
      action: PayloadAction<{ postId: string; comments: Comment[] }>
    ) => {
      state[action.payload.postId] = action.payload.comments;
    },
  },
});

export const { addComment, editComment, deleteComment, setComments } =
  commentsSlice.actions;

/**
 * Selector base para acceder al estado de comentarios
 */
const selectCommentsState = (state: RootState) => state.comments;

/**
 * Selector memoizado por postId
 *
 * Se debe usar como:
 *   const selectComments = useMemo(() => makeSelectCommentsForPost(), []);
 *   const comments = useSelector((state: RootState) => selectComments(state, postId));
 */
export const makeSelectCommentsForPost = () =>
  createSelector(
    [selectCommentsState, (_: RootState, postId: string) => postId],
    (commentsState, postId) => commentsState[postId] || []
  );

export default commentsSlice.reducer;
