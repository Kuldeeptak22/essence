import ContactModel from "../models/contact.model";

export const addContact = (req, res) => {
  try {
    const { email, message } = req.body;
    const saveContact = new ContactModel({
      email,
      message,
    });
    saveContact.save();
    if (saveContact) {
      return res.status(201).json({
        data: saveContact,
        message: "Email sent SuccessFully...!!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getContacts = async (req, res) => {
  try {
    const contacts = await ContactModel.find({ status: 1 });
    if (contacts) {
      return res.status(200).json({
        data: contacts,
        message: "SuccessFully Fetched",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
