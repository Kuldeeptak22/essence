import multer from "multer";
import fs from "fs";
import validator from "validator";
import bcrypt from "bcrypt";
import { storage } from "../utils/multerFilter";
import EmployeeModal from "../models/employee.modal";
import Jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import EmployeeOTPModal from "../models/EmployeeOTP";

const upload = multer({
  storage: storage,
});

// export const addEmployee = (req, res) => {
//   try {
//     const uploadEmployeeData = upload.single("avatar");
//     uploadEmployeeData(req, res, function (err) {
//       if (err) {
//         return res.status(400).json({
//           message: err.message,
//         });
//       }

//       const {
//         firstName,
//         lastName,
//         email,
//         password,
//         dob,
//         gender,
//         about,
//         role,
//         contact,
//       } = req.body; // Receive from Front End

//       function formatDateToYYYYMMDD(dateString) {
//         const date = new Date(dateString);

//         // Check if the date is valid
//         // eslint-disable-next-line no-restricted-globals
//         if (isNaN(date)) {
//           return "Invalid Date";
//         }

//         const year = date.getFullYear();
//         const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Note: Months are zero-based
//         const day = date.getDate().toString().padStart(2, "0");

//         return `${year}-${month}-${day}`;
//       }
//       const originalDate = dob;
//       const formattedDate = formatDateToYYYYMMDD(originalDate);

//       let avatar = null;
//       if (req.file !== undefined) {
//         avatar = req.file.filename;
//       }
//       const securePassword = bcrypt.hashSync(password, 10);
//       // Schema Validation as per requirements
//       const createEmployeeRecord = new EmployeeModal({
//         firstName: firstName,
//         lastName: lastName,
//         email: email,
//         password: securePassword,
//         dob: formattedDate,
//         gender: gender,
//         avatar: avatar,
//         about: about,
//         contact: contact,
//         role: role,
//       });
//       createEmployeeRecord.save(); // Save inputData
//       if (createEmployeeRecord) {
//         return res.status(201).json({
//           data: createEmployeeRecord,
//           message: "Item has been added Successfully.",
//           filepath: `${process.env.BASE_URL}/uploads`,
//         });
//       }
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//     });
//   }
// };

export const signUpEmloyee = async (req, res) => {
  try {
    const { firstName, lastName, email, password, contact, dob, role } =
      req.body;

    // (auto-gen a salt and hash):
    // Store hash in your password DB.
    const strongPassword = validator.isStrongPassword(password);
    const hashedPassword = bcrypt.hashSync(password, 10);
    const validEmail = validator.isEmail(email);
    if (!validEmail) {
      return res.status(400).json({
        message: "Email is not valid..!",
      });
    } else if (!strongPassword) {
      return res.status(400).json({
        message:
          "minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1",
      });
    }

    const existEmployee = await EmployeeModal.findOne({ email: email });
    if (existEmployee) {
      return res.status(200).json({
        message: "Employee already exist..!",
      });
    }

    const saveEmployee = new EmployeeModal({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      contact: contact,
      dob: dob,
      role: role,
    });
    saveEmployee.save();
    if (saveEmployee) {
      return res.status(200).json({
        message: "Successfully Signup..!!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getEmployees = async (req, res) => {
  try {
    const getEmployeesData = await EmployeeModal.find({ status: 1 });
    if (getEmployeesData) {
      return res.status(200).json({
        data: getEmployeesData,
        message: "SuccessFully Fetched",
        total: getEmployeesData.length,
        filepath: `${process.env.BASE_URL}/uploads`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getEmployee = async (req, res) => {
  try {
    const EmployeeID = req.params.employee_id; // from front End
    const getEmployeeData = await EmployeeModal.findOne({
      _id: EmployeeID,
      status: 1,
    });
    if (getEmployeeData) {
      return res.status(200).json({
        data: getEmployeeData,
        message: "Successfully fetched single Employee data.",
        filepath: `${process.env.BASE_URL}/uploads`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const updateEmployee = async (req, res) => {
  try {
    const updateEmployeeData = upload.single("avatar");
    updateEmployeeData(req, res, async function (err) {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }
      const EmployeeID = req.params.employee_id;
      const {
        firstName,
        lastName,
        email,
        password,
        dob,
        gender,
        about,
        contact,
        role,
      } = req.body;
      const existEmployee = await EmployeeModal.findOne({
        _id: EmployeeID,
      });

      let avatar = existEmployee.avatar;
      if (req.file) {
        avatar = req.file.filename;

        if (fs.existsSync("./uploads/employees/" + existEmployee.avatar)) {
          fs.unlinkSync("./uploads/employees/" + existEmployee.avatar);
        }
      }

      let hashedPassword;
      if (password) {
        const strongPassword = validator.isStrongPassword(password);
        hashedPassword = bcrypt.hashSync(password, 10);
        const validEmail = validator.isEmail(email);
        if (!validEmail) {
          return res.status(400).json({
            message: "Email is not valid..!",
          });
        } else if (!strongPassword) {
          return res.status(400).json({
            message:
              "minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1",
          });
        }
      }

      const updatedEmployee = await EmployeeModal.updateOne(
        { _id: EmployeeID },
        {
          $set: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            dob: dob,
            gender: gender,
            about: about,
            contact: contact,
            avatar: avatar,
            role: role,
          },
        }
      );

      if (updatedEmployee.acknowledged) {
        return res.status(200).json({
          message: "Item has Been Updated..!",
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
export const deleteEmployee = async (req, res) => {
  try {
    const EmployeeID = req.params.employee_id;
    const deletedEmployee = await EmployeeModal.updateOne(
      { _id: EmployeeID },
      { $set: { status: 0 } }
    );
    if (deletedEmployee.acknowledged) {
      return res.status(200).json({
        message: "Item has been Deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const removeEmployee = async (req, res) => {
  try {
    const EmployeeID = req.params.employee_id;
    const existEmployee = await EmployeeModal.findOne({
      _id: EmployeeID,
    });

    if (fs.existsSync("./uploads/employees/" + existEmployee.avatar)) {
      fs.unlinkSync("./uploads/employees/" + existEmployee.avatar);
    }

    const deletedEmployee = await EmployeeModal.deleteOne({ _id: EmployeeID });
    if (deletedEmployee.acknowledged) {
      return res.status(200).json({
        message: "Deleted from Data Base",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const signInEmployee = async (req, res) => {
  try {
    const { email, password, contact } = req.body;
    const filter = {
      $or: [{ email: email }, { contact: contact }],
    };
    const existEmployee = await EmployeeModal.findOne(filter);
    if (!existEmployee) {
      return res.status(400).json({
        message: "Employee doesn't exist,please Create new Account.",
      });
    }

    const checkPassword = bcrypt.compareSync(password, existEmployee.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: "Invalid credential,Check your password again..!",
      });
    }

    const token = Jwt.sign(
      {
        id: existEmployee._id,
        email: existEmployee.email,
      },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("employeeData", existEmployee);

    return res.status(200).json({
      data: existEmployee,
      token: token,
      message: "Login Successfully...!!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const createAndSendOTPEmployee = async (req, res) => {
  try {
    const { email, contact } = req.body;
    const filter = {
      $or: [{ email: email }, { contact: contact }],
    };
    const existUser = await EmployeeModal.findOne(filter);
    if (!existUser) {
      return res.status(400).json({
        message: "User doesn't exist,please Enter Registered Email.",
      });
    } else {
      //OTP GENERATE
      let otpGenerated = otpGenerator.generate(6, {
        upperCaseAlphabets: true,
        specialChars: false,
      });
      // send OTP throgh this email:-
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "kuldeeptak2211@gmail.com",
          pass: "qmti dvkj mfce hdup",
        },
      });

      if (contact) {
        const accountSid = "AC5c3a8f62b5d3a3121f3cf2fc4d7b099d";
        const authToken = "5c53526b9d09269330122ee0c0bbe2b0";

        const client = twilio(accountSid, authToken);

        client.messages.create({
          body: otpGenerated,
          to: "+91" + contact, // Text your number
          from: "+12765661002", // From a valid Twilio number
        });

        // first we chek if email is already available in OTP Model
        const alreadyExistEmail = await EmployeeOTPModal.findOne({
          email: existUser.email,
        });
        if (alreadyExistEmail) {
          const updateExistEmail = await EmployeeOTPModal.updateOne(
            { email: alreadyExistEmail.email },
            {
              $set: {
                otp: otpGenerated,
                createdAt: new Date(),
              },
            }
          );
          if (updateExistEmail) {
            return res.status(201).json({
              message: "OTP Sent Successfully..!!",
            });
          }
        } else {
          const saveOtp = new EmployeeOTPModal({
            email: email,
            otp: otpGenerated,
          });
          saveOtp.save();
          if (saveOtp) {
            return res.status(201).json({
              message: "OTP Sent Successfully..!!",
            });
          }
        }
      } else {
        const info = await transporter.sendMail({
          from: "kuldeeptak2211@gmail.com", // Sender's Email address
          to: email, // list of receivers
          subject: "NEW OTP✔", // Subject line
          text: otpGenerated, // plain text body
        });

        // first we chek if email is already available in OTP Model
        const alreadyExistEmail = await EmployeeOTPModal.findOne({
          email: email,
        });
        if (alreadyExistEmail) {
          const updateExistEmail = await EmployeeOTPModal.updateOne(
            { email: alreadyExistEmail.email },
            {
              $set: {
                otp: otpGenerated,
                createdAt: new Date(),
              },
            }
          );
          if (updateExistEmail) {
            return res.status(201).json({
              message: "OTP Sent Successfully..!!",
            });
          }
        } else {
          const saveOtp = new EmployeeOTPModal({
            email: email,
            otp: otpGenerated,
          });
          saveOtp.save();
          if (saveOtp) {
            return res.status(201).json({
              message: "OTP Sent Successfully..!!",
            });
          }
        }
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const signInWithOTPEmployee = async (req, res) => {
  try {
    const { otp, email } = req.body;

    const existUser = await EmployeeOTPModal.findOne({
      otp: otp,
      email: email,
    });
    if (!existUser) {
      return res.status(400).json({
        message: "Email or OTP is not valid, please Enter valid data..!",
      });
    } else {
      // OTP expiration...

      const CurrentTime = new Date();
      const expirationTime = 2;

      const CheckTimeLimitation =
        CurrentTime - existUser.createdAt < expirationTime * 60 * 1000;

      if (CheckTimeLimitation) {
        const existUserEmail = await EmployeeModal.findOne({
          email: existUser.email,
        });
        if (existUserEmail) {
          const token = Jwt.sign(
            {
              id: existUser._id,
              email: existUser.email,
            },
            process.env.TOKEN_SECRET_KEY,
            { expiresIn: "1h" }
          );
          res.cookie("employeeData", existUserEmail); // cookies
          return res.status(200).json({
            data: existUserEmail,
            token: token,
            message: "Login Successfully...!!",
          });
        }
      } else {
        const toDeleteOtpData = await EmployeeModal.deleteOne({
          _id: existUser.id,
        });
        return res.status(200).json({
          message: "Session has been expired..!!",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const checkOTPinEmployeeModel = async (req, res) => {
  try {
    const { otp, email } = req.body;

    const existUser = await EmployeeOTPModal.findOne({
      otp: otp,
      email: email,
    });

    if (existUser && existUser.id !== undefined) {
      // OTP expiration duration is valid or not
      const CurrentTime = new Date();
      const expirationTime = 2;

      const CheckTimeLimitation =
        CurrentTime - existUser.createdAt < expirationTime * 60 * 1000;

      if (CheckTimeLimitation === true) {
        // =========
        const existUser1 = await EmployeeModal.findOne({
          email: email,
        });
        if (existUser1 && existUser1.id !== undefined) {
          return res.status(200).json({
            data: existUser1,
            message: "OTP Verified Successfully...!!",
          });
        } else {
          return res.status(200).json({
            message: "User Not Found...!!",
          });
        }
      } else {
        const toDeleteOtpData = await EmployeeOTPModal.deleteOne({
          _id: existUser.id,
        });
        if (toDeleteOtpData.acknowledged === true) {
          return res.status(200).json({
            message: "Session has been expired..!!",
          });
        }
      }
    } else {
      return res.status(400).json({
        message: "Email or OTP is not valid, please Enter valid data..!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
