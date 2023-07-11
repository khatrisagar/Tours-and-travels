import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    const connectionURL = process.env.DATABASE_URL;
    await connect(connectionURL as string);
    console.log(`Database connected`);
  } catch (err) {
    console.log(`Error in MongoDB connection: ${err}`);
  }
};
