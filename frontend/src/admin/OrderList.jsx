import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { toastStyle } from "../Constant/general";
import LoadingSpinner from "../componnents/LoadingSpinner";

const OrderList = () =>{
  const [bagItems, setBagItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBagItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:2022/getDelivery");
      if(response.data.success===1){
        setBagItems(response.data.data);
      }else{
        toast.error(response.data.message, toastStyle);
      }
    } catch (error) {
      toast.error("Failed to fetch orders. Please try again.", toastStyle);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBagItems();
  }, []);
  const handleRemoveItem = async (id) => {
    try {
      setLoading(true);
      const result = await axios.delete(`http://localhost:2022/deleteDelivery/${id}`);
      if (result.data.success === 1) {
        toast.success(result.data.message, toastStyle);
        fetchBagItems(); 
      } else {
        toast.error("Order not deleted. Please try again", toastStyle);
      }
    } catch (error) {
      toast.error(error.message, toastStyle);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className="text-center py-1 cl mt-5">Order List</h1>
      <div className="container-fluid" style={{ marginTop: "20px" }}>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Device Name</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">state</th>
              <th scope="col">City</th>
              <th scope="col">Address</th>
              <th scope="col">Locality</th>
              <th scope="col">Pincode</th>
              <th scope="col">OrderDate</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {bagItems.map((user, i) => (
              <>
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{user.deviceName}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.state}</td>
                  <td>{user.cityTownDistrict}</td>
                  <td>{user.address}</td>
                  <td>{user.locality}</td>
                  <td>{user.pincode}</td>
                  <td>{user.orderdate}</td>
                  <td>{user.currentPrice}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleRemoveItem(user.id)}
                    >
                      REMOVE
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
      
      {loading && <LoadingSpinner />}
    </>
  );
}

export default OrderList;
