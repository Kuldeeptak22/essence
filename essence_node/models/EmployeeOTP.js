import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EmployeeOtpSchema = new Schema({
  email: {
    type: String,
    default: null,
  },
  otp: {
    type: String,
    default: null,
  },
  status: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("employeeOtp", EmployeeOtpSchema);
