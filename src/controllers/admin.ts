import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import Admin from "../models/admin";
import { createAdmin, findAdmin } from "../utils/functions/admin";
import {
  checkPassword,
  generateToken,
} from "../utils/functions/helperFunctions";

export const signupAdmin = async (req: Request, res: Response) => {
  const { email, password, confirmPassword, secretKey } = req.body;

  if (!email || !password || !confirmPassword || !secretKey) {
    res.status(400).json({ message: "Please fill all fields" });
    return;
  }
  if (secretKey !== process.env.ADMIN_SECRET_KEY) {
    res.status(400).json({ success: false, message: "Incorrect secret key" });
    return;
  }

  const adminFound = await findAdmin(email);
  if (adminFound) {
    res
      .status(400)
      .json({ success: false, message: "Admin already registered" });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    if (!hashedPassword) {
      throw new Error();
    }

    const admin = await createAdmin({ email, hashedPassword });
    console.log(admin);

    res.status(200).json({ success: true, message: "Account created" });
    return;
  } catch (error: any) {
    console.log(error.message);
    res
      .status(400)
      .json({ success: false, message: "Internal error. Please try again" });
    return;
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, password, secretKey } = req.body;

  if (!email || !password || !secretKey) {
    res.status(400).json({ message: "Please fill all fields" });
    return;
  }

  if (secretKey !== process.env.ADMIN_SECRET_KEY) {
    res.status(400).json({ success: false, message: "Incorrect secret key" });
    return;
  }

  const admin = await findAdmin(email);
  if (!admin) {
    res.status(400).json({ message: "User doesn't exist" });
    return;
  }
  const encodedValue = admin?.dataValues?.password;
  const verifyPassword = checkPassword({ password, encodedValue });

  if (!verifyPassword) {
    res.status(400).json({ message: "Entered password is incorrect" });
    return;
  }

  const fetchedId = admin?.dataValues?.id;
  const token = generateToken({ userId: fetchedId, email });

  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 1000,
  });

  console.log({ id: fetchedId, email: email })
  res.status(200).json({
    message: "Logged in successfulle",
    admin: { id: fetchedId, email: email },
  });
};


export const logoutAdmin = (req:Request, res:Response) =>{
    console.log('Logged out')
    res.clearCookie('auth_token', { httpOnly: true, path: '/' })
    res.status(200).json({message:'Logged out successfully'})
  }
