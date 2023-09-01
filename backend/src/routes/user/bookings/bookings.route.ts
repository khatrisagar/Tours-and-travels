import { Router } from "express";

const router = Router();

import { authenticate, routeProtection } from "@/middlewares";

import {
  bookTour,
  cancelBookingPaymentIntent,
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
router.post(
  "/cancel-payment-intent",
  authenticate,
  routeProtection(["bookTours"]),
  cancelBookingPaymentIntent
);

export { router as userBookingRoutes };
