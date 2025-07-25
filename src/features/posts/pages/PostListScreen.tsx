import React, { useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import { PostsRepositoryImpl } from "../../../data/repositories/postsRepositoryImpl";
import { Post } from "../../../domain/models/Post";
import PostCard from "../organisms/PostCard";
import { GetPostsUseCase } from "../../../domain/usescases/getPosts";

const PostListScreen: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const repo = new PostsRepositoryImpl();
      const useCase = new GetPostsUseCase(repo);
      const data = await useCase.execute();
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostCard post={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default PostListScreen;
