import Product from "../../models/product"
import { CreateProductInterface } from "../Interfaces/product"


export const createProduct = async({category, description, images, name, price}: CreateProductInterface) =>{
    try {
        const newProduct = await Product.create({category, description, images, name, price})
        return newProduct
    } catch (error: any) {
        throw error
    }
}


// export const findCategory = async(category: CreateCategoryInterface) =>{
//     let foundCategory = null
//     try {
//         foundCategory = await Category.findOne({where:{category}})
//         return foundCategory
//     } catch (error: any) {
//         console.log(error.message)
//         return foundCategory
//     }
// }