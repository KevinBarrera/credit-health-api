import { Router } from "express";
import {createPurpose, deletePurpose, getOnePurpose, getPurposes, updatePurpose} from "../controllers/purposes.controller";

const router = Router();


router.post("/", createPurpose);

router.get("/", getPurposes);

router.get("/:id", getOnePurpose);

router.put("/:id", updatePurpose);

router.delete("/:id", deletePurpose);

export { router };