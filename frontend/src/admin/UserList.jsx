import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FcBusinessman } from "react-icons/fc";
import { FcBusinesswoman } from "react-icons/fc";
import { FcDecision } from "react-icons/fc";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { toastStyle } from "../Constant/general";
import LoadingSpinner from "../componnents/LoadingSpinner";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:2022/getData");
      setUsers(response.data || []); 
    } catch (error) {
      toast.error("Error fetching user data.", toastStyle);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      const result = await axios.delete(`http://localhost:2022/delete/${id}`);
      if (result.data.success === 1) {
        toast.success(result.data.message, toastStyle);
        fetchUsers();
      } else {
        toast.error(result.data.message, toastStyle);
      }
    } catch (error) {
      toast.error(error.message, toastStyle);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className="text-center py-1 cl mt-5">UserList</h1>
      <table className="table container text-center">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Profile</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">Created at</th>
            <th scope="col">Last Login</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user.id}>
              <th scope="row">{i + 1}</th>
              <td className="fs-4 text-success">
                {user.gender === "Male" ? (
                  <FcBusinessman />
                ) : user.gender === "Female" ? (
                  <FcBusinesswoman />
                ) : (
                  <FcDecision />
                )}
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.createdat}</td>
              <td>{user.lastlogin}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteUser(user.id)}
                >
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {loading && <LoadingSpinner />}
    </>
  );
}

export default UserList;
