import express from "express";
import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routers/user.router";
import categoryRouter from "./routers/category.router";
import brandRouter from "./routers/brand.router";
import subCategoryRouter from "./routers/subcategory.router";
import productRouter from "./routers/product.router";
import cartRouter from "./routers/cart.router";
import EmployeeRouter from "./routers/employee.router";
import ContactRouter from "./routers/contact.router";
const app = express();
app.use(cors()); // To avaoid cors errors genereated Through cross plateforms (differents ports access)
app.use(express.json()); // To read Body Data
app.use(express.static(__dirname)); // to file read statically

app.use(cookieParser()); //use cookieParser to get cookies value
const port = process.env.PORT; // Use port from .env file

// Home Router
app.get("/", (req, res) => {
  res.send("This is Home page");
});

// Connect Mongoose to Database
mongoose
  .connect("mongodb://127.0.0.1:27017/Essence_Store")
  .then(() => {
    console.log("DataBase Connected !!");
  })
  .catch((err) => console.log(err));

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}
//App Running Server
app.listen(port, () => {
  console.log("Server is Running on port http://localhost:" + port);
});

// Using Routers
app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/brands", brandRouter);
app.use("/subcategories", subCategoryRouter);
app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use("/employees", EmployeeRouter);
app.use("/contacts", ContactRouter);
