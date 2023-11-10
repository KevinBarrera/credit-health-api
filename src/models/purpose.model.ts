import crypto from "node:crypto";
import { DataTypes, Model } from "sequelize";

import sequelize from "../config/sequelize";

class Purpose extends Model {
  public id!: string;
  public name!: string;
}

Purpose.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: crypto.randomUUID(),
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Purpose",
    tableName: "purposes",
    timestamps: false
  }
);

export default Purpose;
