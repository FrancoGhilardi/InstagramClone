import React from "react";
import { Text, TextProps } from "react-native";
import { TypographyStyles } from "@core/constants/typography";
import { useAppTheme } from "../../providers/ThemeProvider";

type TypographyProps = TextProps & { variant?: "title" | "subtitle" | "body" };

const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  style,
  ...props
}: TypographyProps) => {
  const { colors } = useAppTheme();
  return (
    <Text
      {...props}
      style={[TypographyStyles[variant], { color: colors.primary }, style]}
    />
  );
};

export default Typography;
