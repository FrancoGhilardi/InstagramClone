import React, { memo } from "react";
import { Share, View } from "react-native";
import { Post } from "../../../../domain/models/Post";
import { IconButton } from "../../atoms/IconButton";
import { Typography } from "../../../../ui/atoms/Typography";
import { styles } from "./styles";
import { usePosts } from "../../../../core/hooks/usePosts";
import { useAppTheme } from "../../../../ui/providers/ThemeProvider";
import { formatNumber } from "../../../../core/utils/format";

type Props = {
  post: Post;
  handleOpenModal: (open: boolean) => void;
};

const PostActions: React.FC<Props> = ({ post, handleOpenModal }) => {
  const { likePost, savePost } = usePosts();
  const { colors } = useAppTheme();

  const handleShare = async () => {
    try {
      const message = `${post.name} - ${post.description}\n${post.image}`;
      await Share.share({ message });
    } catch (error) {
      console.error("Error al compartir:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <View style={styles.icons}>
          <IconButton
            icon={post.liked ? "heart" : "heart-filled"}
            onPress={() => likePost(post.id)}
            size={26}
            color={post.liked ? colors.accent : colors.border}
          />
          <IconButton
            icon="comment"
            color={"#fff"}
            onPress={() => handleOpenModal(true)}
          />
          <IconButton icon="share" color={"#fff"} onPress={handleShare} />
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <IconButton
            icon="bookmark"
            onPress={() => savePost(post.id)}
            color={post.saved ? "#FFD700" : "#fff"}
          />
        </View>
      </View>
      <Typography variant="subtitle">
        {formatNumber(post.likes)} Likes • {formatNumber(post.comments)}{" "}
        Comments
      </Typography>
    </View>
  );
};

export default memo(PostActions);
