import express from "express";
import { signupAdmin, loginAdmin, logoutAdmin } from "../controllers/admin";
import { authentication } from "../middlewares/authentication";

const adminRouter = express.Router();

// @ts-ignore
adminRouter.post("/signup", signupAdmin);
// @ts-ignore
adminRouter.post("/login", loginAdmin);
// @ts-ignore
adminRouter.get("/logout", authentication, logoutAdmin);


export default adminRouter;
