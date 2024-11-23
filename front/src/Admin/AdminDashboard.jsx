import React from "react";
import UserManagement from "./UserManagement";
import CommentManagement from "./CommentManagement";
import QuizManagement from "./QuizManagement";
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-sections">
        {/* <UserManagement /> */}
        {/* <CommentManagement /> */}
        <QuizManagement />
      </div>
    </div>
  );
};

export default AdminDashboard;