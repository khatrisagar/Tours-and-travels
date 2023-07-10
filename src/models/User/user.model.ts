import { encryptPassword } from "@/utils";
import { Schema, model } from "mongoose";
import { userModelInterface } from "@/interfaces";

const user = new Schema<userModelInterface>(
  {
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
    contact: {
      type: Number,
    },
    roles: {
      type: [Schema.Types.ObjectId],
      default: ["64a9099f92270a3ab23bb766"],
    },
  },
  {
    timestamps: true,
  }
);

user.pre("save", async function (next) {
  this.password = await encryptPassword(this.password);
  next();
});

export const User = model("User", user);
