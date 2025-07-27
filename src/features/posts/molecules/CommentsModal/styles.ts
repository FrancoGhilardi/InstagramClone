import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: "70%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  closeText: {
    color: "#007bff",
    fontWeight: "bold",
  },
  commentContainer: {
    paddingVertical: 8,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  commentText: {
    color: "#333",
    fontSize: 14,
  },
});
