import React from "react";
import { FlatList, View } from "react-native";
import { Post } from "../../../../domain/models/Post";
import PostCard from "../../organisms/PostCard";
import { styles } from "./styles";

type Props = {
  posts: Post[];
};

export const FeedLayout: React.FC<Props> = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostCard post={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    />
  );
};
