import { Icon } from "@src/ui/atoms";
import React, { memo } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";

type IconButtonProps = {
  icon: keyof typeof import("@src/ui/atoms/Icon").iconMap;
  onPress: () => void;
  size?: number;
  color: string;
  style?: ViewStyle;
};

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  size = 24,
  color,
  style,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Icon name={icon} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default memo(IconButton);
