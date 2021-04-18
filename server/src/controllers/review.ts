import { Request, Response } from "express";
import Review, { IReview } from "../models/review";
import _ from "lodash";
import { CallbackError } from "mongoose";

type Error =
  | (CallbackError & {
      errors?: {
        rating: {
          message: string;
        };
        description: {
          message: string;
        };
        nickName: {
          message: string;
        };
      };
    })
  | null;

export const createOrUpdate = (req: Request, res: Response): void => {
  const product = req.product;
  Review.findOne({ user: req.user?.id, product: product._id }).exec(
    (err, review) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (review) {
        review = _.extend<IReview>(review, req.body);
        review.save((err: Error, review) => {
          if (err) {
            if (err.errors && err.errors.rating) {
              res.status(400).json({
                error: err.errors.rating.message,
              });
              return;
            }
            if (err.errors && err.errors.description) {
              res.status(400).json({
                error: err.errors.description.message,
              });
              return;
            }
            if (err.errors && err.errors.nickName) {
              res.status(400).json({
                error: err.errors.nickName.message,
              });
              return;
            }
            res.status(500).json({ error: err.message });
            return;
          }
          const rating =
            (product.rating * product.numberOfReviews -
              (product.rating - review.rating)) /
            product.numberOfReviews;
          product.updateOne({ rating }).exec();
          res.json(review);
        });
      } else {
        const review = new Review({
          ...req.body,
          user: req.user?.id,
          product: product.id,
        });

        review.save((err: Error, review) => {
          if (err) {
            if (err.errors && err.errors.rating) {
              res.status(400).json({
                error: err.errors.rating.message,
              });
              return;
            }
            if (err.errors && err.errors.description) {
              res.status(400).json({
                error: err.errors.description.message,
              });
              return;
            }
            if (err.errors && err.errors.nickName) {
              res.status(400).json({
                error: err.errors.nickName.message,
              });
              return;
            }
            res.status(500).json({ error: err.message });
            return;
          }
          const rating =
            (product.rating * product.numberOfReviews + review.rating) /
            (product.numberOfReviews + 1);
          product.updateOne({ rating, $inc: { numberOfReviews: 1 } }).exec();
          res.json(review);
        });
      }
    }
  );
};

export const remove = (req: Request, res: Response): void => {
  const product = req.product;
  Review.findOneAndDelete({ user: req.user?.id, product: req.product.id }).exec(
    (err, deletedReview) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (deletedReview) {
        const rating =
          (product.rating * product.numberOfReviews - deletedReview.rating) /
          (product.numberOfReviews - 1);
        product.updateOne({ rating, $inc: { numberOfReviews: -1 } }).exec();
        res.json(deletedReview);
      } else {
        res.status(400).json({ error: "Review not found" });
      }
    }
  );
};

export const list = async (req: Request, res: Response): Promise<void> => {
  let myReview: IReview | null = null;
  if (req.isAuthenticated()) {
    myReview = await Review.findOne({
      user: req.user?.id,
      product: req.product.id,
    }).exec();
  }

  Review.find({ product: req.product.id, user: { $ne: req.user?.id } }).exec(
    (err, reviews) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ myReview, otherReviews: reviews });
    }
  );
};
