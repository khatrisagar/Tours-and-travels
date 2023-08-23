import { Router } from "express";

const router = Router();

import { authenticate, routeProtection } from "@/middlewares";

import { getTourBookings } from "@/controllers";

router.get(
  "/:tourId",
  authenticate,
  routeProtection(["viewAdminBookings"]),
  getTourBookings
);

export { router as adminBookingRoutes };
