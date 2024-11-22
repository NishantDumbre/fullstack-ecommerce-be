import { Request, Response, NextFunction } from "express";
import Product from "../models/product";
import Category from "../models/category";
import { createCategory, findCategory } from "../utils/functions/category";
import { createProduct } from "../utils/functions/product";

export const fetchProductsAndCategories = async (
  req: Request,
  res: Response
) => {
  console.log("fetch hit");
  const productsPromise = Product.findAll({
    attributes: ["id", "name", "price", "desc"],
    order: [["createdAt", "ASC"]],
  });
  const categoriesPromise = Category.findAll({
    attributes: ["id", "category", "totalProducts"],
    order: [["createdAt", "ASC"]],
  });

  const [productValues, categoriesValues] = await Promise.all([
    productsPromise,
    categoriesPromise,
  ]);

  const categories = categoriesValues.map((category: any) => ({
    id: category.dataValues.id,
    category: category.dataValues.category,
    totalProducts: category.dataValues.totalProducts,
  }));

  const products = productValues.map((product: any) => ({
    id: product.dataValues.id,
    name: product.dataValues.name,
    price: product.dataValues.price,
    desc: product.dataValues.desc,
  }));
  console.log(products);
  res.status(200).json({ categories, products });
};

export const addCategory = async (req: Request, res: Response) => {
  const categoryName = req.body.category;

  try {
    const categoryExists = await findCategory(categoryName);
    if (categoryExists) {
      res.status(400).json({ message: "Category already present" });
      return;
    }

    const newCategory = await createCategory(categoryName);
    const { id, category, totalProducts } = newCategory.dataValues;
    res.status(200).json({
      message: "Added category",
      data: { id, category, totalProducts },
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

export const removeCategory = async (req: Request, res: Response) => {
  const { category } = req.body;
};

export const addProduct = async (req: Request, res: Response) => {
  const { category, description, images, name, price } = req.body;

  const imageArray = images.split(" ");
  console.log(imageArray);

  try {
    const newCategory = await createProduct({
      category,
      description,
      images,
      name,
      price,
    });
    res.status(200).json({
      message: "Added product",
      data: newCategory.dataValues,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};
