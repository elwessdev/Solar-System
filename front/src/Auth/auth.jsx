import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import "./Auth.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";

const Auth = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="auth">
      <div className={`container ${isActive ? "active" : ""}`} id="container">
        {/* Sign Up */}
        <div className="form-container sign-up">
          <form>
            <h1>Create Account</h1>
            {/* Social Icons */}
            <div className="social-icons">
              <a href="#" className="icon">
                <i className="fa-brands fa-google"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
          </form>
        </div>

        {/* Sign In */}
        <div className="form-container sign-in">
          <form>
            <h1>Sign In</h1>
            {/* Social Icons */}
            <div className="social-icons">
            <a href="#" className="icon">
                <i className="fa-brands fa-google"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email for login</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <Link to="/ForgotPasswor">Forgot Your Password?</Link> {/* Correction de l'URL */}
            <button>Sign In</button>
          </form>
        </div>

        {/* Toggle Container */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of our site features</p>
              <button className="hidden" onClick={() => setIsActive(false)}>
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of our site
                features
              </p>
              <button className="hidden" onClick={() => setIsActive(true)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;