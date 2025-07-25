import AsyncStorage from "@react-native-async-storage/async-storage";
import { Post } from "../../domain/models/Post";

const STORAGE_KEY = "POSTS_STATE";

export const PostsStorage = {
  async savePosts(posts: Post[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (error) {
      console.error("Error saving posts state", error);
    }
  },

  async loadPosts(): Promise<Post[] | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error loading posts state", error);
      return null;
    }
  },
};
