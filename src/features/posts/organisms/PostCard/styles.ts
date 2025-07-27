import { StyleSheet } from "react-native";
import { Spacing } from "../../../../core/constants/spacing";

export const styles = StyleSheet.create({
  card: {
    paddingBottom: Spacing.lg,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 400,
  },
  descriptionContainer: {
    paddingLeft: Spacing.sm,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  description: {
    paddingLeft: Spacing.sm,
  },
  commentsContainer: {
    paddingLeft: Spacing.sm,
  },
  button: {
    marginTop: Spacing.sm,
  },
});
