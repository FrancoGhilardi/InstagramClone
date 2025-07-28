import React from "react";
import { View, FlatList } from "react-native";
import { styles } from "./styles/SavedPostScreen-styles";
import { usePosts } from "@core/hooks/usePosts";
import { SafeAreaView } from "react-native-safe-area-context";
import { PostCard } from "../organisms";
import { Typography } from "@src/ui/atoms";

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
    <SafeAreaView edges={["top", "left", "right"]}>
      <FlatList
        data={savedPosts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};
