import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { toastStyle } from "../Constant/general";

const generateRandomCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

const Captcha = () => {
  const navigate = useNavigate(" ");

  const [captchaCode, setCaptchaCode] = useState(generateRandomCode());

  const handleRefreshCaptcha = () => {
    setCaptchaCode(generateRandomCode());
  };
  const [captcha, setCaptcha] = useState();

  const submit = () => {
    if (captchaCode === captcha) {
      navigate("/EditUser");
    } else {
      toast.error("Enter Correct Captcha", toastStyle);
    }
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="container my-5 text-center captcha">
        <h3>Captcha</h3>
        <img
          src="../../public/assets/background/captcha.png"
          className="img-fluid"
          alt="captcha"
        />

        <div className="my-3 captcha-button">
          <button
            className="btn text-white my-3"
            style={{ backgroundColor: "blueviolet" }}
          >
            CAPTCHA Code: {captchaCode}
          </button>
          <button
            type="button"
            className="btn btn-danger my-3"
            onClick={handleRefreshCaptcha}
          >
            Refresh CAPTCHA
          </button>
        </div>
        <div class="captcha-input">
          <div class="input-group mb-3 text-center">
            <span class="input-group-text" id="basic-addon1">
              👉
            </span>
            <input
              type="password"
              class="form-control"
              placeholder="Enter Captcha"
              aria-label="Username"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
              aria-describedby="basic-addon1"
            />
          </div>
          <br />
        </div>
        <button type="button" className="btn btn-success" onClick={submit}>
          Submit
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Captcha;
