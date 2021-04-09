import braintree from "braintree";
import "dotenv-safe/config";
import { Request, Response } from "express";

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
  const amountFromTheClient = req.body.amount;

  gateway.transaction
    .sale({
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
