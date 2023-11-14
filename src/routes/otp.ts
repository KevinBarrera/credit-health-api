import { Router } from "express";
import { sendOtp } from "../controllers/otp.controller";

const router = Router();

router.post("/", sendOtp);

export { router };
