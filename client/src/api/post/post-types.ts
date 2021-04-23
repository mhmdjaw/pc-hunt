export interface Post {
  _id: string;
  postedBy: string;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
}

export interface PostValues {
  title: string;
  content: string;
}
