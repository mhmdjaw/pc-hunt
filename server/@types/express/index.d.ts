import { ICategory } from "../../src/models/category";
import { IProduct } from "../../src/models/product";

declare global {
  namespace Express {
    interface User {
      id: string;
      name: string;
      email: string;
      about?: string;
      role: number;
      history: Array<string>;
    }
    interface Request {
      product: IProduct;
      category: ICategory;
    }
  }
}
