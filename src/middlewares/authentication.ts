import jwt from "jsonwebtoken";
import Admin from "../models/admin";
import { Response, Request, NextFunction } from "express";
import { DecodedToken } from "../utils/Interfaces/auth";
import { decodeToken } from "../utils/functions/helperFunctions";


export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.auth_token;
  if (!token) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }
  try {
    console.log('token', token)
    const decoded = decodeToken(token)
    if(!decoded){
      console.log('decoded', decoded)
      throw new Error  
    }

    const foundUser = await Admin.findOne({where:{email:decoded.email}, attributes:['id', 'email']});
    console.log(foundUser)
    // @ts-ignore
    req.user = foundUser?.dataValues;
    // @ts-ignore
    console.log(req.user)
    console.log('Authenticated')
    next();
  } catch (error:any) {
    console.log(error.message)
    res.status(404).json({ message: "Invalid token" });
  }
};
