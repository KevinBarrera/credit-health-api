import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { validateSchema } from "../middlewares/schemaValidator";
import { LoginSchema, RegisterSchema } from "../schemas/auth.schemas";

const router = Router();

router.post("/register", validateSchema(RegisterSchema), register);

router.post("/login", validateSchema(LoginSchema), login);

export { router };
