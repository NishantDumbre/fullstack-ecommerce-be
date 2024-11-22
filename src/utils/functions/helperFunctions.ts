import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import { GenerateTokenHelperInterface, ComparePasswordHelperInterface, DecodeTokenInterface } from "../Interfaces/helper";


export const generateToken = ({userId, email}: GenerateTokenHelperInterface) => {
    return jwt.sign({ userId, email }, process.env.TOKEN_SECRET_KEY as string)
}


export const decodeToken = (token: string): DecodeTokenInterface | null => {
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY as string) as DecodeTokenInterface;
        return decoded;
    } catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
};


export const checkPassword = ({password, encodedValue}: ComparePasswordHelperInterface) => {
    return bcrypt.compare(password, encodedValue)
}