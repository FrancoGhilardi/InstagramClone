import React from "react";
import { View } from "react-native";
import { Typography } from "../../../../ui/atoms/Typography";
import { IconButton } from "../../atoms/IconButton";
import { styles } from "./styles";

type Props = {
  liked: boolean;
  likes: number;
  comments: number;
};

export const PostActions: React.FC<Props> = ({ liked, likes, comments }) => {
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
          <IconButton icon="bookmark" onPress={() => {}} />
        </View>
      </View>
      <Typography variant="subtitle">
        {likes} Likes • {comments} Comments
      </Typography>
    </View>
  );
};
