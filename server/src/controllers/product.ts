import { NextFunction, Request, Response } from "express";
import { CallbackError } from "mongoose";
import Product, { IProduct } from "../models/product";
import formidable, { File } from "formidable";
import _ from "lodash";
import fs from "fs";
import Category from "../models/category";
import mongoose from "mongoose";

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
        categories: {
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
        error: "Product not found",
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
        error: "Image could not be parsed",
      });
      return;
    }
    const { category, ...otherFields } = fields;
    Category.findById(category).exec((err, cat) => {
      if (err || !cat) {
        res.status(400).json({
          error: "Category not found",
        });
        return;
      }
      const categories = [cat.id, cat.parent];

      const product = new Product({ ...otherFields, categories });

      if (files.image && product.image) {
        // check the image size
        if ((files.image as File).size > 1000000) {
          res.status(400).json({
            error: "Image size is too large",
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
  });
};

export const remove = (req: Request, res: Response): void => {
  const product = req.product;
  product
    .remove()
    .then((deletedProduct: IProduct) => {
      if (!deletedProduct) {
        res.status(400).json({
          error: "Product not found",
        });
        return;
      }
      res.json({
        error: "Product successfully removed",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

export const update = (req: Request, res: Response): void => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(400).json({
        error: "Image could not be parsed",
      });
      return;
    }

    const { category, ...otherFields } = fields;

    Category.findById(category).exec((err, cat) => {
      if (err || !cat) {
        res.status(400).json({
          error: "Category not found",
        });
        return;
      }
      const categories = [cat.id, cat.parent];

      let product = req.product;
      product = (_.extend(product, {
        ...otherFields,
        categories,
      }) as unknown) as IProduct;

      if (files.image && product.image) {
        // check the image size
        if ((files.image as File).size > 1000000) {
          res.status(400).json({
            error: "Image size is too large",
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
  });
};

/**
 * sell / arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no params are used, then all products are returned
 */

export const list = (req: Request, res: Response): void => {
  const order = req.query.order ? req.query.order : "asc";
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  const limit = req.query.limit ? Number(req.query.limit) : 6;

  Product.find()
    .select("-image")
    // .populate("categories")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        res.status(400).json({
          error: "Products not found",
        });
        return;
      }

      res.json(products);
    });
};

interface FindArgs {
  categories?: mongoose.Types.ObjectId;
  price?: { $gte: number; $lte: number };
  name?: {
    $regex: string;
    $options: "i";
  };
}

export const listBySearch = (req: Request, res: Response): void => {
  const order = req.query.order ? req.query.order : "desc";
  const sortBy = req.query.sortBy ? req.query.sortBy : "sold";
  const limit = req.query.limit ? Number(req.query.limit) : 100;
  const skip = req.query.skip ? Number(req.query.skip) : 0;

  const findArgs: Partial<FindArgs> = {};

  if (req.query.category) {
    findArgs.categories = new mongoose.Types.ObjectId(
      req.query.category as string
    );
  }
  if (req.query.price) {
    const range = (req.query.price as string).split("to");
    findArgs.price = {
      $gte: Number(range[0]),
      $lte: Number(range[1]),
    };
  }
  if (req.query.keywords) {
    findArgs.name = {
      $regex: req.query.keywords as string,
      $options: "i",
    };
  }

  Product.find(findArgs)
    .select("-image")
    // .populate("categories")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        res.status(400).json({
          error: "Products not found",
        });
        return;
      }

      res.json(products);
    });
};

/**
 * find the products based on the req product categories
 * other products with the same categories will be returned
 */

interface SearchArgs {
  [key: string]: { $gte: number; $lte: number } | string;
}

export const listRelated = (req: Request, res: Response): void => {
  const limit = req.query.limit ? Number(req.query.limit) : 6;

  Product.find({
    _id: { $ne: req.product },
    categories: req.product.categories,
  })
    .limit(limit)
    .populate("categories", "_id name")
    .exec((err, products) => {
      if (err) {
        res.status(400).json({
          error: "Products not found",
        });
        return;
      }

      res.json(products);
    });
};

export const image = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.product.image?.data) {
    res.set("Content-Type", req.product.image.contentType);
    res.send(req.product.image.data);
    return;
  }

  next();
};

export const listByFilters = (req: Request, res: Response): void => {
  const order = req.body.order ? req.body.order : "desc";
  const sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  const limit = req.body.limit ? Number(req.body.limit) : 100;
  const skip = Number(req.body.skip);
  const searchArgs: SearchArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (const key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        searchArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        searchArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(searchArgs)
    .select("-image")
    .populate("categories")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        res.status(400).json({
          error: "Products not found",
        });
        return;
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

const saveProduct = (res: Response, product: IProduct): void => {
  product.save((err: Error, result) => {
    if (err) {
      if (err.errors && err.errors.name) {
        res.status(400).json({
          error: err.errors.name.message,
        });
        return;
      }
      if (err.errors && err.errors.description) {
        res.status(400).json({
          error: err.errors.description.message,
        });
        return;
      }
      if (err.errors && err.errors.price) {
        res.status(400).json({
          error: err.errors.price.message,
        });
        return;
      }
      if (err.errors && err.errors.categories) {
        res.status(400).json({
          error: err.errors.categories.message,
        });
        return;
      }
      if (err.errors && err.errors.quantity) {
        res.status(400).json({
          error: err.errors.quantity.message,
        });
        return;
      }
    } else {
      res.json({ result });
    }
  });
};
