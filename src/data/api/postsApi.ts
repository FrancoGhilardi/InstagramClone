import axios from "axios";
import { BASE_URL } from "@env";

export const postsApi = axios.create({
  baseURL: BASE_URL,
});
