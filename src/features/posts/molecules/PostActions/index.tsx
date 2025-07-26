import React, { memo } from "react";
import { View } from "react-native";
import { Post } from "../../../../domain/models/Post";
import { IconButton } from "../../atoms/IconButton";
import { Typography } from "../../../../ui/atoms/Typography";
import { styles } from "./styles";
import { usePosts } from "../../../../core/hooks/usePosts";
import { useAppTheme } from "../../../../ui/providers/ThemeProvider";

type Props = {
  post: Post;
};

const PostActions: React.FC<Props> = ({ post }) => {
  const { likePost, savePost } = usePosts();
  const { colors, theme } = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <IconButton
          icon={post.liked ? "heart" : "heart-filled"}
          onPress={() => likePost(post.id)}
          size={26}
          color={post.liked ? colors.accent : colors.border}
        />
        <IconButton icon="comment" color={"#fff"} onPress={() => {}} />
        <IconButton icon="share" color={"#fff"} onPress={() => {}} />
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <IconButton
            icon="bookmark"
            onPress={() => savePost(post.id)}
            color={post.saved ? "#FFD700" : "#fff"}
          />
        </View>
      </View>
      <Typography variant="subtitle">
        {post.likes} Likes • {post.comments} Comments
      </Typography>
    </View>
  );
};

export default memo(PostActions);
