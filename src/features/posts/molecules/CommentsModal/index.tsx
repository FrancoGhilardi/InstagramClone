import React, { useState } from "react";
import {
  Modal,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addComment, selectCommentsForPost } from "../../redux/commentsSlice";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import { RootState } from "../../../../core/store/store";
import { styles } from "./styles";

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
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const comments = useSelector((state: RootState) =>
    selectCommentsForPost(state, postId)
  );

  const handleAddComment = () => {
    if (!text.trim()) return;
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
    setText("");
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeText}>Cerrar</Text>
            </TouchableOpacity>
          </View>

          <Input
            value={text}
            onChangeText={setText}
            placeholder="Escribe un comentario..."
          />
          <Button title="Agregar" onPress={handleAddComment} />

          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.commentContainer}>
                <Text style={styles.commentText}>{item.text}</Text>
              </View>
            )}
            inverted
          />
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};
