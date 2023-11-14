import crypto from "node:crypto";
import { DataTypes, Model } from "sequelize";

import sequelize from "../config/sequelize";

class Otp extends Model {
  public id!: string;
  public email!: string;
  public otp!: string;
  public createdAt!: Date;
  public expiresAt!: Date;
}

Otp.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: crypto.randomUUID(),
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Otp",
    tableName: "otps",
    timestamps: false
  }
);

export default Otp;
