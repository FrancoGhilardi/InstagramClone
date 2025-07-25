import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import {
  fetchPosts,
  fetchMorePosts,
  toggleLike,
  toggleSave,
  startRefreshing,
  stopRefreshing,
} from "../../features/posts/redux/postsSlice";

export const usePosts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error, refreshing, page, hasMore } = useSelector(
    (state: RootState) => state.posts
  );

  const fetchAllPosts = () => dispatch(fetchPosts());
  const fetchNextPage = () => dispatch(fetchMorePosts(page + 1));
  const likePost = (id: string) => dispatch(toggleLike(id));
  const savePost = (id: string) => dispatch(toggleSave(id));
  const startRefresh = () => dispatch(startRefreshing());
  const stopRefresh = () => dispatch(stopRefreshing());

  const savedPosts = posts.filter((p) => p.saved);

  return {
    posts,
    savedPosts,
    loading,
    error,
    refreshing,
    page,
    hasMore,
    fetchAllPosts,
    fetchNextPage,
    likePost,
    savePost,
    startRefresh,
    stopRefresh,
  };
};
