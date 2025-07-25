import React from "react";
import { View } from "react-native";
import { styles } from "./styles";
import { Avatar } from "../../atoms/Avatar";
import { Typography } from "../../../../ui/atoms/Typography";

type Props = {
  avatar: string;
  name: string;
  location: string;
};

const PostHeader: React.FC<Props> = ({ avatar, name, location }: Props) => {
  return (
    <View style={styles.container}>
      <Avatar uri={avatar} />
      <View style={styles.info}>
        <Typography variant="title">{name}</Typography>
        <Typography variant="body">{location}</Typography>
      </View>
    </View>
  );
};

export default PostHeader;
