import Category from "../../models/category"
import { CreateCategoryInterface } from "../Interfaces/category"


export const createCategory = async(category: CreateCategoryInterface) =>{
    try {
        const newCategory = await Category.create({category})
        return newCategory
    } catch (error: any) {
        throw error
    }
}


export const findCategory = async(category: CreateCategoryInterface) =>{
    let foundCategory = null
    try {
        foundCategory = await Category.findOne({where:{category}})
        return foundCategory
    } catch (error: any) {
        console.log(error.message)
        return foundCategory
    }
}