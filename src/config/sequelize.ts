import { Sequelize } from "sequelize";
const DB_PATH = process.env.DB_PATH ?? "./credit-health.db";

const sequelize = new Sequelize(`sqlite:${DB_PATH}`);

export default sequelize;
