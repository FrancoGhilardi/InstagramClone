import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  container: {
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
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
  safeArea: {
    maxHeight: "70%",
    minHeight: "25%",
  },
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
  editText: {
    color: "#007bff",
    fontSize: 13,
  },
  deleteText: {
    color: "red",
    fontSize: 13,
  },
});
