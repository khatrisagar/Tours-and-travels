import { encryptPassword } from "@/utils";
import { Schema, model } from "mongoose";
import { userModelInterface } from "@/interfaces";

const user = new Schema<userModelInterface>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    contact: {
      type: Number,
    },
    roles: {
      type: [Schema.Types.ObjectId],
      default: [Object("64a9099f92270a3ab23bb766")],
      ref: "Role",
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

export const User = model<userModelInterface>("User", user);
