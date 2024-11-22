import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import { GenerateTokenHelperInterface, ComparePasswordHelperInterface } from "../Interfaces/helper";


export const generateToken = ({fetchedId, email}: GenerateTokenHelperInterface) => {
    return jwt.sign({ fetchedId, email }, process.env.TOKEN_SECRET_KEY as string)
}


export const decodeToken = (token:string) => {
    const verifiedData = jwt.verify(token, process.env.TOKEN_SECRET_KEY as string, (error, decoded) => {
        if (error) {
            return null
        } else {
            return decoded;
        }
    });

    return verifiedData;
};


export const checkPassword = ({password, encodedValue}: ComparePasswordHelperInterface) => {
    return bcrypt.compare(password, encodedValue)
}