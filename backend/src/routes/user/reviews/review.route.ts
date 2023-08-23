import { Router } from "express";

const router = Router();

import { authenticate, routeProtection } from "@/middlewares";

import { addReviews, getReviews } from "@/controllers";

router.get("/", authenticate, routeProtection(["viewReviews"]), getReviews);
router.post("/", authenticate, routeProtection(["addReviews"]), addReviews);

export { router as userReviewRoutes };
