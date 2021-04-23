import axios, { AxiosResponse, CancelToken } from "axios";
import { API } from "../../config";
import { Post, Posts, PostValues } from "./post-types";
export type { Post } from "./post-types";

export const createPost = (post: PostValues): Promise<AxiosResponse<Post>> =>
  axios.post<Post>(`${API}/post`, post, { withCredentials: true });

export const deletePost = (
  slug: string,
  cancelToken?: CancelToken
): Promise<AxiosResponse<{ message: string }>> =>
  axios.delete(`${API}/post/${slug}`, { withCredentials: true, cancelToken });

export const getPost = (
  slug: string,
  cancelToken?: CancelToken
): Promise<AxiosResponse<Post>> =>
  axios.get<Post>(`${API}/post/${slug}`, { cancelToken });

export const getPosts = (
  limit: number,
  skip: number,
  cancelToken?: CancelToken
): Promise<AxiosResponse<Posts>> =>
  axios.get<Posts>(`${API}/posts?limit=${limit}&skip=${skip}`, {
    cancelToken,
  });

export const getMyPosts = (
  cancelToken?: CancelToken
): Promise<AxiosResponse<Post[]>> =>
  axios.get<Post[]>(`${API}/posts/seller`, {
    withCredentials: true,
    cancelToken,
  });
