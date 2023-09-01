import { Router } from "express";

const router = Router();

import { authenticate, routeProtection } from "@/middlewares";

import {
  bookTour,
  getBookingPaymentIntent,
  getbookingTour,
} from "@/controllers";

router.get(
  "/",
  authenticate,
  routeProtection(["viewBookings"]),
  getbookingTour
);
router.post("/", authenticate, routeProtection(["bookTours"]), bookTour);

router.post(
  "/get-payment-intent",
  authenticate,
  routeProtection(["bookTours"]),
  getBookingPaymentIntent
);

export { router as userBookingRoutes };
