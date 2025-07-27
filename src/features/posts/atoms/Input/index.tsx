import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";
import { useAppTheme } from "../../../../ui/providers/ThemeProvider";

type Props = TextInputProps & {
  value: string;
  onChangeText: (text: string) => void;
};

export const Input: React.FC<Props> = ({ value, onChangeText, ...rest }) => {
  const { colors } = useAppTheme();
  return (
    <TextInput
      style={[
        styles.input,
        { borderColor: colors.border, color: colors.primary },
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor={colors.primary}
      {...rest}
    />
  );
};
