import { DataTypes, Model } from 'sequelize';
import crypto from "node:crypto";

import sequelize from "../config/sequelize";

class Card extends Model {
  public id!: string;
  public network!: string | null;
  public issuer!: string | null;
  public name!: string | null;
  public cardholder_name!: string;
  public cardholder_lastName!: string;
  public lastFourDigits!: string;
  public closingDay!: number;
  public gracePeriod!: number;
  public user_id!: string;
}

Card.init({
  id: {
    type: DataTypes.UUIDV4,
    defaultValue: crypto.randomUUID(),
    primaryKey: true,
  },
  network: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  issuer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cardholderName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'cardholder_name',
  },
  cardholderLastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'cardholder_lastName',
  },
  lastFourDigits: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'last_four_digits',
  },
  closingDate: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'closing_date',
  },
  gracePeriod: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'grace_period',
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: 'User',
      key: 'id',
    },
    field: 'user_id',
  },
}, {
  sequelize,
  modelName: 'Card',
  tableName: 'cards',
  timestamps: false,
});

export default Card;
