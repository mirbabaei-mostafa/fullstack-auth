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
  image?: string;
}

interface UserUI {
  _id: string;
  username: string;
  email: string;
  password: string;
}

interface TokenI {
  _id: string;
  username: string;
  email: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const saltRounds = 10;

const generatePassword = (): string => {
  const passLength: number = 16;
  const charset: string =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let retVal: string = "";
  for (var i = 0, n = charset.length; i < passLength; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

const getToken = (tInfo: TokenI): string => {
  return jwt.sign(tInfo, process.env.JWTSECRET as string, { expiresIn: "2h" });
};

export const getUsers = (req: Request, res: Response) => {
  res.json({
    username: "mostafa",
    email: "mostafa@mostafa.com",
    password: "mostafa",
  });
};

// Adding new user by sign up
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

// Sign in process
export const checkUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userInfo: UserI = req.body;
  try {
    await Users.findOne({ email: userInfo.email })
      .then((result: any) => {
        if (result) {
          const isVerify: boolean = bcrypt.compareSync(
            userInfo.password,
            result!.password
          );
          if (!isVerify) {
            next({ status: 404, message: "WrongCredential" });
          } else {
            const { password: hashPassword, ...userrest } = result!._doc;
            // const token: string = getToken(result!._id);
            const token: string = getToken(userrest);
            console.log(userrest);
            res
              .cookie("auth_token", token, {
                httpOnly: true,
                maxAge: 2 * 60 * 60,
              })
              .status(201)
              .json(userrest);
            // res.status(201).json({ message: 'SuccessfullAuthentication' });
          }
        } else {
          next({ status: 404, message: "EmailNotFound" });
        }
      })
      .catch((err) => {
        next({ status: 400, message: err.message });
      });
  } catch (err) {
    next({ status: 500, message: "UnknownError" });
  }
};

// Google based authentication handler
export const googleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userInfo: UserI = req.body;
  try {
    let AddGoogleAccountToDB: boolean = false;
    await Users.findOne({ email: userInfo.email })
      .then((result: any) => {
        if (result) {
          const token: string = getToken(result!._id);
          const { password: hashPassword, ...userrest } = result!._doc;
          res
            .cookie("auth_token", token, {
              httpOnly: true,
              maxAge: 2 * 60 * 60,
            })
            .status(201)
            .json(userrest);
          res.status(201).json({ message: "SuccessfullAuthentication" });
        } else {
          AddGoogleAccountToDB = true;
        }
      })
      .catch((err) => {
        next({ status: 400, message: err.message });
      });
    if (AddGoogleAccountToDB) {
      const newPass: string = generatePassword();
      const hashPass = bcrypt.hashSync(newPass, saltRounds);
      const postFix = Math.floor(Math.random() * 32145);
      const newUser = new Users({
        ...userInfo,
        username: userInfo.username.split(" ").join("") + postFix,
        password: hashPass,
      });
      await newUser.save();
      const { password: hashPassword, ...userrest } = (newUser as any)._doc;
      const token: string = getToken(userrest);
      res
        .cookie("auth_token", token, {
          httpOnly: true,
          maxAge: 2 * 60 * 60,
        })
        .status(201)
        .json({ ...userrest, message: "SuccessfullAddingToMongoDB" });
    }
  } catch (err) {
    next({ status: 500, message: "UnknownError" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userInfo: UserUI = req.body;
  try {
    await Users.findOne({ _id: userInfo._id })
      .then((result: any) => {
        if (result) {
          const token: string = getToken(result!._id);
          const { password: hashPassword, ...userrest } = result!._doc;
          res
            .cookie("auth_token", token, {
              httpOnly: true,
              maxAge: 2 * 60 * 60,
            })
            .status(201)
            .json(userrest);
          res.status(201).json({ message: "SuccessfullAuthentication" });
        } else {
          // AddGoogleAccountToDB = true;
        }
      })
      .catch((err) => {
        next({ status: 400, message: err.message });
      });
  } catch (err) {
    next({ status: 500, message: "UnknownError" });
  }
};
