import React from "react";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { toastStyle } from "../Constant/general";
import LoadingSpinner from "../componnents/LoadingSpinner";

const AddPostCategory = () => {
  const [categoryName, setCategoryName] = useState();
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!categoryName) {
      toast.error("Please enter category name", toastStyle);
      return;
    }
    const fd = new FormData(); 
    fd.append("categoryName", categoryName);
    fd.append("profile", profile);
    setLoading(true);
    try {
      const result = await axios.post("http://localhost:2022/postImage", fd);
      if(result.data.success===1){
        toast.success(result.data.message, toastStyle);
      }else{
        toast.error(result.data.message, toastStyle);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, toastStyle);
    } finally{
      setLoading(false);
    }
  };
  

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center p-3">Post Category</h1>
        <hr />
        <div className="my-5">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Image
            </span>
            <input
              className="form-control"
              aria-label="Username"
              aria-describedby="basic-addon1"
              type="file"
              action="/upload"
              id="selectFiles"
              name="myFile"
              enctype="multipart/form-data"
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Add Category
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Add Category"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-success w-100"
            onClick={submit}
          >
            Post
          </button>
        </div>
      </div>
      <ToastContainer />
      {loading && <LoadingSpinner />}
    </>
  );
}

export default AddPostCategory;
