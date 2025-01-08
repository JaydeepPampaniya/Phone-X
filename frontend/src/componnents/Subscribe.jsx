import React from "react";
import Style from "../CSS/Subscribe.module.css";
import { BiLogoLinkedin } from "react-icons/bi";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";

function Subscribe() {
  return (
    <>
      <div className={Style.subscribeImage}>
        <div className={`${Style.new} container text-center`}>
          <div>
            <p className="text-secondry fs-5">NEWSLETTER</p>
            <h2>SUBSCRIBE FOR LATEST UPDATE AND OFFERS</h2>
          </div>
          <div className={`${Style.email} justify-content-center mt-4`}>
            <div className="col-md-4">
              <input
                type="email"
                className={`${Style.input} form-control`}
                id="inputEmail4"
                placeholder="Email"
              />
            </div>
            <div className="col-md-2">
              <button
                type="button"
                className={`${Style.subscribeButton} btn btn-info`}
              >
                Subscribe
              </button>
            </div>
          </div>
          <div>
            <p className="text-secondary mt-3">
              Will be used in accordance with our Privacy Policy
            </p>
          </div>
          <div className={`${Style.icon} mt-2`}>
            <a href="#">
              <BiLogoLinkedin />
            </a>
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Subscribe;
