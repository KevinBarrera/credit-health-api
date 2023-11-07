import { Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = __dirname;
const router = Router();

readdirSync(PATH_ROUTER).map(fileName => {
  const routeName = fileName.split(".").shift();
  if(routeName !== "index") {
    import(`./${routeName}`).then((moduleRouter) => {
      router.use(`/${routeName}`, moduleRouter.router);
    });
  }
});

export { router };