import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { useEffect } from "react";
import {
  fetchPosts,
  loadPostsFromStorage,
  toggleLike,
  toggleSave,
} from "../../features/posts/redux/postsSlice";

export const usePosts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  // Carga inicial (AsyncStorage o API)
  useEffect(() => {
    const loadData = async () => {
      const result = await dispatch(loadPostsFromStorage());
      if (!result.payload || result.payload.length === 0) {
        dispatch(fetchPosts());
      }
    };
    loadData();
  }, [dispatch]);

  // Acciones de like y save
  const likePost = (id: string) => {
    dispatch(toggleLike(id));
  };

  const savePost = (id: string) => {
    dispatch(toggleSave(id));
  };

  // Filtrar publicaciones guardadas
  const savedPosts = posts.filter((p) => p.saved);

  return { posts, savedPosts, loading, error, likePost, savePost };
};
