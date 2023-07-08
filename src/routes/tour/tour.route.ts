import { Router } from "express";

const router = Router();

import { authenticate, adminRoutesProtection } from "@/middlewares";
import { getTours, addTours } from "@/controllers";

router.get("/", getTours);
router.post("/add-tours", authenticate, adminRoutesProtection, addTours);

export { router as tourRoutes };
