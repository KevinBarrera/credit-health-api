import { Router } from "express";
import {
  sendVerificationOtpEmail,
  verifyUserEmail
} from "../controllers/emailVerification.controller";
import { validateSchema } from "../middlewares/schemaValidator";
import { EmailSchema } from "../schemas/email.schemas";
import { VerifyOtpSchema } from "../schemas/otp.schemas";

const router = Router();

router.post("/", validateSchema(EmailSchema), sendVerificationOtpEmail);

router.post("/verify", validateSchema(VerifyOtpSchema), verifyUserEmail);

export { router };
