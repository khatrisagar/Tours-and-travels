import { Router } from "express";

const router = Router();

import { authenticate } from "@/middlewares";

import { updateProfile, getProfile } from "@/controllers";

router.get("/", authenticate, getProfile);
router.patch("/", authenticate, updateProfile);

export { router as profileRoutes };
