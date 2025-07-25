import React from "react";
import { TouchableOpacity, Image, ImageStyle, StyleSheet } from "react-native";
import { styles } from "./styles";

type IconButtonProps = {
  icon: string;
  onPress: () => void;
  size?: number;
  style?: ImageStyle;
};

export const IconButton = ({
  icon,
  onPress,
  size = 24,
  style,
}: IconButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={{ uri: icon }}
        style={[{ width: size, height: size }, style]}
      />
    </TouchableOpacity>
  );
};
