import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
const app: Application = express();
import { connectDB } from "@/config";
connectDB();

const PORT = process.env.PORT || 9999;

app.use(express.json());

import {
  authRoutes,
  adminTourRoutes,
  userTourRoutes,
  userBookingRoutes,
  userReviewRoutes,
  adminBookingRoutes,
} from "@/routes";
// auth route
app.use("/api/auth", authRoutes);

// user routes

// admin tour routes
app.use("/api/admin/tours", adminTourRoutes);

// user tour routes
app.use("/api/tours", userTourRoutes);

// admin bookings
app.use("/api/admin/bookings", adminBookingRoutes);
// user bookings
app.use("/api/bookings", userBookingRoutes);
// user review router
app.use("/api/reviews", userReviewRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
