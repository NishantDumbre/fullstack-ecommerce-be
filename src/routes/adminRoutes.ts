import express from "express";
import { signupAdmin, loginAdmin } from "../controllers/admin";
// import { loginUser, signupUser, checkUser, logoutUser } from "../controllers/user";
import { authentication } from "../middlewares/authentication";

const adminRouter = express.Router();

// @ts-ignore
adminRouter.post("/signup", signupAdmin);
// @ts-ignore
adminRouter.post("/login", loginAdmin);
// // @ts-ignore
// userRouter.get("/check", authentication, checkUser);
// // @ts-ignore
// userRouter.get('/logout', authentication, logoutUser)

export default adminRouter;
