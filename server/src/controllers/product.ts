import { NextFunction, Request, Response } from "express";
import { CallbackError } from "mongoose";
import Product, { IProduct } from "../models/product";
import formidable, { File } from "formidable";
import _ from "lodash";
import fs from "fs";

type Error =
  | (CallbackError & {
      errors?: {
        name: {
          message: string;
        };
        description: {
          message: string;
        };
        price: {
          message: string;
        };
        category: {
          message: string;
        };
        quantity: {
          message: string;
        };
      };
    })
  | null;

export const productById = (
  req: Request,
  res: Response,
  next: NextFunction,
  id: string
): void => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      res.status(400).json({
        message: "Product not found",
      });
      return;
    }
    req.product = product;
    next();
  });
};

export const read = (req: Request, res: Response): void => {
  req.product.image = undefined;
  res.json(req.product);
};

export const create = (req: Request, res: Response): void => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(400).json({
        message: "Image could not be parsed",
      });
      return;
    }
    const product = new Product(fields);

    if (files.image && product.image) {
      // check the image size
      if ((files.image as File).size > 1000000) {
        res.status(400).json({
          message: "Image size is too large",
        });
        return;
      }

      product.image.data = fs.readFileSync(
        (files.image as File).path
      ) as Buffer;
      product.image.contentType = (files.image as File).type;
    }

    saveProduct(res, product);
  });
};

export const remove = (req: Request, res: Response): void => {
  const product = req.product;
  product
    .remove()
    .then((deletedProduct: IProduct) => {
      if (!deletedProduct) {
        res.status(400).json({
          message: "Product not found",
        });
        return;
      }
      res.json({
        message: "Product successfully removed",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

export const update = (req: Request, res: Response): void => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(400).json({
        message: "Image could not be parsed",
      });
      return;
    }
    let product = req.product;
    product = (_.extend(product, fields) as unknown) as IProduct;

    if (files.image && product.image) {
      // check the image size
      if ((files.image as File).size > 1000000) {
        res.status(400).json({
          message: "Image size is too large",
        });
        return;
      }

      product.image.data = fs.readFileSync(
        (files.image as File).path
      ) as Buffer;
      product.image.contentType = (files.image as File).type;
    }

    saveProduct(res, product);
  });
};

const saveProduct = (res: Response, product: IProduct): void => {
  product.save((err: Error, result) => {
    if (err) {
      if (err.errors && err.errors.name) {
        res.status(400).json({
          message: err.errors.name.message,
        });
        return;
      }
      if (err.errors && err.errors.description) {
        res.status(400).json({
          message: err.errors.description.message,
        });
        return;
      }
      if (err.errors && err.errors.price) {
        res.status(400).json({
          message: err.errors.price.message,
        });
        return;
      }
      if (err.errors && err.errors.category) {
        res.status(400).json({
          message: err.errors.category.message,
        });
        return;
      }
      if (err.errors && err.errors.quantity) {
        res.status(400).json({
          message: err.errors.quantity.message,
        });
        return;
      }
    } else {
      res.json({ result });
    }
  });
};
