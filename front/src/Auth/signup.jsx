import { useState,useContext } from "react";
import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";
import axios from "axios";
import "./auth.scss";
import { UserContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [verifyCode, setVerifyCode] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  
  const checkingData = () => {
    if(username.length&&email.length&&password.length&&confirmPassword.length){
      setErrors([]);
      let errorsList = [];
      // console.log("test");
      if(password.length>=6){
          if(password.length>=15){
            errorsList.push("Password must be at most 15 characters");
          } else {
            if(confirmPassword != password){
              errorsList.push("Password and confirm password must be the same");
            }
          }
      } else {
        errorsList.push("Password must be at least 6 characters");
      }
      if(username.length<3){
        errorsList.push("Username must be at least 3 characters");
      }
      if(username.length>15){
        errorsList.push("Username must be at most 15 characters");
      }
      if(errorsList.length){
        setErrors(errorsList);
        console.log(errorsList);
      } else {
        handleSendCode();
      }
    }
  }

  const handleSendCode = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACK_LINK}/auth/sendcode`,{email,username});
      // console.log(res);
      if(res.data == "Done"){
        setVerifyCode(true);
      } else {
        setErrors([res.data.error]);
      }
    } catch(e){
        console.log("send code signup", e);
    }
  }
  const handleSignup = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACK_LINK}/auth/signup`,{username, email, password, otp});
      if(res.data.error){
        setErrors([res.data.error]);
      } else {
        login(res.data.user, res.data.token);
        navigate('/');
        console.log("Signup done");
      }
      // console.log(res);
    } catch(e){
      console.log("verify code signup", e);
    }
  }
  
  return (
    <div className="auth-container">
      <div className="form-container">
      {!verifyCode && (
        <form>
        <h1>Create Account</h1>
        <span>Hello, Friend!
          {/* <br></br>Enter your personal details to use all of our site features */}
        </span>
        <div className="inpts">
          <input disabled={verifyCode ?true :false} type="text" value={username} onChange={e=>setUsername(e.target.value)} placeholder="Name" />
          <input disabled={verifyCode ?true :false} type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
          <input disabled={verifyCode ?true :false} type="password" value={password} onChange={e=>{
            setPassword(e.target.value);
          }} placeholder="Password" />
          <input disabled={verifyCode ?true :false} type="password" value={confirmPassword} onChange={e=>{
            setConfirmPassword(e.target.value);
          }} placeholder="Confirm Password" />
        </div>
        <Link to="/signin">Do you have an account ?</Link>
        <button type="button" onClick={(e)=>checkingData(e)}>Sign Up</button>
      </form>
      )}
      {verifyCode && (
          <div className="otp_elm">
              <h2>Verification code</h2>
              <span className="sub">We have sent code with 4 degits on your email {email}</span>
              <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  inputStyle="otp-input"
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
              />
              <button onClick={e=>handleSignup(e)}>Verify</button>
          </div>
      )}
      <div className="error">
        {errors.map((val, index) => <p key={index}>{val}</p>)}
      </div>
      </div>
    </div>
  );
};

export default Signup;
