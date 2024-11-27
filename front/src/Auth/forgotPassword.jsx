import { useState } from "react";
import OtpInput from "react-otp-input";
import "./auth.scss";
import "./ForgotPassword.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [otp, setOtp] = useState("");
  const [verifyStatus, setVerifyStatus] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendCode = async () => {
    if(email){
      try {
        const res = await axios.post(`${import.meta.env.VITE_BACK_LINK}/auth/ForgotPasswordVerify`,{email});
        if(res.data.error){
          setError(res.data.error);
        } else {
          setError("");
          setVerifyStatus("otp");
        }
      } catch(e){
        console.log(e);
      }
    }
  }

  const handleVerify = async () => {
    if(otp){
      try {
        const res = await axios.post(`${import.meta.env.VITE_BACK_LINK}/auth/verifyPassCode`,{code: otp});
        if(res.data.error){
          setError(res.data.error);
        } else {
          setError("");
          setVerifyStatus("newPassword");
        }
      } catch(e){
        console.log(e);
      }
    }
  }

  const verifyNewPassword = () => {
    if(password&&newPassword){
      setError("");
      let errorn = "";
      if(password.length > 6){
        if(password.length > 15){
          errorn = "Password must be less than 15 characters";
        } else {
          if(password!==newPassword){
            errorn = "Password and confirm password must be the same";
          } else {
            handleNewPassword();
          }
        }
      } else {
        errorn = "Password must be at least 6 characters";
      }
      setError(errorn);
    }
  }

  const handleNewPassword = async () => {
    try{
      const res = await axios.post(`${import.meta.env.VITE_BACK_LINK}/auth/newPassword`,{email,password});
      if(res.data.error){
        setError(res.data.error);
      } else {
        setError("");
        setVerifyStatus("email");
        navigate('/signin');
      }
      // console.log(res);
    } catch(error){
      console.log("new password", error);
    }
  }

  return (
    <div className="auth-container">
      <div className="form-container">
        <form>
          {(verifyStatus==="email"||verifyStatus==="otp") && (
                <>
                  <h1>Forgot Password</h1>
                  <span>We will sent to you code for your email </span>
                  <div className="inpts">
                      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} disabled={verifyStatus=="otp" ?true :false} />
                  </div>
                  {verifyStatus=="email" && <button type="button" disabled={verifyStatus=="otp" ?true :false} onClick={e=>handleSendCode()} className="btn-for">Send</button>}
                </>
          )}
          {verifyStatus==="newPassword" && (
            <>
              <h1>Create new password</h1>
              {/* <span>We will sent to you code for your email </span> */}
              <span>Enter your new password</span>
              <div className="inpts">
                <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
                <input type="password" placeholder="Confirm Password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} />
              </div>
              <button type="button" onClick={e=>verifyNewPassword()}>Change</button>
            </>
          )}
        </form>
        {verifyStatus==="otp" && (
          <div className="otp_elm">
              <span className="sub">We have sent code with 4 characters to your email {email}</span>
              <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  inputStyle="otp-input"
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
              />
              <button onClick={e=>handleVerify()}>Verify</button>
          </div>
        )}
        <div className="error">{error}</div>
      </div>
    </div>
  );
};
export default ForgotPassword;
