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
import {
  addComment,
  deleteComment,
  editComment,
  makeSelectCommentsForPost,
} from "../../redux/commentsSlice";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import { RootState } from "../../../../core/store/store";
import { styles } from "./styles";
import { useAppTheme } from "../../../../ui/providers/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Typography } from "../../../../ui/atoms/Typography";
import { CommentItem } from "../ComponentsItems";

type Props = {
  visible: boolean;
  onClose: () => void;
  postId: string;
};

export const CommentsModal: React.FC<Props> = ({
  visible,
  onClose,
  postId,
}) => {
  const [text, setText] = useState<string>("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const { colors } = useAppTheme();
  const dispatch = useDispatch();
  const selectComments = useMemo(() => makeSelectCommentsForPost(), []);
  const comments = useSelector((state: RootState) =>
    selectComments(state, postId)
  );

  const handleAddOrEditComment = () => {
    if (!text.trim()) return;
    if (editingCommentId) {
      dispatch(
        editComment({ postId, commentId: editingCommentId, newText: text })
      );
      setEditingCommentId(null);
    } else {
      dispatch(
        addComment({
          postId,
          comment: {
            id: Date.now().toString(),
            text,
            createdAt: new Date().toISOString(),
          },
        })
      );
    }
    setText("");
  };

  const handleEditPress = (commentId: string, currentText: string) => {
    setEditingCommentId(commentId);
    setText(currentText);
  };

  const handleDeletePress = (commentId: string) => {
    Alert.alert("Eliminar comentario", "¿Seguro que deseas eliminarlo?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => dispatch(deleteComment({ postId, commentId })),
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
                editingCommentId
                  ? "Edita tu comentario..."
                  : "Escribe un comentario..."
              }
            />
            <Button
              title={editingCommentId ? "Guardar" : "Agregar"}
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
