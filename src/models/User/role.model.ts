import { Schema, model } from "mongoose";

const role = new Schema<any>({
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

export const Role = model("Role", role);
