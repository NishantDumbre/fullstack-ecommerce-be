import Sequelize from "../config/server";
import { DataTypes } from "sequelize";

const Category = Sequelize.define("cateogry", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  totalProducts: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
});

export default Category
