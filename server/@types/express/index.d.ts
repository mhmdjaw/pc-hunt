import { IProduct } from "../../src/models/product";

declare global {
  namespace Express {
    interface Request {
      product: IProduct;
    }
  }
}
