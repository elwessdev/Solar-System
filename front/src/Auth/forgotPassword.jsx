import { useState } from "react";
import OtpInput from "react-otp-input";
import "./auth.scss";

const ForgotPassword = () => {
  const [otp, setOtp] = useState("");
  const [verifyCode, setVerifyCode] = useState(false);
  return (
    <div className="auth-container">
      <div className="form-container">
        <form>
            <h1>Forgot Password</h1>
            <span>We will sent to you code for your email </span>
            <div className="inpts">
                <input type="email" placeholder="Email" disabled={verifyCode ?true :false} />
            </div>
            {!verifyCode && <button disabled={verifyCode ?true :false} onClick={e=>setVerifyCode(true)} className="btn-for">Send</button>}
        </form>
        {verifyCode && (
            <div className="otp_elm">
                <span className="sub">We have sent code from 4 degits on your email</span>
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    inputStyle="otp-input"
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                />
                <button>Verify</button>
            </div>
        )}
      </div>
    </div>
  );
};
export default ForgotPassword;
