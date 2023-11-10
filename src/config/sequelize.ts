import { Sequelize } from "sequelize";
import * as dbConfig from "./db.config";

const sequelize = new Sequelize(
  dbConfig.DB_NAME,
  dbConfig.DB_USER,
  dbConfig.DB_PASSWORD,
  {
    host: dbConfig.DB_HOST,
    dialect: dbConfig.dialect,
    port: Number(dbConfig.DB_PORT),
    pool: dbConfig.pool
  }
);

export default sequelize;
