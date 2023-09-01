import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
const app: Application = express();
import { connectDB } from "@/config";
connectDB();
// import sessions from "express-session";

const PORT = process.env.PORT || 9999;
import cors from "cors";
app.use(cors());

app.use(express.json());

import {
  authRoutes,
  adminTourRoutes,
  userTourRoutes,
  userBookingRoutes,
  userReviewRoutes,
  adminBookingRoutes,
  profileRoutes,
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
// profile routes
app.use("/api/profile", profileRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
