import React, { memo } from "react";
import { View, Image } from "react-native";
import { Post } from "../../../../domain/models/Post";
import { styles } from "./styles";
import { Typography } from "../../../../ui/atoms/Typography";
import PostHeader from "../../molecules/PostHeader";
import { useAppTheme } from "../../../../ui/providers/ThemeProvider";
import PostActions from "../../molecules/PostActions";
import { useImageFallback } from "../../../../core/hooks/useImagesFallback";
import { Placeholders } from "../../../../core/constants/placeholders";

type Props = {
  post: Post;
};

const PostCard: React.FC<Props> = ({ post }) => {
  const { avatar, name, location, image, description } = post;
  const { colors } = useAppTheme();
  const { uri: finalImage, onError } = useImageFallback(
    image,
    Placeholders.IMAGE
  );

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <PostHeader avatar={avatar} name={name} location={location} />
      <Image
        source={{ uri: finalImage }}
        style={styles.image}
        onError={onError}
      />
      <PostActions post={post} />
      <View style={styles.descriptionContainer}>
        <Typography variant="subtitle">{name}</Typography>
        <View style={styles.description}>
          <Typography variant="body">{description}</Typography>
        </View>
      </View>
    </View>
  );
};

export default memo(PostCard);
