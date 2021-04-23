export interface Post {
  _id: string;
  postedBy: string;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
}

export interface Posts {
  posts: Post[];
  count: number;
}

export interface PostValues {
  title: string;
  content: string;
}
