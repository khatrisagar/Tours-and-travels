import { Router } from "express";

const router = Router();

import { authenticate, routeProtection } from "@/middlewares";
import {
  getAdminTours,
  addTours,
  getAdminTourById,
  updateTours,
  deleteTours,
} from "@/controllers";

router.get(
  "/",
  authenticate,
  routeProtection(["viewAdminAllTours"]),
  getAdminTours
);
router.get(
  "/:tourId",
  authenticate,
  routeProtection(["viewAdminTours"]),
  getAdminTourById
);
router.post(
  "/add-tours",
  authenticate,
  routeProtection(["viewAdminTours", "addTours"]),
  addTours
);
router.patch(
  "/:tourId",
  authenticate,
  routeProtection(["viewAdminTours", "updateTours"]),
  updateTours
);
router.delete(
  "/:tourId",
  authenticate,
  routeProtection(["viewAdminTours", "deleteTours"]),
  deleteTours
);

export { router as adminTourRoutes };
