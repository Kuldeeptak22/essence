import express from "express";
import { addContact, getContacts } from "../controllers/contact.controller";
const router = express.Router();

router.post("/add_contact", addContact);
router.get("/get_contacts", getContacts);

export default router;
