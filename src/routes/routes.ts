import express from "express";
import userRouter from "./userRoutes";
import adminRouter from "./adminRoutes";

const router = express.Router();

router.use("/account", userRouter);
router.use("/admin/account", adminRouter);


export default router;
