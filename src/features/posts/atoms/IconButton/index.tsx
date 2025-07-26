import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import { Icon } from "../../../../ui/atoms/Icon/Icon";

type IconButtonProps = {
  icon: keyof typeof import("../../../../ui/atoms/Icon/Icon").iconMap;
  onPress: () => void;
  size?: number;
  color: string;
  style?: ViewStyle;
};

export const IconButton: React.FC<IconButtonProps> = ({
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
