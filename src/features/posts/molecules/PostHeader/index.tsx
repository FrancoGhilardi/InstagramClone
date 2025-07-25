import React from "react";
import { View } from "react-native";
import { styles } from "./styles";
import { Typography } from "../../../../ui/atoms/Typography";
import Avatar from "../../atoms/Avatar";

type Props = {
  avatar: string;
  name: string;
  location: string;
};

const PostHeader: React.FC<Props> = ({ avatar, name, location }) => {
  console.log({ avatar, name, location });
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
