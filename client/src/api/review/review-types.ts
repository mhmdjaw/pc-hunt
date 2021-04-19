export interface ReviewValues {
  rating: number;
  description: string;
  nickname: string;
}

export interface Review {
  _id: string;
  rating: number;
  description: string;
  nickname: string;
  verified: boolean;
  updatedAt: string;
}

export interface Reviews {
  myReview: Review | null;
  otherReviews: Review[];
}
