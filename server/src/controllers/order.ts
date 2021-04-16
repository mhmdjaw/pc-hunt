import { Request, Response } from "express";
import Product from "../models/product";
import Order from "../models/order";
import mongoose from "mongoose";

export const read = (req: Request, res: Response): void => {
  Order.find({ user: req.user?.id })
    .sort({ createdAt: "desc" })
    .populate("item.product", "-image")
    .exec((err, orders) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(orders);
    });
};

interface FindArgs {
  $or?: {
    orderId?: string;
    "item.product.name"?: {
      $regex: string;
      $options: "i";
    };
  }[];
}

export const search = (req: Request, res: Response): void => {
  const user = new mongoose.Types.ObjectId(req.user?.id);
  const findArgs: FindArgs = {};

  if (req.params.search) {
    findArgs.$or = [
      { orderId: req.params.search },
      { "item.product.name": { $regex: req.params.search, $options: "i" } },
    ];
  }

  Order.aggregate()
    .match({ user })
    .lookup({
      from: Product.collection.name,
      localField: "item.product",
      foreignField: "_id",
      as: "item.product",
    })
    .unwind("item.product")
    .match(findArgs)
    .project({ "item.product.image": 0 })
    .sort({ createdAt: "desc" })
    .exec((err, orders) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(orders);
    });
};
