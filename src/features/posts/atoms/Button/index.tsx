import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";
import { Typography } from "../../../../ui/atoms/Typography";

type Props = TouchableOpacityProps & {
  title: string;
};

export const Button: React.FC<Props> = ({ title, ...rest }) => {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <Typography style={styles.title}>{title}</Typography>
    </TouchableOpacity>
  );
};
