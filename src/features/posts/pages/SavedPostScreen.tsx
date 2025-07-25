import React from "react";
import { View, FlatList } from "react-native";
import { Typography } from "../../../ui/atoms/Typography";
import { styles } from "./styles/SavedPostScreen-styles";
import PostCard from "../organisms/PostCard";
import { usePosts } from "../../../core/hooks/usePosts";

export const SavedPostsScreen: React.FC = () => {
  const { savedPosts } = usePosts();

  if (savedPosts.length === 0) {
    return (
      <View style={styles.empty}>
        <Typography variant="title">
          No tienes publicaciones guardadas.
        </Typography>
      </View>
    );
  }

  return (
    <FlatList
      data={savedPosts}
      renderItem={({ item }) => <PostCard post={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
    />
  );
};
