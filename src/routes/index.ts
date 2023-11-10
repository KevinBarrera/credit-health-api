import { readdirSync } from "fs";
import { Router } from "express";

const PATH_ROUTER = __dirname;
const router = Router();

readdirSync(PATH_ROUTER).map(async (fileName) => {
  const routeName = fileName.split(".").shift();
  if (routeName !== "index") {
    try {
      const moduleRouter = await import(`./${routeName}`);
      router.use(`/${routeName}`, moduleRouter.router);
    } catch (error) {
      console.error(`Error loading module for route ${routeName}:`, error);
    }
  }
});

export { router };
