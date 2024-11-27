const express = require('express');
const router = express.Router();
const users = require("../Models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');


const {validation, SignUpRules, LoginRules} = require('../middleware/validator');

const isAuth = require('../middleware/passport');
// Sign up
var stored_code = "";
function GenerateCode(){
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let result = '';
    for(let i = 0; i < 4; i++){
        const randomChar = Math.floor(Math.random() * chars.length);
        result += chars[randomChar];
    }
    return result;
}
router.post('/sendcode', async(req, res) => {
    const {email,username} = req.body;       
    try{
        const searchUserName = await users.findOne({username: username});
        if(searchUserName){
            return res.send({error: "Username already use"});
        }
        const searchEmail = await users.findOne({email: email});
        if(searchEmail){
            return res.send({error: "Email already use"});
        }
        const GeneratedCode = GenerateCode();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user:process.env.CLIENT_EMAIL,
                pass:process.env.CLIENT_SECRET
            }
        });
        const Options = {
            from: "Solar System Team",
            to: email,
            subject: 'Solar system account code verification',
            // html: `<p>verfiy you email ${GeneratedCode}</p>`
            html: `
                <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Password Verification</title>
                    </head>
                    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; color: #333;">
                        <div style="width: 100%; max-width: 600px; margin: 20px auto; padding: 20px; background: #222; border-radius: 10px; color: #fff;">
                            <div style="font-size: 24px; font-weight: bold; color: #fff; text-shadow: 2px 2px 8px rgba(0, 255, 255, 0.7); text-transform: uppercase; text-align: center; padding: 20px;">
                                Solar System
                            </div>
                            <div style="font-size: 16px; margin-bottom: 20px; line-height: 1.5;">
                                <p>Hello,</p>
                                <p>Please use the following code to complete your verification process:</p>
                            </div>
                            <div style="text-align: center; margin: 30px 0;">
                                <div style="font-size: 30px; font-weight: bold; letter-spacing: 10px; padding: 10px; background: #333; border-radius: 5px; color: #00c6ff;">
                                    ${GeneratedCode}
                                </div>
                            </div>
                            <div style="font-size: 16px; margin-bottom: 20px; line-height: 1.5;">
                                <p>Enter this code on the verification page to complete the process. The code is valid for a limited time, so please use it promptly.</p>
                            </div>
                            <div style="text-align: center; font-size: 14px; color: #888; margin-top: 20px;">
                                <p>Best regards,<br>The Solar System Team</p>
                                <p><a href="mailto:support@solar-system.com" style="color: #00c6ff; text-decoration: none;">support@solar-system.com</a></p>
                            </div>
                        </div>
                    </body>
                    </html>
            `
        }
        // console.log(stored_code);
        await transporter.sendMail(Options);   
        stored_code = GeneratedCode;    
        res.send("Done");
    }
    catch(error){
        console.log(error);
        res.send("Error send code");
    }
})
router.post('/signup', SignUpRules(), validation, async(req, res) => {
    const {username, email, password, otp} = req.body;
    try{
        console.log(stored_code,otp);
        if(stored_code === otp){
            const salt = 10;
            const gensalt = await bcrypt.genSalt(salt);
            const hashed_password = await bcrypt.hash(password, gensalt);
            let new_user = new users({
                username : username,
                email : email,
                password : hashed_password
            });
            let result = await new_user.save();
            const payload = {
                _id: result._id
            }
            const token = await jwt.sign(payload, process.env.SECRET_KEY,{expiresIn: '7d'});
            res.send({user: result, token: `bearer ${token}`});
        }
        else{
            return res.send({error: "Code is wrong"});
        }
    }
    catch(error){
        console.log(error);
        res.send({error: "error g"});
    }
});
// Current user
router.get('/current', isAuth(), (req, res) => {
    res.send({user: req.user});
});

// Sign in
// LoginRules(), validation,
router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    try{
        const searchedUser = await users.findOne({ email });
        if(!searchedUser){
            return res.send({error: "User not found"});
        }
        const match = await bcrypt.compare(password, searchedUser.password);
        if(!match){
            return res.send({error: "Invalid creadintials"});
        }
        const payload = {
            _id: searchedUser._id
        }
        const token = await jwt.sign(payload, process.env.SECRET_KEY,{
            expiresIn: '7d'
        });
        res.send({user: searchedUser, token: `bearer ${token}`});
    }
    catch(error){
        console.log(error);
        res.send({error: error});
    }
})

// Forget password
var passCode = "";
router.post("/ForgotPasswordVerify", async(req, res) => {
    const {email} = req.body;
    try{
        const searchedUser = await users.findOne({email});
        if(!searchedUser){
            return res.send({error: "Email is not registered"});
        }
        const GeneratedCode = GenerateCode();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user:process.env.CLIENT_EMAIL,
                pass:process.env.CLIENT_SECRET
            }
        });
        const Options = {
            from: "Solar System Team",
            to: email,
            subject: 'Solar system account password reset',
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Account Password Reset</title>
                </head>
                <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; color: #333;">
                    <div style="width: 100%; max-width: 600px; margin: 20px auto; padding: 20px; background: #222; border-radius: 10px; color: #fff;">
                        <div style="font-size: 24px; font-weight: bold; color: #fff; text-shadow: 2px 2px 8px rgba(0, 255, 255, 0.7); text-transform: uppercase; text-align: center; padding: 20px;">
                            Solar System
                        </div>
                        <div style="font-size: 16px; margin-bottom: 20px; line-height: 1.5;">
                            <p>Hello,</p>
                            <p>Please use the following code to complete your password reset verification:</p>
                        </div>
                        <div style="text-align: center; margin: 30px 0;">
                            <div style="font-size: 30px; font-weight: bold; letter-spacing: 10px; padding: 10px; background: #333; border-radius: 5px; color: #00c6ff;">
                                ${GeneratedCode}
                            </div>
                        </div>
                        <div style="font-size: 16px; margin-bottom: 20px; line-height: 1.5;">
                            <p>Enter this code on the verification page to complete the process. The code is valid for a limited time, so please use it promptly.</p>
                        </div>
                        <div style="text-align: center; font-size: 14px; color: #888; margin-top: 20px;">
                            <p>Best regards,<br>The Solar System Team</p>
                            <p><a href="mailto:support@solar-system.com" style="color: #00c6ff; text-decoration: none;">bms93951@gmail.com</a></p>
                        </div>
                    </div>
                </body>
                </html>
            `
        }
        await transporter.sendMail(Options);   
        passCode = GeneratedCode;    
        res.send("Done send mail");
    }
    catch(error){
        console.log(error);
        res.send("Error send code");
    }
})
router.post("/verifyPassCode", async(req, res) => {
    const {code} = req.body;
    // console.log(code, passCode);
    try{
        if(code === passCode){
            res.send({success: "Done"});
        }
        else{
            res.send({error: "Code is wrong"});
        }
    }
    catch(error){
        console.log(error);
        res.send("Error send code");
    }
})
router.post("/newPassword", async(req, res) => {
    const {password,email} = req.body;
    try{
        const salt = 10;
        const gensalt = await bcrypt.genSalt(salt);
        const hashed_password = await bcrypt.hash(password, gensalt);
        let searchedUser = await users.findOne({email: email});
        searchedUser.password = hashed_password;
        await searchedUser.save();
        res.send({success: "Done"});
    }
    catch(error){
        console.log(error);
        res.send("Error changed code");
    }
})















module.exports = router;