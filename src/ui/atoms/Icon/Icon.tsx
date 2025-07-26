import React from "react";
import { ViewStyle } from "react-native";

import Heart from "../../../assets/icons/heart.svg";
import HeartFilled from "../../../assets/icons/heart-filled.svg";
import Comment from "../../../assets/icons/comment.svg";
import Share from "../../../assets/icons/share.svg";
import Bookmark from "../../../assets/icons/bookmark.svg";
import Home from "../../../assets/icons/home.svg";
import Settings from "../../../assets/icons/settings.svg";

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

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color,
  style,
}) => {
  const SelectedIcon = iconMap[name];

  return <SelectedIcon width={size} height={size} fill={color} style={style} />;
};
