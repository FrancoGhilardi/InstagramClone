import React, { useCallback } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { styles } from "./styles";
import {
  fetchMorePosts,
  fetchPosts,
  startRefreshing,
  stopRefreshing,
} from "../../redux/postsSlice";
import { AppDispatch, RootState } from "../../../../core/store/store";
import PostCard from "../../organisms/PostCard";
import { Post } from "../../../../domain/models/Post";

type Props = {
  posts: Post[];
};

export const FeedLayout: React.FC<Props> = ({ posts }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { refreshing, hasMore, page } = useSelector(
    (state: RootState) => state.posts
  );

  // Pull-to-refresh
  const onRefresh = useCallback(async () => {
    dispatch(startRefreshing());
    await dispatch(fetchPosts());
    dispatch(stopRefreshing());
  }, [dispatch]);

  // Infinite Scroll
  const onEndReached = useCallback(() => {
    if (hasMore) {
      dispatch(fetchMorePosts(page + 1));
    }
  }, [dispatch, page, hasMore]);

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostCard post={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReachedThreshold={0.5}
      onEndReached={onEndReached}
      ListFooterComponent={
        hasMore ? (
          <ActivityIndicator style={styles.loader} />
        ) : (
          <View style={styles.endList} />
        )
      }
    />
  );
};
