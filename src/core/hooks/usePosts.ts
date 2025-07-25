import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import {
  fetchPosts,
  toggleLike,
  toggleSave,
} from "../../features/posts/redux/postsSlice";

export const usePosts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  const likePost = (id: string) => dispatch(toggleLike(id));
  const savePost = (id: string) => dispatch(toggleSave(id));

  const fetchAllPosts = () => dispatch(fetchPosts());

  const savedPosts = posts.filter((p) => p.saved);

  return {
    posts,
    savedPosts,
    loading,
    error,
    likePost,
    savePost,
    fetchAllPosts,
  };
};
