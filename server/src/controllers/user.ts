import { Request, Response } from "express";
import passport from "passport";
import User from "../models/user";

export const signup = (req: Request, res: Response): void => {
  const user = new User(req.body);

  User.register(user, req.body.password, (err, user) => {
    if (err) {
      if (err.errors && err.errors.email) {
        res.status(400).json({
          message: err.errors.email.message,
        });
      } else if (err.errors && err.errors.name) {
        res.status(400).json({
          message: err.errors.name.message,
        });
      } else {
        if (err.name === "UserExistsError") {
          res.status(409).json({
            message: err.message,
          });
        } else {
          res.status(400).json({
            message: err.message || err,
          });
        }
      }
    } else {
      passport.authenticate("local")(req, res, () => {
        res.json({ user });
      });
    }
  });
};

export const login = (req: Request, res: Response): void => {
  const user = new User(req.body);

  req.login(user, (err) => {
    if (err) {
      if (err.errors && err.errors.email) {
        res.status(400).json({
          message: err.errors.email.message,
        });
      } else {
        res.status(400).json({
          message: err.message,
        });
      }
    } else {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          res.status(400).json({ message: err.message });
          return;
        }
        if (!user) {
          res.status(401).json({ message: info.message });
          return;
        }
        res.json({ user });
      })(req, res);
    }
  });
};

export const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleAuthResult = (req: Request, res: Response): void => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }
    if (!user) {
      res.status(401).json({ message: info.message });
      return;
    }
    res.redirect("http://localhost:3000");
  })(req, res);
};
