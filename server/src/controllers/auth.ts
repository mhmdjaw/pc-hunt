import { NextFunction, Request, Response } from "express";
import passport from "passport";
import User from "../models/user";
import sgMail from "@sendgrid/mail";
import { generatePassword } from "../helpers";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const signup = (req: Request, res: Response): void => {
  const user = new User({ ...req.body, passwordAvailable: true, role: 0 });

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
      res.redirect(`${process.env.CLIENT_BASE_URL}/auth-success`);
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
          if (err?.message) {
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
              res.status(400).json({ error: "Couldn't set your password" });
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

export const forgotPassword = (req: Request, res: Response): void => {
  if (!req.body.email) {
    res.status(400).json({ error: "Please provide an email" });
    return;
  }
  if (req.body.email === "asus@pchunt.co") {
    res.json({
      message:
        "Using this email is not allowed. This account's password is public.",
    });
  }
  const email = req.body.email;
  const generatedPassword = generatePassword(8);
  User.findOne({ email: email }).exec((err, user) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (user) {
      user.setPassword(generatedPassword, (err) => {
        if (err) {
          res
            .status(500)
            .json({ error: "Something went wrong, please try again" });
          return;
        }
        user.save((err) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          const emailData: sgMail.MailDataRequired = {
            to: email,
            from: {
              email: "customer.support@pchunt.co",
              name: "PC Hunt Support",
            },
            replyTo: "customer.support@pchunt.co",
            subject: "Forgot Password",
            html: `
            <h1>Hey ${user.name},</h1>
            <br>
            <h2>Your new password: <b>${generatedPassword}</b></h2>
            <br>
            <p>Please change your password when you login to your account.</p>
            `,
          };
          sgMail
            .send(emailData)
            .then((sent) => console.log("SENT", sent))
            .catch((err) => console.log("ERROR", err));

          res.json({
            message:
              "If a user with this email address exists, you will soon get an email. It might also be in your spam folder.",
          });
        });
      });
    } else {
      res.json({
        message:
          "If a user with this email address exists, you will soon get an email. It might also be in your spam folder.",
      });
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
