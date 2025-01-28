import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import cookies from "js-cookie";
import { toast } from "react-toastify";
import { toastStyle } from "../Constant/general";
import LoadingSpinner from "./LoadingSpinner";

const Delivery = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [pincode, setPincode] = useState();
  const [locality, setLocality] = useState();
  const [address, setAddress] = useState();
  const [state, setState] = useState();
  const [cityTownDistrict, setCityTownDistrict] = useState();
  const id = cookies.get("UserCookie");
  const [loading, setLoading] = useState(false);

  const pay = async (itemId) => {
    const userId = id;
    const productId = itemId;
    const data = {
      name,
      email,
      mobile,
      pincode,
      state,
      locality,
      address,
      cityTownDistrict,
      userId,
      productId,
    };
    if (
      name &&
      email &&
      mobile &&
      pincode &&
      locality &&
      address &&
      state &&
      cityTownDistrict
    ) {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:2022/delivery",
          data
        );
        if (response.data.success === 1) {
          toast.success(response.data.message, toastStyle);
        }
      } catch (error) {
        toast.error(error.message, toastStyle);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please fill all the fields", toastStyle);
    }
  };

  const [bagItems, setBagItems] = useState([]);
  const [totalMRP, setTotalMRP] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:2022/getBagItem/${id}`
      );
      setLoading(true);
      try {
        if (response.data.success === 1) {
          setBagItems(response.data.data);
          setTotalMRP(
            response.data.data.reduce(
              (acc, item) => acc + parseInt(item.currentPrice),
              0
            )
          );
        }
      } catch (error) {
        toast.error("Error While Fetching a Items", toastStyle);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount) => {
    if (
      name &&
      email &&
      mobile &&
      pincode &&
      locality &&
      address &&
      state &&
      cityTownDistrict
    ) {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        toast.error("you are offline", toastStyle);
        return;
      }

      const option = {
        key: "rzp_test_SL2yXVSzHz9g9p",
        currency: "INR",
        amount: amount * 100,
        name: "PhoneX",
        description: "Thanks for buying products from the our website",
        image: "icon.png",
        handler: function (response) {
          setShowCart(false);
          setCartItems([]);
          navigate("/");
          bagItems.forEach((item) => pay(item.id));
          toast.error("Payment successful", toastStyle);
        },
        prefill: {
          name: "hello",
        },
      };

      const paymentObject = new window.Razorpay(option);
      paymentObject.open();
    } else {
      toast.error("Please fill all the fields", toastStyle);
    }
  };

  return (
    <>
      <div className="container my-5">
        <h2>
          <FaLocationDot />
          &nbsp; Enter Address
        </h2>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            Name
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            @gmail.com
          </span>
          <input
            type="email"
            class="form-control"
            placeholder="Email"
            aria-label="Email"
            aria-describedby="basic-addon1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            +91
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="10-digit mobile number"
            aria-label="Email"
            aria-describedby="basic-addon1"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <div class="input-group mb-3">
          <input
            type="number"
            class="form-control"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            aria-label="Username"
          />
          <span class="input-group-text">And</span>
          <input
            type="text"
            class="form-control"
            placeholder="Locality"
            aria-label="Server "
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Address</span>
          <textarea
            class="form-control"
            aria-label="With textarea"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="City/Town/District"
            value={cityTownDistrict}
            onChange={(e) => setCityTownDistrict(e.target.value)}
            aria-label="Username"
          />
          <input
            type="text"
            class="form-control"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            aria-label="Server"
          />
        </div>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            displayRazorpay(totalMRP);
          }}
        >
          ₹ Pay {Math.round(totalMRP)}
        </button>
      </div>
      {loading && <LoadingSpinner />}
    </>
  );
};

export default Delivery;
