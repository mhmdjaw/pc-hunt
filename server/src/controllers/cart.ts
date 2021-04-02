import { Request, Response } from "express";
import Cart from "../models/cart";

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

export const addItemToCart = (req: Request, res: Response): void => {
  const product = req.body.product;
  const quantity = req.body.quantity ? req.body.quantity : null;

  Cart.findOne({ user: req.user?.id }).exec((err, cart) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (cart) {
      const item = cart.cartItems.find((item) => item.product == product);
      let badget = cart.cartItems.reduce(
        (accumulator, item) => accumulator + item.quantity,
        0
      );
      let condition, update;
      if (item) {
        condition = { user: req.user?.id, "cartItems.product": product };
        update = {
          $set: {
            "cartItems.$.quantity": quantity ? quantity : item.quantity + 1,
          },
        };
        badget = quantity ? badget - item.quantity + quantity : badget + 1;
      } else {
        condition = { user: req.user?.id };
        update = {
          $push: {
            cartItems: req.body,
          },
        };
        badget++;
      }

      Cart.findOneAndUpdate(condition, update).exec((err, cart) => {
        if (err || !cart) {
          res.status(400).json({ error: "Add to cart failed" });
          return;
        }

        res.json({ badget });
      });
    } else {
      const newCart = new Cart({
        user: req.user?.id,
        cartItems: [req.body],
      });
      newCart.save((err, cart) => {
        if (err || !cart) {
          res.status(400).json({ error: "Add to cart failed" });
          return;
        }
        res.json({ badget: 1 });
      });
    }
  });
};
