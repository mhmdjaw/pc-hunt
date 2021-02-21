export interface CategoryValues {
  parent: string;
  name: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  parent: Category;
}
