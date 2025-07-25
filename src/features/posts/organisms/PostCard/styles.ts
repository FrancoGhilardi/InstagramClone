import { StyleSheet } from "react-native";
import { Spacing } from "../../../../core/constants/spacing";
import { Sizes } from "../../../../core/constants/sizes";

export const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.lg,
    borderRadius: Sizes.radius.md,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 300,
  },
});
