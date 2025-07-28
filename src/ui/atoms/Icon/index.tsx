import {
  Bookmark,
  Comment,
  Heart,
  HeartFilled,
  Home,
  Settings,
  Share,
} from "@src/assets";
import React from "react";
import { ViewStyle } from "react-native";

export const iconMap = {
  heart: Heart,
  "heart-filled": HeartFilled,
  comment: Comment,
  share: Share,
  bookmark: Bookmark,
  home: Home,
  settings: Settings,
};

type IconProps = {
  name: keyof typeof iconMap;
  size?: number;
  color: string;
  style?: ViewStyle;
  focused?: boolean;
};

const Icon: React.FC<IconProps> = ({ name, size = 24, color, style }) => {
  const SelectedIcon = iconMap[name];

  return <SelectedIcon width={size} height={size} fill={color} style={style} />;
};

export default Icon;
