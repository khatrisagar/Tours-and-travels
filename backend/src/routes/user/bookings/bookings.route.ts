import { Router } from "express";

const router = Router();

import { authenticate, routeProtection } from "@/middlewares";

import { bookTour, getbookingTour } from "@/controllers";

router.get(
  "/",
  authenticate,
  routeProtection(["viewBookings"]),
  getbookingTour
);
router.post("/", authenticate, routeProtection(["bookTours"]), bookTour);

export { router as userBookingRoutes };
