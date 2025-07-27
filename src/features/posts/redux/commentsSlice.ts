import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../core/store/store";
import { Comment } from "../../../domain/models/Post";

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
      if (!state[postId]) {
        state[postId] = [];
      }
      state[postId].unshift(comment);
    },
    setComments: (
      state,
      action: PayloadAction<{ postId: string; comments: Comment[] }>
    ) => {
      state[action.payload.postId] = action.payload.comments;
    },
  },
});

export const { addComment, setComments } = commentsSlice.actions;

export const selectCommentsForPost = (state: RootState, postId: string) =>
  state.comments[postId] || [];

export default commentsSlice.reducer;
