import AsyncStorage from "@react-native-async-storage/async-storage";
import { Comment } from "@domain/models/Post";
import { ICommentsRepository } from "@domain/repositories/ICommentsRepository";
import { Keys } from "@core/constants/keys";

export class CommentsRepositoryImpl implements ICommentsRepository {
  private readonly COMMENTS_KEY = Keys.COMMENTS_KEY;

  async getComments(): Promise<Record<string, Comment[]>> {
    try {
      const data = await AsyncStorage.getItem(this.COMMENTS_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error("Error loading comments:", error);
      return {};
    }
  }

  async saveComments(comments: Record<string, Comment[]>): Promise<void> {
    try {
      const jsonData = JSON.stringify(comments);
      await AsyncStorage.setItem(this.COMMENTS_KEY, jsonData);
    } catch (error) {
      console.error("Error saving comments:", error);
    }
  }
}

export const commentsRepository = new CommentsRepositoryImpl();
