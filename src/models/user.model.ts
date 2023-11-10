import crypto from "node:crypto";
import { DataTypes, Model } from "sequelize";

import sequelize from "../config/sequelize";

class User extends Model {
  public id!: string;
  public email!: string;
  public phone!: string;
  public name!: string;
  public lastName!: string;
  public password!: string;
  public birthDate!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: crypto.randomUUID(),
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "last_name"
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "birth_date"
    }
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false
  }
);

export default User;
