import { useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, username: "Alice", email: "text@test.com", date: "15/10/2024", status: "Active" },
    { id: 2, username: "Ahmed", email: "text@test.com", date: "15/10/2024", status: "Blocked" },
  ]);
  const toggleUserBlock = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Active" ? "Blocked" : "Active" }
          : user
      )
    );
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="manage_users">
      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>Username</th>
            <th>Email</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user,idx) => (
            <tr key={user.id}>
              <td>{idx+1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.date}</td>
              <td>{user.status}</td>
              <td>
                <button className="nrml" onClick={() => toggleUserBlock(user.id)}>
                  {user.status === "Active" ? "Block" : "Unblock"}
                </button>
                <button className="delete" onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
