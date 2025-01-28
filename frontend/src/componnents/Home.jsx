import React, { useRef } from "react";
import "bootstrap/dist/js/bootstrap.js";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { MdOutlineEventNote } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import { toastStyle } from "../Constant/general";
import Style from "../CSS/Home.module.css";

const Home = () => {
  const cousel1 = useRef();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:2022/getDataForItem"
        );
        if (response.data.success === 1) {
          setUsers(response.data.data);
        } else {
          toast.error(response.data.message, toastStyle);
        }
      } catch (error) {
        toast.error(error.message, toastStyle);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className={`${Style.background}`} id="top">
        <div className="container">
          <div className="text-center">
            <div className={`${Style.sale} row`}>
              <div className="col-md-6 col-sm-12">
                <h1>
                  <span style={{ color: "rgba(110, 57, 57, 0.771)" }}>
                    {" "}
                    <span style={{ color: "black" }}> UP TO </span> 40%
                  </span>{" "}
                  OFF
                </h1>
                <p>On Every Latest Iphones available in our mobile store.</p>
                <button
                  type="button"
                  className="btn btn-light mx-2"
                  onClick={() => navigate("/Term#top")}
                >
                  READ MORE
                </button>
                <button type="button" className="btn btn-light mx-2">
                  <a
                    href="#read"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    SHOP NOW
                  </a>
                </button>
              </div>
              <div className="col-md-6 col-sm-12">
                <div
                  id="carouselExampleSlidesOnly"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner" ref={cousel1}>
                    <div
                      className="carousel-item active"
                      data-bs-interval="1800"
                    >
                      <div className={`${Style.iphone} text-center`}>
                        <img
                          src="../public/DiscountBanners/iphone.png"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="1800">
                      <div className={`${Style.iphone} text-center`}>
                        <img
                          src="../public/DiscountBanners/s24.png"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="1800">
                      <div className={`${Style.iphone} text-center`}>
                        <img
                          src="../public/DiscountBanners/headphone-prod-1.webp"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="1800">
                      <div className={`${Style.iphone} text-center`}>
                        <img
                          src="../public/DiscountBanners/earbuds-prod-5.webp"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="1800">
                      <div className={`${Style.iphone} text-center`}>
                        <img
                          src="../public/DiscountBanners/ps5.png"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <h3 className="popularbottom" id="read">
          POPULAR PRODUCTS
        </h3>
      </div>
      <div className="items-container">
        {users.map((user) => (
          <div className="my-5" key={user.id}>
            <div className="item-container" key={user && user.id}>
              <Link
                to={`/ProductDetailApi/${user.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="item-link">
                  <img
                    className="item-image"
                    src={user.image}
                    alt="item image"
                  />
                  <div className="rating text-dark">4.5 ⭐ | 30250</div>
                  <div className="company-name">{user.companyName}</div>
                  <div className="item-name">{user.deviceName}</div>
                  <div className="price">
                    <span className="current-price">
                      Rs {user.currentPrice}
                    </span>
                    <span className="original-price">
                      Rs {user.originalPrice}
                    </span>
                    <span className="discount">({user.discount}% OFF)</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-remove-bag btn-info text-white"
                >
                  <MdOutlineEventNote /> View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {loading && <LoadingSpinner />}
    </>
  );
};

export default Home;
