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
import { useAppTheme } from "../../../../ui/providers/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Typography } from "../../../../ui/atoms/Typography";

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
  const { colors } = useAppTheme();
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
        <SafeAreaView
          style={[styles.safeArea, { backgroundColor: colors.background }]}
        >
          <KeyboardAvoidingView
            style={[styles.container, { backgroundColor: colors.background }]}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>

            <Input
              value={text}
              onChangeText={setText}
              placeholder="Write a comment..."
            />
            <Button title="Add" onPress={handleAddComment} />

            <FlatList
              data={comments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.commentContainer}>
                  <Typography variant="body">{item.text}</Typography>
                </View>
              )}
              inverted
            />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </Modal>
  );
};
