import "bootstrap/dist/css/bootstrap.min.css";
import cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import LoadingSpinner from "./LoadingSpinner";
import { toast, ToastContainer } from "react-toastify";
import { toastStyle } from "../Constant/general";
import EmptyBagItem from "./EmptyBagItem";
import {BagContext} from "../Context/ContextProvider";

const Bag = () => {
  const [bagItems, setBagItems] = useState([]);
  const navigate = useNavigate("");
  const userId = cookies.get("UserCookie");
  const [loading, setLoading] = useState(true);
  const [totalMRP, setTotalMRP] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [time, setTime] = useState(new Date());
  const {fetchDataForBagItemLength} = useContext(BagContext);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = new Date();
      newTime.setDate(newTime.getDate() + 7);
      setTime(newTime);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchProducts = async () => {
    if (!userId) {
      navigate("/SignIn");
    } else {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:2022/getBagItem/${userId}`
        );
        if (response.data.success === 1) {
          setBagItems(response.data.data);
          setDiscount(
            response.data.data.reduce(
              (acc, item) => acc + (item.currentPrice - item.originalPrice),
              0
            )
          );
          setTotalMRP(
            response.data.data.reduce(
              (acc, item) => acc + parseInt(item.currentPrice),
              0
            )
          );
        } else {
          toast.error(response.data.message, toastStyle);
        }
      } catch (error) {
        toast.error(error.message, toastStyle);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRemoveItem = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:2022/deleteBagItem/${id}`
      );
      if (response.data.success === 1) {
        fetchProducts();
        fetchDataForBagItemLength();
        toast.success(response.data.message, toastStyle);
      } else {
        toast.error(response.data.message, toastStyle);
      }
    } catch (error) {
      toast.error(error.message, toastStyle);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="container mb-5" id="top">
        <div id="top">
          <div className="container mb-5">
            {bagItems.length === 0 ? (
              <EmptyBagItem />
            ) : (
              <div className="row">
                <div className="bag-items-container col-md-8 col-sm-12">
                  {bagItems.map((item) => (
                    <>
                      <div className="bag-item-container" key={item.id}>
                        <div className="item-left-part">
                          <img className="bag-item-img" src={item.image} />
                        </div>
                        <div className="item-right-part">
                          <div className="company">{item.companyName}</div>
                          <div className="item-name">{item.deviceName}</div>
                          <div className="price-container">
                            <span className="current-price">
                              Rs {item.currentPrice}
                            </span>
                            <span className="original-price">
                              Rs {item.originalPrice}
                            </span>
                            <span className="discount-percentage">
                              ({item.discount}% OFF)
                            </span>
                          </div>
                          <div className="return-period">
                            <span className="return-period-days">7 days</span>{" "}
                            return available
                          </div>
                          <div className="delivery-details">
                            Delivery by {time.toLocaleDateString()}
                            <span className="delivery-details-days"></span>
                          </div>
                        </div>
                        <div
                          className="remove-from-cart"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <RiDeleteBin5Fill />
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                <div className="col-md-4 col-sm-12 pt-5">
                  <div className="bag-summary">
                    <div className="bag-details-container">
                      <div className="price-header">
                        PRICE DETAILS ({bagItems.length} Items){" "}
                      </div>
                      <div className="price-item">
                        <span className="price-item-tag">Total MRP</span>
                        <span className="price-item-value">
                          ₹{Math.round(totalMRP)}
                        </span>
                      </div>
                      <div className="price-item">
                        <span className="price-item-tag">Discount on MRP</span>
                        <span className="price-item-value priceDetail-base-discount">
                          ₹{discount}
                        </span>
                      </div>
                      <div className="price-item">
                        <span className="price-item-tag">Convenience Fee</span>
                        <span className="price-item-value">₹99</span>
                      </div>
                      <hr />
                      <div className="price-footer">
                        <span className="price-item-tag">Total Amount</span>
                        <span className="price-item-value">
                          ₹{Math.round(totalMRP) + 99}
                        </span>
                      </div>
                    </div>
                    <button className="btn-place-order">
                      <div
                        className="css-xjhrni"
                        onClick={() => navigate("/Delivery")}
                      >
                        PLACE ORDER
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
      {loading && <LoadingSpinner />}  
    </>
  );
};

export default Bag;
