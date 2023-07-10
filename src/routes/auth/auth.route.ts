import { Router } from "express";

const router = Router();

import { signUpUser, loginUser, addRole, getRoles } from "@/controllers";
import { authenticate, routeProtection } from "@/middlewares";

router.post("/sign-up", signUpUser);
router.post("/login", loginUser);
router.post("/add-role", authenticate, routeProtection(["addRoles"]), addRole);
router.get("/roles", authenticate, routeProtection(["viewRoles"]), getRoles);

export { router as authRoutes };
