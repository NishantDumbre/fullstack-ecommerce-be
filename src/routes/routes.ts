import express from "express";
import userRouter from "./userRoutes";
import adminRouter from "./adminRoutes";
import productRouter from "./productRoutes";

const router = express.Router();

router.use("/account", userRouter);
router.use("/admin/account", adminRouter);
router.use("/admin/products", productRouter);


export default router;
