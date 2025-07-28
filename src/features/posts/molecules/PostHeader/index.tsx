import React from "react";
import { View } from "react-native";
import { styles } from "./styles";
import { Avatar } from "../../atoms";
import { Typography } from "@src/ui/atoms";

type Props = {
  avatar: string;
  name: string;
  location: string;
};

const PostHeader: React.FC<Props> = ({ avatar, name, location }) => {
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
