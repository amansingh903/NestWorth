import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },
    whatsappUpdates: {
      type: Boolean,
      default: true,
    },
    source: {
      type: String,
      default: "Living Room Page",
    },
    attended: {
  type: Boolean,
  default: false, // 0 = not attended
},
 type: {
      type: String,
      enum: ["livingroom", "bathroom", "kitchen", "masterbedroom"],
      default: "livingroom",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
