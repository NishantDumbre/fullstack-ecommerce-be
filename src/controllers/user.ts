import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import Admin from "../models/admin";
import jwt from "jsonwebtoken";

const generateToken = (id: string, email: string) => {
  return jwt.sign({ id, email }, process.env.TOKEN_SECRET_KEY as string);
};

export const signupUser = async (req: Request, res: Response) => {
  console.log(req.body);
  // const { signupEmail, signupPassword } = req.body;
  // const saltRounds = parseInt(process.env.SALT_ROUNDS as string);

  // bcrypt.hash(signupPassword, saltRounds, async (err, hash) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(502).json({ message: "Internal server error" });
  //   }
  //   try {
  //     const instance = new User({
  //       email: signupEmail,
  //       password: hash,
  //     });
  //     await instance.save();
  //     return res.status(200).json({ message: "Account created successfully!" });
  //   } catch (error: any) {
  //     console.log(error);
  //     return res.status(409).json({ message: "User already registered" });
  //   }
  // });
};


// export const loginUser = async (req: Request, res: Response) => {
//   console.log(req.body);
//   const { loginEmail, loginPassword } = req.body;
//   try {
//     const user = await User.findOne({ email: loginEmail });
//     if (!user) {
//       res.status(404).json({ message: "User not registered" });
//       return;
//     }
//     const fetchedPassword = user.password;
//     bcrypt.compare(loginPassword, fetchedPassword, (err, result) => {
//       if (err) throw new Error("Something went wrong");
//       if (result === false) {
//         res
//           .status(401)
//           .json({ success: false, message: "Entered password is wrong" });
//       } else {
//         const token = generateToken(user.id, user.email);
//         res.cookie("auth_token", token, {
//           httpOnly: true,
//           secure: false,
//           sameSite: "lax",
//           maxAge: 60 * 60 * 1000,
//         });
//         res
//           .status(200)
//           .json({
//             success: true,
//             message: "Logged in successfully",
//             user: { id: user.id, email: user.email },
//           });
//       }
//     });
//   } catch (error: any) {
//     console.log(error);
//     res.status(500).json(error.message);
//   }
// };


// export const checkUser = (req:Request, res:Response) =>{
//   console.log("req user",req.user)
//   const user = {email:req.user?.email, id:req.user?._id}
//   res.status(200).json({message:"User authorized", user})
// }


// export const logoutUser = (req:Request, res:Response) =>{
//   res.clearCookie('auth_token', { httpOnly: true, path: '/' })
//   res.status(200).json({message:'Logged out successfully'})
// }
