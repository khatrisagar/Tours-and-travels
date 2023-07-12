import { roleModelInterface } from "@/interfaces";
import { Schema, model } from "mongoose";

const role = new Schema<roleModelInterface>({
  name: {
    type: String,
    required: true,
  },
  permissions: {
    type: [String],
    required: true,
    default: ["view-tour"],
  },
});

export const Role = model<roleModelInterface>("Role", role);
