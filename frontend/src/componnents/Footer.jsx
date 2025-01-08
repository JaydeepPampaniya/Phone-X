import React from "react";
import Style from "../CSS/Footer.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPaperPlane } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${Style.footer} py-5 row`}>
        <div className="col-sm-12 col-md-3 px-2 mt-4">
          <h4>About</h4>
          <p className="text-secondary">
            We PhoneX Developer provide you best mobile phone and it's
            accessories based on your need. Thank you for visiting our website
          </p>
        </div>

        <div className={`${Style.contact} col-sm-12 col-md-3 px-2 mt-4`}>
          <h4>Contact</h4>
          <a
            href="https://maps.app.goo.gl/jouiWzjKgNDnKSAo6"
            target="_blank"
            className="text-secondary"
          >
            <FaPaperPlane /> &nbsp;Gota, Ahmedabad-382481
          </a>
          <a
            href="callto:9974177873"
            target="_blank"
            className="text-secondary"
          >
            <IoPhonePortraitOutline /> &nbsp;Phone: +91 9974177873
          </a>
          <a
            href="mailto:phonex@gmail.com"
            target="_blank"
            className="text-secondary"
          >
            <MdAttachEmail /> &nbsp;Email: phonex@gmail.com
          </a>
        </div>

        <div className={`${Style.contact} col-sm-12 col-md-3 px-2 mt-4`}>
          <h4>Categories</h4>
          <a href="#" className="text-secondary">
            Phones
          </a>
          <a href="#" className="text-secondary">
            Headphones
          </a>
          <a href="#" className="text-secondary">
            Airpodes
          </a>
          <a href="#" className="text-secondary">
            AR-VR
          </a>
        </div>

        <div className={`${Style.contact} col-sm-12 col-md-3 px-2 mt-4`}>
          <h4>Pages</h4>
          <a href="#" className="text-secondary" onClick={() => navigate("/")}>
            Home
          </a>
          <a
            href="#"
            className="text-secondary"
            onClick={() => navigate("/About#top")}
          >
            About
          </a>
          <a
            href="#"
            className="text-secondary"
            onClick={() => navigate("/Privacypolicy#top")}
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-secondary"
            onClick={() => navigate("/Return#top")}
          >
            Returns
          </a>
          <a
            href="#"
            className="text-secondary"
            onClick={() => navigate("/Term#top")}
          >
            Terms & Conditions
          </a>
        </div>
      </div>
      <hr />
      <div className={`${Style.payment} px-3`}>
        <div className={Style.logo}>
          <a className={`text-start text-secondary fs-5`} href="#">
            Phone
            <span style={{ color: "red" }}>X</span>
          </a>
        </div>
        <div className={Style.paymentcards}>
          <a href="#">
            <img src="/assets/Payment/visa.png" alt="payment" title="visa" />
          </a>
          <a href="#">
            <img
              src="/assets/Payment/mastercard.png"
              alt="payment"
              title="visa"
            />
          </a>
          <a href="#">
            <img src="/assets/Payment/paypal.png" alt="payment" title="visa" />
          </a>
          <a href="#">
            <img src="/assets/Payment/Maestro.png" alt="payment" title="visa" />
          </a>
          <a href="#">
            <img
              src="/assets/Payment/visa elecron.png"
              alt="payment"
              title="visa"
            />
          </a>
        </div>
      </div>
    </>
  );
}

export default Footer;
