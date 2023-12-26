import { Request, Response, Application, NextFunction } from "express";
import Users from "../models/user.model";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

interface UserI {
  username: string;
  email: string;
  password: string;
}

const saltRounds = 10;

export const getUsers = (req: Request, res: Response) => {
  res.json({
    username: "mostafa",
    email: "mostafa@mostafa.com",
    password: "mostafa",
  });
};

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userInfo: UserI = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  let hashPassword: string = "";
  await bcrypt.hash(userInfo.password, saltRounds).then((hash) => {
    hashPassword = hash;
  });
  // const hashPassword: string = bcrypt.hashSync(userInfo.password, salt);
  console.log(typeof hashPassword);
  const newUser = new Users({ ...userInfo, password: hashPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "SuccessfullAddingToMongoDB" });
  } catch (err) {
    // res.status(500).json({ message: err });
    next(err);
  }
};

export const checkUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userInfo: UserI = req.body;
  try {
    Users.findOne({ email: userInfo.email })
      .then((result: any) => {
        if (result) {
          const isVerify: boolean = bcrypt.compareSync(
            userInfo.password,
            result!.password
          );
          if (!isVerify) {
            next("WrongCredential");
          } else {
            const token = jwt.sign(
              {
                id: result!._id,
              },
              process.env.JWTSECRET as string,
              { expiresIn: "2h" }
            );
            const { password: hashPassword, ...userrest } = result!._doc;
            res
              .cookie("auth_token", token, { httpOnly: true })
              .status(201)
              .json(userrest);
            // .json({ username: result!.username, email: result!.email });
          }
        } else {
          res.status(404).json({ error: "EmailNotFound" });
        }
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    next(err);
  }
};
