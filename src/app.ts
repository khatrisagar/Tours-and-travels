import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
const app: Application = express();
import { connectDB } from "@/config";
connectDB();

const PORT = process.env.PORT || 9999;

app.use(express.json());

// auth route
import { authRoutes } from "@/routes";
app.use("/api/auth", authRoutes);

// user routes
import { userRoutes } from "@/routes";
app.use("/api/user", userRoutes);

// tour routes
import { tourRoutes } from "@/routes";
app.use("/api/tours", tourRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
