import React, { memo, useState, useMemo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Post } from "@domain/models/Post";
import { styles } from "./styles";
import { useAppTheme } from "@ui/providers/ThemeProvider";
import { useImageFallback } from "@core/hooks/useImagesFallback";
import { Placeholders } from "@core/constants/placeholders";
import { useSelector } from "react-redux";
import { makeSelectCommentsForPost } from "../../redux/commentsSlice";
import { RootState } from "@core/store/store";
import { formatPostDate } from "@core/utils/formatDate";
import { CommentsModal, PostActions, PostHeader } from "../../molecules";
import { Typography } from "@src/ui/atoms";

type Props = {
  post: Post;
};

const PostCard: React.FC<Props> = ({ post }) => {
  const { avatar, name, location, image, description, createdAt } = post;
  const { colors } = useAppTheme();
  const { uri: finalImage, onError } = useImageFallback(
    image,
    Placeholders.IMAGE
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const selectComments = useMemo(() => makeSelectCommentsForPost(), []);
  const comments = useSelector((state: RootState) =>
    selectComments(state, post.id)
  );

  const lastComment = comments.length > 0 ? comments[0] : null;

  const handleOpenModal = (open: boolean) => setModalVisible(open);

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <PostHeader avatar={avatar} name={name} location={location} />
      <Image
        source={{ uri: finalImage }}
        style={styles.image}
        onError={onError}
      />
      <PostActions post={post} handleOpenModal={handleOpenModal} />
      <View style={styles.descriptionContainer}>
        <Typography variant="subtitle">{name}</Typography>
        <View style={styles.description}>
          <Typography variant="body">{description}</Typography>
        </View>
      </View>
      <View style={styles.commentsContainer}>
        {lastComment && (
          <Typography variant="body">{lastComment.text}</Typography>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleOpenModal(true)}
        >
          <Typography variant="body" style={{ color: colors.primary }}>
            Add a comment
          </Typography>
        </TouchableOpacity>
      </View>
      <View style={styles.date}>
        <Typography variant="body">{formatPostDate(createdAt)}</Typography>
      </View>

      <CommentsModal
        visible={modalVisible}
        onClose={() => handleOpenModal(false)}
        postId={post.id}
      />
    </View>
  );
};

export default memo(PostCard);
