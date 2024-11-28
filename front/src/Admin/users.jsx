import axios from "axios";
import { useEffect, useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const getUsers =  async () => {
    try{
      const res = await axios.get(`${import.meta.env.VITE_BACK_LINK}/users/allUsers`);
      if(res.data.users){
        setUsers(res.data.users);
      } else {
        console.log(res.data.error);
      }
      // console.log(res.data);
    } catch(error){
      console.log({error: error});
    }
  }

  const handleUserStatus = async (id,status) => {
    try{
      const res = await axios.post(`${import.meta.env.VITE_BACK_LINK}/users/userStatus`, {id,status});
      if(res.data.success){
        getUsers();
      } else {
        console.log(res.data.error);
      }
    } catch(error){
      console.log({error: error});
    }
  };

  const handleDeleteUser = async (id) => {
    try{
      const res = await axios.delete(`${import.meta.env.VITE_BACK_LINK}/users/deleteUser/${id}`);
      if(res.data.success){
        getUsers();
      } else {
        console.log(res.data.error);
      }
    } catch(error){
      console.log({error: error});
    }
  };

  useEffect(()=>{
    getUsers();
  },[])

  return (
    <div className="manage_users">
      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>Username</th>
            <th>Email</th>
            {/* <th>Date</th> */}
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user,idx) => (
            <tr key={idx}>
              <td>{idx+1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              {/* <td>{user.createdAt}</td> */}
              <td>{user.status}</td>
              <td>
                <div className="btns">
                  {user.status === "active" && (
                    <button className="nrml" onClick={() => handleUserStatus(user?._id,"block")}>Block</button>
                  )}
                  {user.status === "block" && (
                    <button className="nrml" onClick={() => handleUserStatus(user?._id,"active")}>Active</button>
                  )}
                  <button className="delete" onClick={() => handleDeleteUser(user?._id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
