import React from "react";
import { View, StyleSheet } from "react-native";
import { styles } from "./styles";
import { IconButton } from "../../atoms/IconButton";
import { Typography } from "../../../../ui/atoms/Typography";

type Props = {
  liked: boolean;
  likes: number;
  comments: number;
};

export const PostActions = ({ liked, likes, comments }: Props) => {
  const likeIcon = liked
    ? "https://cdn-icons-png.flaticon.com/512/833/833472.png"
    : "https://cdn-icons-png.flaticon.com/512/1077/1077035.png";

  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <IconButton icon={likeIcon} onPress={() => {}} />
        <IconButton
          icon="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
          onPress={() => {}}
        />
        <IconButton
          icon="https://cdn-icons-png.flaticon.com/512/25/25663.png"
          onPress={() => {}}
        />
      </View>
      <Typography variant="subtitle">
        {likes} Likes • {comments} Comments
      </Typography>
    </View>
  );
};
