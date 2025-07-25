import { IPostsRepository } from "../repositories/IPostsRepository";

export class GetPostsUseCase {
  constructor(private repository: IPostsRepository) {}

  async execute() {
    return this.repository.getPosts();
  }
}
