import React from "react";
import { View, Image } from "react-native";
import { Post } from "../../../../domain/models/Post";
import { styles } from "./styles";
import { Typography } from "../../../../ui/atoms/Typography";
import PostHeader from "../../molecules/PostHeader";
import { PostActions } from "../../molecules/PostActions";
import { useAppTheme } from "../../../../ui/providers/ThemeProvider";

type Props = {
  post: Post;
};

const PostCard: React.FC<Props> = ({ post }) => {
  const { avatar, name, location, image, liked, likes, comments, description } =
    post;
  const { colors } = useAppTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <PostHeader avatar={avatar} name={name} location={location} />
      <Image source={{ uri: image }} style={styles.image} />
      <PostActions liked={liked} likes={likes} comments={comments} />
      <Typography>{description}</Typography>
    </View>
  );
};

export default PostCard;
