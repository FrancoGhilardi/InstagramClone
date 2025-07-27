export interface Post {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  description: string;
  likes: number;
  image: string;
  comments: number;
  commentsList?: string[];
  liked: boolean;
  saved: boolean;
  location: string;
}
