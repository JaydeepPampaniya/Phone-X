import React from "react";
import Style from "../CSS/SignUp.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { toastStyle } from "../Constant/general";
import LoadingSpinner from "./LoadingSpinner";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [loading,setLoading] = useState(false);

  const reg = async (e) => {
    e.preventDefault();

    if (
      name &&
      email &&
      password &&
      confirmPassword &&
      gender &&
      password === confirmPassword
    ) {
      try{
        setLoading(true);
        const data = { name, email, password, gender };
        const response = await axios
        .post("http://localhost:2022/postData", data)
          if (response.data.success == 1) {
            toast.success("SignUp successfully",toastStyle);
            setTimeout(()=>{navigate("/SignIn#top");},1500)
          } else {
            toast.error();
          }
      }
      catch(error){
        if(error.response.status===400){
          toast.error("Email already exist",toastStyle);
        }else{
          toast.error(error.message,toastStyle);
        }
      }
      finally{
        setLoading(false);
      }
    } else {
      toast.error("Please fill in all the fields and ensure the passwords match.",toastStyle);
    }
  };
  const navigate = useNavigate("");
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className={Style.hero} id="top">
        <div className="container py-5">
          <div className="col-md-6">
            <h2 className="text-center text-white"> Sign Up</h2>
            <form className="row g-3 text-start">
              <div className="col-12">
                <input
                  type="text"
                  value={name}
                  className="form-control"
                  placeholder="Name"
                  aria-label="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-12">
                <input
                  type="email"
                  value={email}
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-12">
                <input
                  type="password"
                  value={password}
                  className="form-control"
                  id="inputPassword4"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="col-12">
                <input
                  type="confirmPassword"
                  value={confirmPassword}
                  className="form-control"
                  id="inputPassword4"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="my-3 mx-1 col-12">
                <div className={`${Style.radio} form-check`}>
                  <input
                    value="Male"
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label className="form-check-label" for="flexRadioDefault2">
                    Male
                  </label>
                </div>
                <div className={`${Style.radio} form-check`}>
                  <input
                    value="Female"
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label className="form-check-label " for="flexRadioDefault2">
                    Female
                  </label>
                </div>
                <div className={`${Style.radio} form-check`}>
                  <input
                    value="Other"
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label className="form-check-label" for="flexRadioDefault2">
                    Other
                  </label>
                </div>
              </div>
              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-success col-12"
                  onClick={reg}
                >
                  Sign up
                </button>
              </div>
              <div className="text-white">
                Already Have an Account?{" "}
                <span
                  className={Style.signin}
                  onClick={() => navigate("/SignIn#top")}
                >
                  SignIn
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      {loading && <LoadingSpinner />}
      <ToastContainer />
    </>
  );
}

export default SignUp;
