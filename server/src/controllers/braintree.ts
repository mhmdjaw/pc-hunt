import braintree from "braintree";
import "dotenv-safe/config";
import { Request, Response } from "express";
import Product, { IProduct } from "../models/product";
import Cart from "../models/cart";
import Order from "../models/order";
import Address from "../models/address";
import { round } from "lodash";

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const generateToken = (_req: Request, res: Response): void => {
  gateway.clientToken
    .generate({})
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

export const processPayment = (req: Request, res: Response): void => {
  const nonceFromTheClient = req.body.paymentMethodNonce;

  Cart.findOne({ user: req.user?.id })
    .populate("cartItems.product", "-image")
    .exec((err, cart) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (cart) {
        Address.findOne({ user: req.user?.id }).exec((err, address) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          if (address) {
            const isEnoughQuantity = !cart.cartItems.some(
              (cartItem) =>
                (cartItem.product as IProduct).quantity < cartItem.quantity
            );
            if (isEnoughQuantity) {
              const updates = cart.cartItems.map((cartItem) => ({
                updateOne: {
                  filter: { _id: (cartItem.product as IProduct).id },
                  update: { $inc: { quantity: -cartItem.quantity } },
                },
              }));
              Product.bulkWrite(updates, { ordered: false })
                .then(() => {
                  const subtotal = cart.cartItems.reduce(
                    (accumulator, cartItem) =>
                      accumulator +
                      (cartItem.product as IProduct).price * cartItem.quantity,
                    0
                  );
                  const taxes = 0.13 * subtotal;
                  const totalPrice = subtotal + taxes;
                  gateway.transaction
                    .sale({
                      amount: round(totalPrice, 2).toString(),
                      paymentMethodNonce: nonceFromTheClient,
                      options: { submitForSettlement: true },
                    })
                    .then((result) => {
                      if (result.success) {
                        cart.remove();
                        const isCreditCard =
                          result.transaction.paymentInstrumentType ===
                          "credit_card";
                        const isPaypal =
                          result.transaction.paymentInstrumentType ===
                          "paypal_account";
                        const orders = cart.cartItems.map(
                          (cartItem) =>
                            new Order({
                              user: req.user?.id,
                              item: {
                                product: (cartItem.product as IProduct).id,
                                quantity: cartItem.quantity,
                              },
                              orderId: result.transaction.id,
                              orderSummary: {
                                productTotal:
                                  (cartItem.product as IProduct).price *
                                  cartItem.quantity,
                                taxes:
                                  0.13 *
                                  ((cartItem.product as IProduct).price *
                                    cartItem.quantity),
                              },
                              address,
                              paymentMethod: {
                                instrumentType: isCreditCard
                                  ? "card"
                                  : "paypal",
                                card: isCreditCard
                                  ? {
                                      cardType:
                                        result.transaction.creditCard?.cardType,
                                      last4:
                                        result.transaction.creditCard?.last4,
                                    }
                                  : null,
                                paypalEmail: isPaypal
                                  ? result.transaction.paypalAccount?.payerEmail
                                  : null,
                                imageUrl: isCreditCard
                                  ? result.transaction.creditCard?.imageUrl
                                  : result.transaction.paypalAccount?.imageUrl,
                              },
                            })
                        );

                        Order.insertMany(orders, { ordered: false }, (err) => {
                          if (err) {
                            res.json({
                              success: true,
                              orderId: result.transaction.id,
                            });
                            return;
                          }
                          res.json({
                            success: true,
                            orderId: result.transaction.id,
                          });
                        });
                      } else {
                        const updates = cart.cartItems.map((cartItem) => ({
                          updateOne: {
                            filter: { _id: (cartItem.product as IProduct).id },
                            update: { $inc: { quantity: cartItem.quantity } },
                          },
                        }));
                        Product.bulkWrite(
                          updates,
                          { ordered: false },
                          (err) => {
                            if (err) {
                              res.status(400).json({
                                error: "Your transaction was declined.",
                              });
                              return;
                            }
                            res.status(400).json({
                              error: "Your transaction was declined.",
                            });
                          }
                        );
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch(() => {
                  res.status(500).json({
                    error:
                      "Something went wrong! This is an error from our side.",
                  });
                });
            } else {
              res.status(400).json({
                error:
                  "Looks like the quantities of some of the products reduced and no longer cover the quantities requested in your cart. Please refresh the page to see what changed.",
              });
            }
          } else {
            res.status(400).json({ error: "No address was given" });
          }
        });
      } else {
        res.status(400).json({ error: "you have no items in your cart" });
      }
    });
};
