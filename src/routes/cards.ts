import { Request, Response, Router } from "express";
import { validateJwt } from "../middlewares/session";

const router = Router();

router.get("/", validateJwt, (req: Request, res: Response) => {
  res.send({ data: "Cards" });
});

export { router };
