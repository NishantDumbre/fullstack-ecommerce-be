import express from "express";
import { addCategory, removeCategory, fetchProductsAndCategories, addProduct } from "../controllers/product";
import { authentication } from "../middlewares/authentication";

const productRouter = express.Router();

// @ts-ignore
productRouter.post("/add-cateogry", authentication, addCategory);
// @ts-ignore
productRouter.delete("/remove-cateogry", authentication, removeCategory);
productRouter.get('/fetch-products-and-categories', authentication, fetchProductsAndCategories)

productRouter.post("/add-product", authentication, addProduct);

export default productRouter;
