import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Post } from "../../../domain/models/Post";

type SavedPostsState = {
  posts: Post[];
};

const initialState: SavedPostsState = {
  posts: [],
};

const STORAGE_KEY = "SAVED_POSTS";

const savedPostsSlice = createSlice({
  name: "savedPosts",
  initialState,
  reducers: {
    setSavedPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
    },
    addSavedPost: (state, action: PayloadAction<Post>) => {
      if (!state.posts.find((p) => p.id === action.payload.id)) {
        state.posts.push(action.payload);
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.posts));
      }
    },
    removeSavedPost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.posts));
    },
    loadSavedPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
});

export const { setSavedPosts, addSavedPost, removeSavedPost, loadSavedPosts } =
  savedPostsSlice.actions;

export const fetchSavedPostsFromStorage = () => async (dispatch: any) => {
  try {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (saved) {
      dispatch(loadSavedPosts(JSON.parse(saved)));
    }
  } catch (error) {
    console.error("Error loading saved posts", error);
  }
};

export default savedPostsSlice.reducer;
