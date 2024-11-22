import express from "express";
import { signupUser } from "../controllers/user";
// import { loginUser, signupUser, checkUser, logoutUser } from "../controllers/user";
import { authentication } from "../middlewares/authentication";

const userRouter = express.Router();

// @ts-ignore
userRouter.post("/signup", signupUser);
// @ts-ignore
// userRouter.post("/login", loginUser);
// // @ts-ignore
// userRouter.get("/check", authentication, checkUser);
// // @ts-ignore
// userRouter.get('/logout', authentication, logoutUser)

export default userRouter;
