import { JwtPayload } from "jsonwebtoken";

export interface DecodedToken  extends JwtPayload{
    loginEmail?:string
}

export interface CreateAdminPropsInterface{
    email: string,
    hashedPassword: string
}