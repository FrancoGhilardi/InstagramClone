import React from "react";
import {
  FlatList,
  RefreshControl,
  View,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import PostCard from "../../organisms/PostCard";
import { Post } from "../../../../domain/models/Post";
import { useAppTheme } from "../../../../ui/providers/ThemeProvider";

type Props = {
  posts: Post[];
  refreshing: boolean;
  onRefresh: () => void;
  onEndReached: () => void;
  hasMore: boolean;
};

export const FeedLayout: React.FC<Props> = ({
  posts,
  refreshing,
  onRefresh,
  onEndReached,
  hasMore,
}) => {
  const { colors } = useAppTheme();

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostCard post={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[
        { backgroundColor: colors.background },
        styles.content,
      ]}
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
