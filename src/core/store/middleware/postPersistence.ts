import { Middleware } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Keys } from "../../constants/keys";

export const postsPersistenceMiddleware: Middleware =
  (store) => (next) => async (action) => {
    const result = next(action);

    if (action.type.startsWith("posts/")) {
      const state = store.getState();
      await AsyncStorage.setItem(Keys.POSTS_KEY, JSON.stringify(state.posts));
    }

    if (action.type.startsWith("savedPosts/")) {
      const state = store.getState();
      await AsyncStorage.setItem(
        Keys.SAVED_POSTS_KEY,
        JSON.stringify(state.savedPosts)
      );
    }

    if (action.type.startsWith("postActions/")) {
      const state = store.getState();
      await AsyncStorage.setItem(
        Keys.POST_ACTIONS_KEY,
        JSON.stringify(state.postActions)
      );
    }

    if (action.type.startsWith("comments/")) {
      const state = store.getState();
      await AsyncStorage.setItem(
        Keys.COMMENTS_KEY,
        JSON.stringify(state.comments)
      );
    }

    return result;
  };

export const loadFromStorage = async () => {
  try {
    const [posts, savedPosts, postActions, comments] = await Promise.all([
      AsyncStorage.getItem(Keys.POSTS_KEY),
      AsyncStorage.getItem(Keys.SAVED_POSTS_KEY),
      AsyncStorage.getItem(Keys.POST_ACTIONS_KEY),
      AsyncStorage.getItem(Keys.COMMENTS_KEY),
    ]);

    return {
      posts: posts ? JSON.parse(posts) : undefined,
      savedPosts: savedPosts ? JSON.parse(savedPosts) : undefined,
      postActions: postActions ? JSON.parse(postActions) : undefined,
      comments: comments ? JSON.parse(comments) : undefined,
    };
  } catch (e) {
    console.error("Error loading storage:", e);
    return {};
  }
};
