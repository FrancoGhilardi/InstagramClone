import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  commentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  commentActions: {
    flexDirection: "row",
    gap: 12,
  },
});
