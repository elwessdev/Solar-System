import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Auth from "./auth";  
import ForgotPasswor from "./ForgotPasswor"; 
import PasswordForm from "./PasswordForm"; 

function RouterComponent(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth/>} /> 
        <Route path="/PasswordForm" element={<PasswordForm />} />
        <Route path="/ForgotPasswor" element={<ForgotPasswor />} /> 
      </Routes>
    </Router>
  );
}

export default RouterComponent;
