import { postsApi } from "../api/postsApi";
import { Post } from "../../domain/models/Post";
import { IPostsRepository } from "../../domain/repositories/IPostsRepository";

export class PostsRepositoryImpl implements IPostsRepository {
  async getPosts(): Promise<Post[]> {
    const { data } = await postsApi.get("/posts");
    return data;
  }
}
