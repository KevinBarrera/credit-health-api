import { Router } from "express";
import { sendOtp } from "../controllers/otp.controller";
import { validateSchema } from "../middlewares/schemaValidator";
import { EmailContentSchema } from "../schemas/otp.schemas";

const router = Router();

router.post("/", validateSchema(EmailContentSchema), sendOtp);

export { router };
