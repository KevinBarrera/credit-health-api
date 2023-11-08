import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes"
import sequelize from "./config/sequelize";

const PORT = process.env.PORT ?? 3002;
const app = express();

app.use(cors());
app.use(express.json());
app.disable("x-powered-by");

app.use(router);

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`)
});