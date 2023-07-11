import { Router } from "express";

const router = Router();

import { authenticate, routeProtection } from "@/middlewares";

import { getTours, getTourById, bookTour } from "@/controllers";

router.get("/", authenticate, routeProtection(["viewTours"]), getTours);
router.get(
  "/:tourId",
  authenticate,
  routeProtection(["viewTours"]),
  getTourById
);

export { router as userTourRoutes };
