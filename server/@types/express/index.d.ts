import { ICategory } from "src/models/category";
import { IProduct } from "../../src/models/product";

declare global {
  namespace Express {
    interface Request {
      product: IProduct;
      category: ICategory;
    }
  }
}
