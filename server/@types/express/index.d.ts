import { ICategory } from "../../src/models/category";
import { IProduct } from "../../src/models/product";
import { IUser } from "../../src/models/user";

declare global {
  namespace Express {
    interface User extends IUser {
      id: string;
    }
    interface Request {
      product: IProduct;
      category: ICategory;
    }
  }
}
