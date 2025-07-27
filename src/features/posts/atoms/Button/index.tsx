import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
};

export const Button: React.FC<Props> = ({ title, ...rest }) => {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};
