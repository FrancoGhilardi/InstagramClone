import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useAppTheme } from "../../../../ui/providers/ThemeProvider";
import { styles } from "./styles";

type Props = {
  onSubmit: (comment: string) => void;
};

export const CommentInput: React.FC<Props> = ({ onSubmit }) => {
  const [text, setText] = useState("");
  const { colors } = useAppTheme();

  const handleSend = () => {
    if (text.trim()) {
      onSubmit(text.trim());
      setText("");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <TextInput
        style={[styles.input, { color: colors.primary }]}
        placeholder="Write a comment..."
        placeholderTextColor={colors.secondary}
        value={text}
        onChangeText={setText}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};
