const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require('./config/db');
require ("dotenv").config();
console.log(process.env.FRONT_LINK);

connectDB();
app.use(cors({
  // origin: process.env.FRONT_LINK,
  // credentials: true,
  origin: `${process.env.FRONT_LINK}`,
  credentials:true,
  optionSuccessStatus:200
}));
app.use(express.json());

// Apis
// app.use("/",(req,res) => res.send("server is running"));
app.use('/auth', require('./Routes/Auth'));
app.use('/quiz', require('./Routes/Quiz'));
app.use('/planet', require('./Routes/Planet'));

// Checking
app.listen(3001, () => {
  console.log(`Server is running, http://localhost:3001`);
})