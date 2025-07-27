import React, { memo } from "react";
import { View, Image } from "react-native";
import { Post } from "../../../../domain/models/Post";
import { styles } from "./styles";
import { Typography } from "../../../../ui/atoms/Typography";
import PostHeader from "../../molecules/PostHeader";
import { useAppTheme } from "../../../../ui/providers/ThemeProvider";
import PostActions from "../../molecules/PostActions";
import { useDispatch } from "react-redux";
import { addComment } from "../../redux/postsSlice";
import { CommentInput } from "../../molecules/CommentInput";

type Props = {
  post: Post;
};

const PostCard: React.FC<Props> = ({ post }) => {
  const { avatar, name, location, image, description, commentsList } = post;
  const { colors } = useAppTheme();
  const dispatch = useDispatch();

  const handleAddComment = (comment: string) => {
    dispatch(addComment({ postId: post.id, comment }));
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <PostHeader avatar={avatar} name={name} location={location} />
      <Image source={{ uri: image }} style={styles.image} />
      <PostActions post={post} />
      <Typography>{description}</Typography>
      <CommentInput onSubmit={handleAddComment} />
      {commentsList?.map((comment, index) => (
        <Typography key={index} variant="body">
          • {comment}
        </Typography>
      ))}
    </View>
  );
};

export default memo(PostCard);
