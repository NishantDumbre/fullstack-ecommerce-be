import Sequelize from "../config/server";
import { DataTypes } from "sequelize";

const Product = Sequelize.define("product", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  desc:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageURLs:{
    type:DataTypes.STRING,
    allowNull: false
  }
});

export default Product
