import React, { memo } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";
import { Typography } from "@src/ui/atoms";

type Props = TouchableOpacityProps & {
  title: string;
};

const Button: React.FC<Props> = ({ title, ...rest }) => {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <Typography style={styles.title}>{title}</Typography>
    </TouchableOpacity>
  );
};

export default memo(Button);
