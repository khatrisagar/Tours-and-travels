import { connect, connection } from "mongoose";

const connectDB = async () => {
  try {
    const connectionURL = process.env.DATABASE_URL;
    await connect(connectionURL as string);
    console.log(`MongoDB Databse connected at ${connectionURL}`);
  } catch (err) {
    console.log(`Error in MongoDB connection: ${err}`);
  }
};

export { connectDB };
