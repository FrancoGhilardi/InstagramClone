import { Post } from "../models/Post";

export interface IPostsRepository {
  getPosts(): Promise<Post[]>;
}
