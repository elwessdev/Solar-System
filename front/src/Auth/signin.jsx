import { Link } from "react-router-dom";
import "./auth.scss";

const Signin = () => {
  return (
    <div className="auth-container">
      <div className="form-container">
        <form>
          <h1>Sign In</h1>
          <span>Welcome Back!
            {/* <br></br>Enter your personal details to use all of our site features */}
            </span>
          <div className="inpts">
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
          </div>
          <Link to="/signup">Register Now</Link>
          <Link to="/forgot-password">Forgot Your Password ?</Link>
          <button>Sign In</button>
        </form>
      </div>
    </div>
  );
};
export default Signin;
