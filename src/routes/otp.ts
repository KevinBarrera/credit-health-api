import { Router } from "express";
import { sendOtp, verifyOtp } from "../controllers/otp.controller";
import { validateSchema } from "../middlewares/schemaValidator";
import { EmailContentSchema, VerifyOtpSchema } from "../schemas/otp.schemas";

const router = Router();

router.post("/", validateSchema(EmailContentSchema), sendOtp);

router.post("/verify", validateSchema(VerifyOtpSchema), verifyOtp);

export { router };
