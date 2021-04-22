import { NextFunction, Request, Response } from "express";
import Post from "../models/post";

export const postBySlug = (
  req: Request,
  res: Response,
  next: NextFunction,
  slug: string
): void => {
  Post.findOne({ slug }).exec((err, post) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!post) {
      res.status(400).json({ error: "Post doesn't exist" });
      return;
    }
    req.post = post;
    next();
  });
};

export const create = (req: Request, res: Response): void => {
  const post = new Post({ postedBy: req.user?.name, ...req.body });
  post.save((err, post) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(post);
  });
};

export const remove = (req: Request, res: Response): void => {
  const post = req.post;
  if ((req.user?.name as string) !== post.postedBy) {
    res.status(400).json({ error: "Post doesn't belong to this user" });
    return;
  }
  post
    .deleteOne()
    .then((post) => {
      if (post) {
        res.json({
          message: "Your post has been deleted",
        });
      } else {
        res.status(400).json({
          error: "Post not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

export const read = (req: Request, res: Response): void => {
  res.json(req.post);
};

export const list = (req: Request, res: Response): void => {
  const limit = req.query.limit ? Number(req.query.limit) : 500;
  const skip = req.query.skip ? Number(req.query.skip) : 0;

  Post.find()
    .sort({ createdAt: "desc" })
    .skip(skip)
    .limit(limit)
    .exec((err, posts) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(posts);
    });
};

export const listSeller = (req: Request, res: Response): void => {
  Post.find({ postedBy: req.user?.name })
    .sort({ createdAt: "desc" })
    .exec((err, posts) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      return res.json(posts);
    });
};
