import React from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "../../atoms/IconButton";
import { Typography } from "../../../../ui/atoms/Typography";
import { addSavedPost, removeSavedPost } from "../../redux/savedPostsSlice";
import { RootState } from "../../../../core/store/store";
import { Post } from "../../../../domain/models/Post";

type Props = {
  liked: boolean;
  likes: number;
  comments: number;
  post: Post;
};

export const PostActions: React.FC<Props> = ({
  liked,
  likes,
  comments,
  post,
}) => {
  const dispatch = useDispatch();
  const savedPosts = useSelector((state: RootState) => state.savedPosts.posts);
  const isSaved = savedPosts.some((p) => p.id === post.id);

  const toggleSave = () => {
    if (isSaved) {
      dispatch(removeSavedPost(post.id));
    } else {
      dispatch(addSavedPost(post));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <IconButton
          icon={liked ? "heart-filled" : "heart"}
          onPress={() => {}}
          size={26}
        />
        <IconButton icon="comment" onPress={() => {}} />
        <IconButton icon="share" onPress={() => {}} />
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <IconButton
            icon="bookmark"
            onPress={toggleSave}
            color={isSaved ? "#FFD700" : undefined}
          />
        </View>
      </View>
      <Typography variant="subtitle">
        {likes} Likes • {comments} Comments
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 8 },
  actions: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
});
