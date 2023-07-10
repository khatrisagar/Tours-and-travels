import { Router } from "express";

const router = Router();

import { getUsers } from "@/controllers/user.controller";

router.get("/", getUsers);

export { router as userRoutes };

// getUsers
