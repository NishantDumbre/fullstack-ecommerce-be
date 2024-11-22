import Category from "../../models/category"
import Product from "../../models/product"

export default () =>{
    Category.hasMany(Product)
    Product.belongsTo(Category)
}
