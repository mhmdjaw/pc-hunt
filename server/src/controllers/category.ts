import { NextFunction, Request, Response } from "express";
import { CallbackError } from "mongoose";
import Category, { ICategory } from "../models/category";

type Error =
  | (CallbackError & {
      errors?: {
        name: {
          message: string;
        };
      };
    })
  | null;

export const categoryById = (
  req: Request,
  res: Response,
  next: NextFunction,
  id: string
): void => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      res.status(400).json({
        message: "Category not found",
      });
      return;
    }
    req.category = category;
    next();
  });
};

export const create = (req: Request, res: Response): void => {
  const category = new Category(req.body);
  saveCategory(res, category);
};

export const read = (req: Request, res: Response): void => {
  res.json(req.category);
};

export const update = (req: Request, res: Response): void => {
  const category = req.category;
  category.name = req.body.name;
  saveCategory(res, category);
};

export const remove = (req: Request, res: Response): void => {
  const category = req.category;

  category
    .remove()
    .then((deletedCategory: ICategory) => {
      if (!deletedCategory) {
        res.status(400).json({
          message: "Category not found",
        });
        return;
      }
      res.json({
        message: "Category successfully remove",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

export const list = (_req: Request, res: Response): void => {
  Category.find().exec((err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
      return;
    }

    res.json(data);
  });
};

const saveCategory = (res: Response, category: ICategory): void => {
  category.save((err: Error, data) => {
    if (err) {
      if (err.errors && err.errors.name) {
        res.status(400).json({
          message: err.errors.name.message,
        });
      } else {
        res.status(500).json({
          message: err?.message,
        });
      }
    } else {
      res.json({ data });
    }
  });
};
