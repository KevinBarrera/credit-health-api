import { DataTypes, Model } from 'sequelize';
import crypto from "node:crypto";

import sequelize from "../config/sequelize";

class BillingCycle extends Model {
  public id!: string;
  public statementBalance!: number;
  public status!: 'pending' | 'paid';
  public startDate!: Date;
  public endDate!: Date;
  public cardId!: string;
}

BillingCycle.init({
  id: {
    type: DataTypes.UUIDV4,
    defaultValue: crypto.randomUUID(),
    primaryKey: true,
  },
  statementBalance: {
    type: DataTypes.REAL,
    allowNull: false,
    field: 'statement_balance',
  },
  status: {
    type: DataTypes.ENUM('pending', 'paid'),
    allowNull: false,
    defaultValue: 'pending'
  },
  startDate: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'start_date',
  },
  endDate: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'end_date',
  },
  cardId: {
    type: DataTypes.UUID,
    references: {
      model: 'Card',
      key: 'id',
    },
    allowNull: false,
    field: 'card_id',
  },
}, {
  sequelize,
  modelName: 'BillingCycle',
  tableName: 'billing_cycles',
  timestamps: false,
});

export default BillingCycle;
