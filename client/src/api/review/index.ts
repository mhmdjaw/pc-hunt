import axios, { AxiosResponse, CancelToken } from "axios";
import { API } from "../../config";
import { Review, Reviews, ReviewValues } from "./review-types";
export type { Review, Reviews } from "./review-types";

export const postReview = (
  slug: string,
  review: ReviewValues,
  cancelToken?: CancelToken
): Promise<AxiosResponse<Review>> =>
  axios.post<Review>(`${API}/review/${slug}`, review, {
    withCredentials: true,
    cancelToken,
  });

export const deleteReview = (
  slug: string,
  cancelToken?: CancelToken
): Promise<AxiosResponse<Review>> =>
  axios.delete(`${API}/review/${slug}`, { withCredentials: true, cancelToken });

export const getReviews = (
  slug: string,
  cancelToken?: CancelToken
): Promise<AxiosResponse<Reviews>> =>
  axios.get<Reviews>(`${API}/reviews/${slug}`, {
    withCredentials: true,
    cancelToken,
  });

export const getReview = (
  slug: string,
  cancelToken?: CancelToken
): Promise<AxiosResponse<Review | null>> =>
  axios.get<Review | null>(`${API}/review/${slug}`, {
    withCredentials: true,
    cancelToken,
  });
