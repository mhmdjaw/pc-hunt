import { Request, Response } from "express";
import Address, { IAddress } from "../models/address";
import _ from "lodash";

export const createOrUpdate = (req: Request, res: Response): void => {
  Address.findOne({ user: req.user?.id }).exec((err, address) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (address) {
      address = _.extend<IAddress>(address, req.body);
      address.save((err, address) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }

        res.json(address);
      });
    } else {
      const newAddress = new Address({ ...req.body, user: req.user?.id });

      newAddress.save((err, address) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }

        res.json(address);
      });
    }
  });
};

export const read = (req: Request, res: Response): void => {
  Address.findOne({ user: req.user?.id }).exec((err, address) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json(address);
  });
};
