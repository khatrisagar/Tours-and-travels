import { Router } from "express";

const router = Router();

import { authenticate, routeProtection } from "@/middlewares";

import { getAllTourBookings, getTourBookings } from "@/controllers";

router.get(
  "/:tourId",
  authenticate,
  routeProtection(["viewAdminBookings"]),
  getTourBookings
);
router.get(
  "/",
  authenticate,
  routeProtection(["viewAdminBookings"]),
  getAllTourBookings
);

export { router as adminBookingRoutes };
