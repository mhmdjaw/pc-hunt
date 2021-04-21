import { Request, Response } from "express";
import { slugify } from "../helpers";
import User from "../models/user";

export const read = (req: Request, res: Response): void => {
  res.json({ user: req.user });
};

export const update = (req: Request, res: Response): void => {
  if (!req.body.name) {
    res.status(400).json({ error: "Name not provided" });
    return;
  }
  User.findOneAndUpdate(
    { _id: req.user?.id },
    { name: req.body.name },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        res.status(500).json({
          error: err.message,
        });
        return;
      }
      res.json(user);
    }
  );
};

export const readSellers = (_req: Request, res: Response): void => {
  User.find({ role: 1 })
    .select("name")
    .exec((err, sellers) => {
      if (err) {
        res.status(400).json({ error: "Couldn't retrieve brands" });
        return;
      }
      const brands = sellers.map((seller) => ({
        name: seller.name,
        slug: slugify(seller.name),
      }));
      res.json(brands);
    });
};
