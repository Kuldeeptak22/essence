import multer from "multer";
import bcrypt from "bcrypt";
import fs from "fs";
import Jwt from "jsonwebtoken";
import validator from "validator";
import UserModel from "../models/user.model";
import { storage } from "../utils/multerFilter";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import OtpModel from "../models/otp.model";
import twilio from "twilio";

const upload = multer({
  storage: storage,
});

// Add User data
export const addUser = (req, res) => {
  try {
    const uploadUserData = upload.single("avatar");
    uploadUserData(req, res, function (err) {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }

      const {
        firstName,
        lastName,
        email,
        password,
        dob,
        gender,
        about,
        contact,
      } = req.body; // Receive from Front End

      function formatDateToYYYYMMDD(dateString) {
        const date = new Date(dateString);

        // Check if the date is valid
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(date)) {
          return "Invalid Date";
        }

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Note: Months are zero-based
        const day = date.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
      }
      const originalDate = dob;
      const formattedDate = formatDateToYYYYMMDD(originalDate);

      let avatar = null;
      if (req.file !== undefined) {
        avatar = req.file.filename;
      }
      const securePassword = bcrypt.hashSync(password, 10);
      // Schema Validation as per requirements
      const createUserRecord = new UserModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: securePassword,
        dob: formattedDate,
        gender: gender,
        avatar: avatar,
        about: about,
        contact: contact,
      });
      createUserRecord.save(); // Save inputData
      if (createUserRecord) {
        return res.status(201).json({
          data: createUserRecord,
          message: "Item has been added Successfully.",
          filepath: `${process.env.BASE_URL}/uploads`,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
// Fetch All users Data
export const getUsers = async (req, res) => {
  try {
    const getUsersData = await UserModel.find({ status: 1 });
    if (getUsersData) {
      return res.status(200).json({
        data: getUsersData,
        message: "SuccessFully Fetched",
        total: getUsersData.length,
        filepath: `${process.env.BASE_URL}/uploads`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
// Fetch Single user Data
export const getUser = async (req, res) => {
  try {
    const userID = req.params.user_id; // from front End
    const getUserData = await UserModel.findOne({ _id: userID, status: 1 });
    if (getUserData) {
      return res.status(200).json({
        data: getUserData,
        message: "Successfully fetched single user data.",
        filepath: `${process.env.BASE_URL}/uploads`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
// Fetch Single user Data by Email
export const getUserByEmail = async (req, res) => {
  const { userEmail } = req.query;
  try {
    const getUserData = await UserModel.findOne({
      email: userEmail,
      status: 1,
    });
    if (getUserData) {
      return res.status(200).json({
        data: getUserData,
        message: "Successfully fetched single user data.",
        filepath: `${process.env.BASE_URL}/uploads`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
// Update Single User Data
export const updateUser = async (req, res) => {
  try {
    const updateUserData = upload.single("avatar");
    updateUserData(req, res, async function (err) {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }
      const userID = req.params.user_id;
      const {
        firstName,
        lastName,
        email,
        password,
        dob,
        gender,
        about,
        contact,
      } = req.body;

      const existUser = await UserModel.findOne({
        _id: userID,
      });

      let avatar = existUser.avatar;
      if (req.file) {
        avatar = req.file.filename;

        if (fs.existsSync("./uploads/users/" + existUser.avatar)) {
          fs.unlinkSync("./uploads/users/" + existUser.avatar);
        }
      }
      let hashedPassword;
      if (password) {
        const strongPassword = validator.isStrongPassword(password);
        hashedPassword = bcrypt.hashSync(password, 10);

        if (email) {
          const validEmail = validator.isEmail(email);
          if (!validEmail) {
            return res.status(400).json({
              message: "Email is not valid..!",
            });
          }
        }
        if (!strongPassword) {
          return res.status(400).json({
            message:
              "minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1",
          });
        }
      }

      const updatedUser = await UserModel.updateOne(
        { _id: userID },
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
          },
        }
      );

      if (updatedUser.acknowledged) {
        return res.status(200).json({
          message: "Item has Been Updated..!",
        });
      } else {
        return res.status(500).json({
          message: "Failed to update user.",
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
// Soft Delete User Data
export const deleteUser = async (req, res) => {
  try {
    const userID = req.params.user_id;
    const deleted = await UserModel.updateOne(
      { _id: userID },
      { $set: { status: 0 } }
    );
    if (deleted.acknowledged) {
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
// Hard delete User Data
export const removeUser = async (req, res) => {
  try {
    const userID = req.params.user_id;
    const existUser = await UserModel.findOne({
      _id: userID,
    });

    if (fs.existsSync("./uploads/users/" + existUser.avatar)) {
      fs.unlinkSync("./uploads/users/" + existUser.avatar);
    }

    const deleted = await UserModel.deleteOne({ _id: userID });
    if (deleted.acknowledged) {
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
// SignUp API :-
export const signUpUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, contact } = req.body;

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

    const existUser = await UserModel.findOne({ email: email });
    if (existUser) {
      return res.status(200).json({
        message: "User already exist..!",
      });
    }

    const saveUser = new UserModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      contact: contact,
    });
    saveUser.save();
    if (saveUser) {
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
// Sign In API :-
export const signInUser = async (req, res) => {
  try {
    const { email, password, contact } = req.body;
    const filter = {
      $or: [{ email: email }, { contact: contact }],
    };
    const existUser = await UserModel.findOne(filter);
    if (!existUser) {
      return res.status(400).json({
        message: "User doesn't exist,please Create new Account.",
      });
    }

    const checkPassword = bcrypt.compareSync(password, existUser.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: "Invalid credential,Check your password again..!",
      });
    }

    const token = Jwt.sign(
      {
        id: existUser._id,
        email: existUser.email,
      },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      data: existUser,
      token: token,
      message: "Login Successfully...!!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const createAndSendOTP = async (req, res) => {
  try {
    const { email, contact } = req.body;
    const filter = {
      $or: [{ email: email }, { contact: contact }],
    };
    const existUser = await UserModel.findOne(filter);
    if (!existUser) {
      return res.status(400).json({
        message: "User doesn't exist,please Create new Account.",
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
        const alreadyExistEmail = await OtpModel.findOne({
          email: existUser.email,
        });
        if (alreadyExistEmail) {
          const updateExistEmail = await OtpModel.updateOne(
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
          const saveOtp = new OtpModel({
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
        const alreadyExistEmail = await OtpModel.findOne({ email: email });
        if (alreadyExistEmail) {
          const updateExistEmail = await OtpModel.updateOne(
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
          const saveOtp = new OtpModel({
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
    // console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const signInWithOTP = async (req, res) => {
  try {
    const { otp, email } = req.body;

    const existUser = await OtpModel.findOne({ otp: otp, email: email });
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
        const existUserEmail = await UserModel.findOne({
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
          res.cookie("userdata", existUserEmail); // cookies
          return res.status(200).json({
            data: existUserEmail,
            token: token,
            message: "Login Successfully...!!",
          });
        }
      } else {
        const toDeleteOtpData = await OtpModel.deleteOne({ _id: existUser.id });
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

export const checkOTPinUserModel = async (req, res) => {
  try {
    const { otp, email } = req.body;

    const existUser = await OtpModel.findOne({
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
        const existUser1 = await UserModel.findOne({
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
        const toDeleteOtpData = await OtpModel.deleteOne({
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
