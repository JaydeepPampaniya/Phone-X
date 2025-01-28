import React, { useEffect } from "react";
import cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
import { FcDecision } from "react-icons/fc";
import manavtar from "../../public/assets/background/manavtar.png";
import womenavtar from "../../public/assets/background/womenavtar.jpg";
import { toast } from "react-toastify";
import { toastStyle } from "../Constant/general";
import LoadingSpinner from "./LoadingSpinner";

const EditUser = () => {
  const [users, setUsers] = useState([]);
  const id = cookies.get("UserCookie");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fatchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:2022/getData/${id}`);
        if (response.data.success === 1) {
          setUsers(response.data.data);
        }else{
          toast.error(response.data.message,toastStyle);
        }
      } catch (error) {
        toast.error(error.message, toastStyle);
      } finally {
        setLoading(false);
      }
    };
    fatchData();
  }, [updated]);

  const update = async () => {
    if (name && email && password) {
      const data = { name, email, password };
      try{
        setLoading(true);
        const response = await axios.patch(`http://localhost:2022/update/${id}`, data);
        if(response.data.success === 1){
          setUpdated(!update);
          toast.success(result.data.message, toastStyle);
        }else{
          toast.error(result.data.message, toastStyle);
        }
      }catch(error){
        toast.error(error.message);
      }finally{
        setLoading(false);
      }  
    } else {
      toast.error("Please fill all the Details", toastStyle);
    }
  };

  return (
    <>
      {users.map((user) => (
        <div key={user.id} class="card text-center container my-5">
          <div class="card-header">Edit User Detail</div>
          <div class="card-body">
            <p class="card-text">Change Account Details</p>
            <p style={{ width: "", fontSize: "3rem" }}>
              {user.gender === "Male" ? (
                <img
                  src={manavtar}
                  style={{ width: "10rem", borderRadius: "50%" }}
                  class="card-img-top"
                  alt="avtar"
                />
              ) : user.gender === "Female" ? (
                <img
                  src={womenavtar}
                  style={{ width: "10rem", borderRadius: "50%" }}
                  class="card-img-top"
                  alt="avtar"
                />
              ) : (
                <FcDecision />
              )}
            </p>
            <div class="input-group my-3">
              <span class="input-group-text" id="basic-addon1">
                Name
              </span>
              <input
                type="text"
                class="form-control"
                placeholder={`Old Name: ${user.name}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon2">
                @gmail.com
              </span>
              <input
                type="email"
                class="form-control"
                placeholder={`Old Email: ${user.email}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">
                Password
              </span>
              <input
                type="password"
                class="form-control"
                placeholder={`Old Password: ${user.password}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <button
              className="btn btn-info w-100 text-white"
              type="button"
              onClick={update}
            >
              Update
            </button>
          </div>
        </div>
      ))}
      {loading && <LoadingSpinner />}
     
    </>
  );
};

export default EditUser;
