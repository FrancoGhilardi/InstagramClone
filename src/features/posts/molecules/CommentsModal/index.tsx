import React, { useMemo, useState } from "react";
import {
  Modal,
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { makeSelectCommentsForPost } from "../../redux/commentsSlice";
import { RootState, AppDispatch } from "@core/store/store";
import { styles } from "./styles";
import { useAppTheme } from "@ui/providers/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Comment } from "@domain/models/Post";
import { updateComment } from "@domain/usescases/editComment";
import { saveComment } from "@domain/usescases/saveComment";
import { removeComment } from "@domain/usescases/deleteComment";
import { Button, Input } from "../../atoms";
import CommentItem from "../ComponentsItems";
import { Typography } from "@src/ui/atoms";

type Props = {
  visible: boolean;
  onClose: () => void;
  postId: string;
};

const CommentsModal: React.FC<Props> = ({ visible, onClose, postId }) => {
  const [text, setText] = useState<string>("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const { colors } = useAppTheme();
  const dispatch = useDispatch<AppDispatch>();
  const selectComments = useMemo(() => makeSelectCommentsForPost(), []);
  const comments = useSelector((state: RootState) =>
    selectComments(state, postId)
  );

  const handleAddOrEditComment = async () => {
    if (!text.trim()) return;

    if (editingCommentId) {
      await updateComment(dispatch, postId, editingCommentId, text);
      setEditingCommentId(null);
    } else {
      const newComment: Comment = {
        id: Date.now().toString(),
        text,
        createdAt: new Date().toISOString(),
      };
      await saveComment(dispatch, postId, newComment);
    }
    setText("");
  };

  const handleEditPress = (commentId: string, currentText: string) => {
    setEditingCommentId(commentId);
    setText(currentText);
  };

  const handleDeletePress = (commentId: string) => {
    Alert.alert("Delete comment", "Are you sure you want to delete it?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await removeComment(dispatch, postId, commentId);
        },
      },
    ]);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <SafeAreaView
          style={[styles.safeArea, { backgroundColor: colors.background }]}
        >
          <KeyboardAvoidingView
            style={[styles.container, { backgroundColor: colors.background }]}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose}>
                <Typography style={styles.closeText}>Close</Typography>
              </TouchableOpacity>
            </View>
            <Input
              value={text}
              onChangeText={setText}
              placeholder={
                editingCommentId ? "Edit your comment..." : "Write a comment..."
              }
            />
            <Button
              title={editingCommentId ? "Save" : "Add"}
              onPress={handleAddOrEditComment}
            />

            <FlatList
              data={comments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CommentItem
                  text={item.text}
                  onEdit={() => handleEditPress(item.id, item.text)}
                  onDelete={() => handleDeletePress(item.id)}
                />
              )}
              inverted
            />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default CommentsModal;
