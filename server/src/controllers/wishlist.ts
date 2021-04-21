import { Request, Response } from "express";
import Wishlist from "../models/wishlist";

export const add = (req: Request, res: Response): void => {
  const product = req.product;
  Wishlist.findOne({ user: req.user?.id }).exec((err, wishlist) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (wishlist) {
      const exists = wishlist.products.includes(product._id);
      if (exists) {
        res.json({ exists });
      } else {
        wishlist.products.push(product._id);
        wishlist.save((err) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.json({ exists });
        });
      }
    } else {
      const newWishlist = new Wishlist({
        user: req.user?.id,
        products: [product._id],
      });
      newWishlist.save((err) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ exists: false });
      });
    }
  });
};

export const remove = (req: Request, res: Response): void => {
  Wishlist.findOneAndUpdate(
    { user: req.user?.id },
    { $pull: { products: req.product._id } },
    { useFindAndModify: false }
  ).exec((err, wishlist) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (wishlist) {
      res.json({ message: "Item removed from your wishlist" });
    } else {
      res.status(400).json({ error: "Item doesn't exist in your wishlist" });
    }
  });
};

export const read = (req: Request, res: Response): void => {
  Wishlist.findOne({ user: req.user?.id })
    .populate("products", "-image")
    .exec((err, wishlist) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (wishlist) {
        res.json(wishlist.products);
      } else {
        res.json([]);
      }
    });
};
