const express = require("express");
const app = express();
//dotenv setup
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 2000;
//import section
const db = require("./config/dbConn");
const router = require("./routes/router");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoute");
const cors = require("cors");
// const formidable = require("express-formidable");

//middleware
app.use(cors());
app.use(express.json());

//router middleware
app.use("", router);
app.use("", categoryRoutes);
app.use("", productRoutes);
// app.use(formidable());

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port no : ${PORT}`);
});
