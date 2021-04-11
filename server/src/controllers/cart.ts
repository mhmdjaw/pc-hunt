import { Request, Response } from "express";
import Cart from "../models/cart";
import mongoose from "mongoose";

export const read = (req: Request, res: Response): void => {
  Cart.findOne({ user: req.user?.id })
    .populate("cartItems.product", "-image")
    .exec((err, cart) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (cart) {
        res.json(cart.cartItems);
      } else {
        res.json([]);
      }
    });
};

export const badget = (req: Request, res: Response): void => {
  Cart.findOne({ user: req.user?.id }).exec((err, cart) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (cart) {
      const badget = cart.cartItems.reduce(
        (accumulator, item) => accumulator + item.quantity,
        0
      );
      res.json({ badget });
    } else {
      res.json({ badget: 0 });
    }
  });
};

export const addOneItem = (req: Request, res: Response): void => {
  const product = req.body.product;
  const quantity = req.body.quantity ? req.body.quantity : null;

  Cart.findOne({ user: req.user?.id }).exec((err, cart) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (cart) {
      const item = cart.cartItems.find((item) => item.product == product);
      let condition, update;
      if (item) {
        condition = { user: req.user?.id, "cartItems.product": product };
        update = {
          $set: {
            "cartItems.$.quantity": quantity ? quantity : item.quantity + 1,
          },
        };
      } else {
        condition = { user: req.user?.id };
        update = { $push: { cartItems: req.body } };
      }

      Cart.findOneAndUpdate(condition, update, {
        new: true,
        useFindAndModify: false,
      }).exec((err, cart) => {
        if (err || !cart) {
          res.status(400).json({ error: "Add to cart failed." });
          return;
        }
        const badget = cart.cartItems.reduce(
          (accumulator, item) => accumulator + item.quantity,
          0
        );
        res.json({ badget });
      });
    } else {
      const newCart = new Cart({
        user: req.user?.id,
        cartItems: [req.body],
      });
      newCart.save((err, cart) => {
        if (err || !cart) {
          res.status(400).json({ error: "Add to cart failed." });
          return;
        }
        res.json({ badget: 1 });
      });
    }
  });
};

export const removeItem = (req: Request, res: Response): void => {
  Cart.findOneAndUpdate(
    { user: req.user?.id },
    { $pull: { cartItems: req.body } },
    { new: true, useFindAndModify: false }
  ).exec((err, cart) => {
    if (err || !cart) {
      res.status(400).json({ error: "Failed to remove product from cart." });
      return;
    }
    const badget = cart.cartItems.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0
    );
    res.json({ badget });
  });
};

export const addManyItems = (req: Request, res: Response): void => {
  let products: { product: mongoose.Types.ObjectId; quantity: number }[] =
    req.body.products;

  if (!products) {
    res.status(400).json({ error: "Bad request" });
    return;
  }

  Cart.findOne({ user: req.user?.id }).exec((err, cart) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (cart) {
      products = products.filter(
        (product) =>
          !cart.cartItems.some((item) => item.product == product.product)
      );
      cart.cartItems = [...cart.cartItems, ...products];
      cart.save((err, cart) => {
        if (err || !cart) {
          res.status(400).json({ error: "Failed to add items to cart." });
          return;
        }
        const badget = cart.cartItems.reduce(
          (accumulator, item) => accumulator + item.quantity,
          0
        );
        res.json({ badget });
      });
    } else {
      const newCart = new Cart({
        user: req.user?.id,
        cartItems: products,
      });
      newCart.save((err, cart) => {
        if (err || !cart) {
          res.status(400).json({ error: "Failed to add items to cart." });
          return;
        }
        res.json({ badget: products.length });
      });
    }
  });
};
