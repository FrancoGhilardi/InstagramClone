import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";

type Props = TextInputProps & {
  value: string;
  onChangeText: (text: string) => void;
};

export const Input: React.FC<Props> = ({ value, onChangeText, ...rest }) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor="#999"
      {...rest}
    />
  );
};
