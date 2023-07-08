import { Router } from "express";

const router = Router();

import { signUpUser, loginUser, addRole, getRoles } from "@/controllers";
import {
  authenticate,
  userRoutesProtection,
  adminRoutesProtection,
} from "@/middlewares";

router.post("/sign-up", signUpUser);
router.post("/login", loginUser);
router.post("/add-role", authenticate, adminRoutesProtection, addRole);
router.get("/roles", authenticate, userRoutesProtection, getRoles);

export { router as authRoutes };
