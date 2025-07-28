import React from "react";
import { View, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Typography } from "@src/ui/atoms";

type Props = {
  text: string;
  onEdit: () => void;
  onDelete: () => void;
};

const CommentItem: React.FC<Props> = ({ text, onEdit, onDelete }) => {
  return (
    <View style={styles.commentRow}>
      <Typography variant="body">{text}</Typography>
      <View style={styles.commentActions}>
        <TouchableOpacity onPress={onEdit}>
          <Typography variant="subtitle">Edit</Typography>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Typography variant="subtitle">Delete</Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentItem;
