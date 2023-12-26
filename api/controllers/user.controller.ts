import { Request, Response, Application, NextFunction } from "express";
import Users from "../models/user.model";
import bcrypt from "bcrypt";

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
    const userList: any = Users.findOne({ email: userInfo.email });
    if (!userList) next("UserNotFound");
    const isVerify: Promise<boolean> = bcrypt.compareSync(
      userInfo.password,
      userList.password
    );
  } catch (err) {
    next(err);
  }
};
