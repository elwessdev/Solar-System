const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require('./config/db');
require ("dotenv").config();

connectDB();
app.use(cors({
  // origin: process.env.FRONT_LINK,
  // credentials: true,
  origin:process.env.FRONT_LINK, 
  credentials:true,
  optionSuccessStatus:200
}));
app.use(express.json());

// Apis
// app.use("/",(req,res) => res.send("server is running"));
app.use('/auth', require('./Routes/Auth'));

// Checking
app.listen(3001, () => {
  console.log(`Server is running, http://localhost:3001`);
})