import React, { useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../core/store/store";
import { fetchSavedPostsFromStorage } from "../redux/savedPostsSlice";
import { Typography } from "../../../ui/atoms/Typography";
import PostCard from "../organisms/PostCard";
import { styles } from "./styles/SavedPostScreen-styles";

export const SavedPostsScreen: React.FC = () => {
  const savedPosts = useSelector((state: RootState) => state.savedPosts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSavedPostsFromStorage() as any);
  }, [dispatch]);

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
