import { Router } from "express";
import {
  sendVerificationOtpEmail,
  verifyUserEmail
} from "../controllers/emailVerification.controller";
import { validateSchema } from "../middlewares/schemaValidator";
import { EmailVerificationSchema } from "../schemas/emailVerification.schemas";
import { VerifyOtpSchema } from "../schemas/otp.schemas";

const router = Router();

router.post(
  "/",
  validateSchema(EmailVerificationSchema),
  sendVerificationOtpEmail
);

router.post("/verify", validateSchema(VerifyOtpSchema), verifyUserEmail);

export { router };
