import { Router } from "express";
import {
  resetPassword,
  sendForgotPasswordOtpEmail
} from "../controllers/forgotPassword.controller";
import { validateSchema } from "../middlewares/schemaValidator";
import { EmailSchema } from "../schemas/email.schemas";
import { ResetPasswordSchema } from "../schemas/forgotPassword.schemas";

const router = Router();

router.post("/", validateSchema(EmailSchema), sendForgotPasswordOtpEmail);

router.patch("/", validateSchema(ResetPasswordSchema), resetPassword);

export { router };
