import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../../domain/models/Post";
import { RootState } from "../../../core/store/store";

type PostActionPayload = {
  postId: string;
};

type PostsActionsState = {
  likedPosts: Record<string, boolean>;
  likesCount: Record<string, number>;
};

const initialState: PostsActionsState = {
  likedPosts: {},
  likesCount: {},
};

const postActionsSlice = createSlice({
  name: "postActions",
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<{ post: Post }>) => {
      const { post } = action.payload;
      const isLiked = state.likedPosts[post.id];
      if (isLiked) {
        state.likedPosts[post.id] = false;
        state.likesCount[post.id] =
          (state.likesCount[post.id] || post.likes) - 1;
      } else {
        state.likedPosts[post.id] = true;
        state.likesCount[post.id] =
          (state.likesCount[post.id] || post.likes) + 1;
      }
    },
    setInitialLikes: (state, action: PayloadAction<Post[]>) => {
      action.payload.forEach((p) => {
        state.likesCount[p.id] = p.likes;
        state.likedPosts[p.id] = p.liked;
      });
    },
  },
});

export const { toggleLike, setInitialLikes } = postActionsSlice.actions;
export const selectLikesForPost = (state: RootState, postId: string) =>
  state.postActions.likesCount[postId];
export const selectIsPostLiked = (state: RootState, postId: string) =>
  state.postActions.likedPosts[postId];

export default postActionsSlice.reducer;
