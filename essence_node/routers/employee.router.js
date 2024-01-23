import express from "express";
import {
  addEmployee,
  checkOTPinEmployeeModel,
  createAndSendOTPEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  removeEmployee,
  signInEmployee,
  signInWithOTPEmployee,
  signUpEmloyee,
  updateEmployee,
} from "../controllers/employee.controller";
const router = express.Router();

// router.post("/add_Employee", addEmployee);
router.post("/sign_up_Employee", signUpEmloyee);
router.get("/get_employees", getEmployees);
router.get("/get_employee/:employee_id", getEmployee);
router.put("/update_employee/:employee_id", updateEmployee);
router.delete("/delete_employee/:employee_id", deleteEmployee);
router.delete("/remove_Employee/:employee_id", removeEmployee);

// // Authentication API :-
router.post("/sign_in_Employee", signInEmployee);

// Send OTP
router.post("/send_otp_to_employee", createAndSendOTPEmployee);
router.post("/sign_with_otp_employee", signInWithOTPEmployee);
router.post("/check_otp_in_employee_model", checkOTPinEmployeeModel);

export default router;
