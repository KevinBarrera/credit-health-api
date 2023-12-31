import crypto from "node:crypto";
import { DataTypes, Model } from "sequelize";

import sequelize from "../config/sequelize";

class Purchase extends Model {
  public id!: string;
  public category!: "installmentPlan" | "unique";
  public installmentPlanTotal!: number;
  public installment!: number;
  public purchaseDate!: Date;
  public issuerLogDate!: Date | null;
  public amount!: number;
  public name!: string;
  public description!: string;
  public merchant!: string;
  public status!: "reserved" | "pending" | "paid";
  public purchaserName!: string;
  public purposeId!: string;
  public cardId!: string;
  public billingCycleId!: string;
}

Purchase.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: crypto.randomUUID(),
      primaryKey: true
    },
    category: {
      type: DataTypes.ENUM("installmentPlan", "unique"),
      allowNull: false
    },
    installmentPlanTotal: {
      type: DataTypes.REAL,
      allowNull: false,
      field: "installment_plan_total"
    },
    installment: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    purchaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "purchase_date"
    },
    issuerLogDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "issuer_log_date"
    },
    amount: {
      type: DataTypes.REAL,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    merchant: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("reserved", "pending", "paid"),
      allowNull: false,
      defaultValue: "pending"
    },
    purchaserName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "purchaser_name"
    },
    purposeId: {
      type: DataTypes.UUID,
      references: {
        model: "purposes",
        key: "id"
      },
      allowNull: false,
      field: "purpose_id"
    },
    cardId: {
      type: DataTypes.UUID,
      references: {
        model: "cards",
        key: "id"
      },
      allowNull: false,
      field: "card_id"
    },
    billingCycleId: {
      type: DataTypes.UUID,
      references: {
        model: "billing_cycles",
        key: "id"
      },
      allowNull: false,
      field: "billing_cycle_id"
    }
  },
  {
    sequelize,
    modelName: "Purchase",
    tableName: "purchases",
    timestamps: false
  }
);

export default Purchase;
