import { Request, Response } from "express";
import User from "../models/user";

export const signup = (req: Request, res: Response): void => {
  console.log("req.body", req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    res.json({
      user,
    });
  });
};
