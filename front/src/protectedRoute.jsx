import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { loginStatus } = useContext(UserContext);
  if (loginStatus) {
    return <Navigate to="/" />;
  }
  return children;
};
export default ProtectedRoute;
