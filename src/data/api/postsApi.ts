import axios from "axios";
import constants from "../../core/constants/constants";

export const postsApi = axios.create({
  baseURL: constants.BASE_URL,
});
