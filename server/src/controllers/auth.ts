import { NextFunction, Request, Response } from "express";
import passport from "passport";
import User from "../models/user";

export const signup = (req: Request, res: Response): void => {
  const user = new User({ ...req.body, passwordAvailable: true });

  User.register(user, req.body.password, (err, user) => {
    if (err) {
      if (err.errors && err.errors.email) {
        res.status(400).json({
          error: err.errors.email.message,
        });
      } else if (err.errors && err.errors.name) {
        res.status(400).json({
          error: err.errors.name.message,
        });
      } else {
        if (err.name === "UserExistsError") {
          res.status(409).json({
            error: err.message,
          });
        } else {
          res.status(400).json({
            error: err.message || err,
          });
        }
      }
    } else {
      passport.authenticate("local")(req, res, () => {
        user.hash = undefined;
        user.salt = undefined;
        res.json({ user });
      });
    }
  });
};

export const login = (req: Request, res: Response): void => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!user) {
      res.status(401).json({ error: info.message });
      return;
    }
    req.login(user, (err) => {
      if (err) {
        res.status(500).json({
          error: err.message,
        });
        return;
      }
      user.hash = undefined;
      user.salt = undefined;
      res.json({ user });
    });
  })(req, res);
};

export const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
  display: "popup",
});

export const googleAuthResult = (req: Request, res: Response): void => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!user) {
      res.status(401).json({ error: info.message });
      return;
    }
    req.login(user, (err) => {
      if (err) {
        res.status(500).json({
          error: err.message,
        });
        return;
      }
      res.redirect(`${process.env.CLIENT_BASE_URL}/auth/success`);
    });
  })(req, res);
};

export const logout = (req: Request, res: Response): void => {
  req.logout();
  req.session.destroy(() => {
    res
      .clearCookie("connect.sid", { path: "/", httpOnly: true })
      .sendStatus(200);
  });
};

export const validateSession = (req: Request, res: Response): void => {
  if (req.isAuthenticated())
    res.json({
      user: req.user,
      message: "Session valid",
    });
  else
    res.json({
      message: "No available session",
    });
};

export const changePassword = (req: Request, res: Response): void => {
  User.findOne({ _id: req.user?.id }).exec((err, user) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (user) {
      if (user.passwordAvailable) {
        const { oldPassword, newPassword } = req.body;
        user.changePassword(oldPassword, newPassword, (err) => {
          if (err.message) {
            res.status(400).json({ error: "Your old password is incorrect" });
            return;
          }
          if (err) {
            res.status(400).json({ error: err });
          }
          res.json({ message: "Your password has been changed" });
        });
      } else {
        user.setPassword(req.body.newPassword, (err) => {
          if (err) {
            res.status(400).json({ error: "Couldn't set your password" });
            return;
          }
          user.passwordAvailable = true;
          user.save((err) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            res.json({ message: "Your password has been saved" });
          });
        });
      }
    } else {
      res.status(500).json({ error: "Something went wrong. Please try again" });
    }
  });
};

export const isAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.isAuthenticated()) {
    res.status(403).json({
      error: "Not authenticated",
    });
  } else {
    next();
  }
};

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role === 0) {
    res.status(403).json({
      error: "Admin resource! Access denied",
    });
    return;
  }
  next();
};
