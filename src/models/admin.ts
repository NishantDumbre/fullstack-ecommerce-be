import Sequelize from "../config/server";
import { STRING, DataTypes } from "sequelize";

const Admin = Sequelize.define("admin", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
});

export default Admin
