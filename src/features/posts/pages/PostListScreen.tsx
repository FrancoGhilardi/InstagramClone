import React, { useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../core/store/store";
import { fetchPosts } from "../redux/postsSlice";
import { Typography } from "../../../ui/atoms/Typography";
import { styles } from "./styles/PostListScreen-styles";
import { FeedLayout } from "../templates/FeedLayout";

export const PostListScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <ActivityIndicator style={styles.loader} />;
  if (error) return <Typography variant="title">Error: {error}</Typography>;

  return <FeedLayout posts={posts} />;
};
