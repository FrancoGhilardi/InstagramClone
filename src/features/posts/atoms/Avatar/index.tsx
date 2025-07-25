import React from "react";
import { Image, ImageStyle } from "react-native";
import { styles } from "./styles";

type AvatarProps = {
  uri: string;
  size?: number;
  style?: ImageStyle;
};

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  size = 40,
  style,
}: AvatarProps) => {
  return (
    <Image
      source={{ uri }}
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
    />
  );
};
