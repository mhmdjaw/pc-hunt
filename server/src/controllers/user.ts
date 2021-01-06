import { Request, Response } from "express";
import User from "../models/user";

export const read = (req: Request, res: Response): void => {
  res.json(req.user);
};

export const update = (req: Request, res: Response): void => {
  User.findOneAndUpdate(
    { _id: req.user?.id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
        return;
      }
      res.json(user);
    }
  );
};
