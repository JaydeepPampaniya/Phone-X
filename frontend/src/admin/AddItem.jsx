import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { toastStyle } from "../Constant/general";
import { toast, ToastContainer } from "react-toastify";
import LoadingSpinner from "../componnents/LoadingSpinner";

const AddItem = ()=> {
  const [image, setImage] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [getCategory, setGetCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (
      !image ||
      !companyName ||
      !deviceName ||
      !originalPrice ||
      !currentPrice ||
      !discount ||
      !description ||
      !category
    ) {
      toast.error("Please fill all the details", toastStyle);
      return;
    }
  
    const fd = new FormData();
    fd.append("image", image);
    fd.append("companyName", companyName);
    fd.append("deviceName", deviceName);
    fd.append("originalPrice", originalPrice);
    fd.append("currentPrice", currentPrice);
    fd.append("discount", discount);
    fd.append("description", description);
    fd.append("category", category);
  
    setLoading(true);
    try {
      const result = await axios.post("http://localhost:2022/addItem", fd);
      if(result.data.success===1){
        toast.success(result.data.message, toastStyle);
      }else{
        toast.error(result.data.message, toastStyle);
      }
    } catch (error) {
      toast.error(error.message, toastStyle);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:2022/getDataForCategory");
        if(response.data.success===1){
          setGetCategory(response.data.data);
        }
      } catch (error) {
        toast.error("Something went wrong", toastStyle);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center py-3">Add Item</h1>
        <hr />
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
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Company Name
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="-"
            aria-label=""
            aria-describedby="basic-addon1"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Device Name
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="-"
            aria-describedby="basic-addon1"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Original Price
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="₹"
            aria-describedby="basic-addon1"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Current Price
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="₹"
            aria-describedby="basic-addon1"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Discount
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="%"
            aria-describedby="basic-addon1"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>
        <div className="input-group  mb-3">
          <span className="input-group-text">Description</span>
          <textarea
            className="form-control"
            aria-label="With textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Category
          </span>
          <select
            className="form-select"
            aria-label="Default select example"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="select">Select Category</option>
            <hr />
            {getCategory.map((user) => (
              <option key={user.id} value={user.categoryName}>
                {user.categoryName}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="btn btn-secondary w-100 mb-5"
          onClick={submit}
        >
          Submit
        </button>
      </div>
      <ToastContainer />
      {loading && <LoadingSpinner />}
    </>
  );
}

export default AddItem;
