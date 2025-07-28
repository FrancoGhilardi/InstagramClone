import React, { memo } from "react";
import { Image, ImageStyle } from "react-native";
import { styles } from "./styles";
import { useImageFallback } from "@core/hooks/useImagesFallback";
import { Placeholders } from "@core/constants/placeholders";

type AvatarProps = {
  uri: string;
  size?: number;
  style?: ImageStyle;
};

const Avatar: React.FC<AvatarProps> = ({ uri, size = 40, style }) => {
  const { uri: finalUri, onError } = useImageFallback(uri, Placeholders.AVATAR);
  return (
    <Image
      source={{ uri: finalUri }}
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
      onError={onError}
    />
  );
};

export default memo(Avatar);
