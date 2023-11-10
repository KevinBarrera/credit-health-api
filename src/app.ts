import "dotenv/config";
import cors from "cors";
import express from "express";
import sequelize from "./config/sequelize";
import { router } from "./routes";

const PORT = process.env.PORT ?? 3002;
const app = express();

app.use(cors());
app.use(express.json());
app.disable("x-powered-by");

app.use(router);

void (async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
