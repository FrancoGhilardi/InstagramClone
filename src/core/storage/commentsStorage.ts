import AsyncStorage from "@react-native-async-storage/async-storage";
import { Comment } from "../../domain/models/Post";
import { Keys } from "../constants/keys";

export const commentsStorage = {
  async save(comments: Record<string, Comment[]>) {
    try {
      const jsonValue = JSON.stringify(comments);
      await AsyncStorage.setItem(Keys.COMMENTS_KEY, jsonValue);
    } catch (e) {
      console.error("Error saving comments:", e);
    }
  },

  async load(): Promise<Record<string, Comment[]>> {
    try {
      const jsonValue = await AsyncStorage.getItem(Keys.COMMENTS_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : {};
    } catch (e) {
      console.error("Error loading comments:", e);
      return {};
    }
  },
};
