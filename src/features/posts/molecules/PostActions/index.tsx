import React from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../../../domain/models/Post";
import { RootState } from "../../../../core/store/store";
import { IconButton } from "../../atoms/IconButton";
import { toggleLike, toggleSave } from "../../redux/postsSlice";
import { Typography } from "../../../../ui/atoms/Typography";
import { styles } from "./styles";
import { usePosts } from "../../../../core/hooks/usePosts";

type Props = {
  post: Post;
};

export const PostActions: React.FC<Props> = ({ post }) => {
  const { likePost, savePost } = usePosts();

  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <IconButton
          icon={post.liked ? "heart-filled" : "heart"}
          onPress={() => likePost(post.id)}
          size={26}
        />
        <IconButton icon="comment" onPress={() => {}} />
        <IconButton icon="share" onPress={() => {}} />
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <IconButton
            icon="bookmark"
            onPress={() => savePost(post.id)}
            color={post.saved ? "#FFD700" : undefined}
          />
        </View>
      </View>
      <Typography variant="subtitle">
        {post.likes} Likes • {post.comments} Comments
      </Typography>
    </View>
  );
};
