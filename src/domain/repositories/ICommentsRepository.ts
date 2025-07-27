import { Comment } from "../models/Post";

export interface ICommentsRepository {
  getComments(): Promise<Record<string, Comment[]>>;
  saveComments(comments: Record<string, Comment[]>): Promise<void>;
}
