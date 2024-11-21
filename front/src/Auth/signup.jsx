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
  const [error, setError] = useState("");
  
  const checkPassword = () => {
    if(password&&confirmPassword&&password!=confirmPassword){
      setError("Password and confirm password are not the same");
    }
    if(password.length>0&&password.length<6){
      setError("Password must be at least 6 characters");
    }
  }

  const handleSendCode = async () => {
    try {
      const res = await axios.post("http://localhost:3001/auth/sendcode",{email});
      console.log(res);
      if(res.data == "Done send mail"){
        setVerifyCode(true);
      }
    } catch(e){
        console.log(e);
    }
  }

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:3001/auth/signup",{username, email, password, otp});
      if(res.data.user&&res.data.token){
        login(res.data.user, res.data.token);
        navigate('/');
      }
    } catch(e){
        console.log(e);
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
            checkPassword();
          }} placeholder="Password" />
          <input disabled={verifyCode ?true :false} type="password" value={confirmPassword} onChange={e=>{
            setConfirmPassword(e.target.value);
            checkPassword();
          }} placeholder="Confirm Password" />
        </div>
        <Link to="/signin">Do you have an account ?</Link>
        <button type="button" disabled={verifyCode ?true :false} onClick={(e)=>handleSendCode(e)}>Sign Up</button>
      </form>
      )}
      {verifyCode && (
          <div className="otp_elm">
              <h2>Verification code</h2>
              <span className="sub">We have sent code from 4 degits on your email</span>
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
      <div className="error">{error}</div>
      </div>
    </div>
  );
};

export default Signup;
