import { Request, Response } from "express";
import { CallbackError } from "mongoose";
import Category from "../models/category";

type Error =
  | (CallbackError & {
      errors?: {
        name: {
          message: string;
        };
      };
    })
  | null;

export const create = (req: Request, res: Response): void => {
  const category = new Category(req.body);
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
