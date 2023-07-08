import { Router } from "express";

const router = Router();

import { getUsers } from "@/controllers";

router.get("/", getUsers);

export { router as userRoutes };

// getUsers
