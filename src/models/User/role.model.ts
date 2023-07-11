import { roleModelInterface } from "@/interfaces";
import { Schema, model } from "mongoose";

const role = new Schema<roleModelInterface>({
  name: {
    type: "string",
    required: true,
  },
  permissions: {
    type: ["string"],
    required: true,
    default: ["view-tour"],
  },
});

export const Role = model<roleModelInterface>("Role", role);
