import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import React, { useRef, useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toast } from "bootstrap";
import { FaListUl } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Style from "../CSS/Navbar.module.css";
import { MdOutlineLogin } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import { BurgerArrow } from "react-burger-icons";
import cookies from "js-cookie";
import { FiUserCheck } from "react-icons/fi";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { toastStyle } from "../Constant/general";
import UserDetails from "./UserDetails";
import LoadingSpinner from "./LoadingSpinner";
import {BagContext} from "../Context/ContextProvider"

const Navbar = ()=> {
  const searcelement = useRef();
  const loginelement = useRef();
  const cartlement = useRef();
  const toastRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [seeUserDetails, setSeeUserDetails] = useState(false);
  const navigate = useNavigate();
  const [isClosed, setIsClosed] = useState(false);
  const [users, setUsers] = useState([]);
  const id = cookies.get("UserCookie");
  const {bagLength,fetchDataForBagItemLength} = useContext(BagContext);
  
  useEffect(() => {
    fetchDataForBagItemLength();
  }, [id]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);
        const response = await axios.get(`http://localhost:2022/getData/${id}`);
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
    fetchData();
  }, [id]);

  useEffect(() => {
    const toastTriggerSearch = document.getElementById("toastButton");
    const toastLiveExampleSearch = document.getElementById("myToast");

    if (toastTriggerSearch && toastLiveExampleSearch) {
      const toastBootstrap = Toast.getOrCreateInstance(toastLiveExampleSearch);
      if (toastBootstrap) {
        toastTriggerSearch.addEventListener("click", () => {
          toastBootstrap.show();
        });
      }
    }
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:2022/getDataForSearch/${searchTerm}`
      );
      if (response.data.success === 1) {
        setSearchResults(response.data.data, toastStyle);
      } else {
        toast.error(response.data.message, toastStyle);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, toastStyle);
    }
  };

  return (
    <>
      <nav className={`${Style.header} navbar navbar-expand-lg sticky-top`}>
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <FaListUl
              className="navbar-toggler-icon my-toggler text-white"
              style={{ fontSize: "20px" }}
            />
          </button>
          <div
            className="offcanvas offcanvas-start text-center"
            style={{ width: "40%", backgroundColor: "rgba(4, 0, 10, 0.819)" }}
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5
                className="offcanvas-title text-white"
                id="offcanvasNavbarLabel"
              >
                Phone-<span className={Style.x}>X</span>
              </h5>
              <a
                type="button"
                className={`${Style.iconclose} btn-close`}
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={() => setIsClosed(!isClosed)}
              >
                <BurgerArrow className={Style.close} isClosed={isClosed} />
              </a>
            </div>
            <div className={`offcanvas-body`}>
              <ul
                className={`${Style.navbarlist} navbar-nav me-auto mb-2 mb-lg-0`}
              >
                <li className="nav-item">
                  <a
                    className={`${Style.home} nav-link text-light`}
                    aria-current="page"
                    href="#"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    HOME
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`${Style.about} nav-link text-light `}
                    href="#"
                    onClick={() => navigate("/About")}
                  >
                    {" "}
                    ABOUT{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <a
            className={`${Style.logo} navbar-brand`}
            href="#"
            style={{ color: "white", fontWeight: "700" }}
          >
            Phone
            <span style={{ color: "red" }}>X</span>
          </a>
          <div
            className="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <form role="search">
              <button
                type="button"
                className={`${Style.search} btn px-1 position-relative`}
                id="toastButton"
                data-bs-dismiss="toast"
                aria-label="Close"
                ref={searcelement}
              >
                <FaSearch className={`text-white`} />
              </button>
              {id ? (
                <button
                  type="button"
                  className={`${Style.search} btn`}
                  onClick={() => setSeeUserDetails(true)}
                >
                  <FiUserCheck className={`text-white`} />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn mx-0 px-0"
                  ref={loginelement}
                >
                  <Dropdown>
                    <Dropdown.Toggle
                      variant=""
                      id="dropdown-basic"
                      className={`${Style.signUp} text-white`}
                    >
                      <MdOutlineLogin />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="bg-secondary">
                      <Dropdown.Item
                        className="text-info fw-bolder"
                        onClick={() => navigate("/SignIn#top")}
                      >
                        Sign In
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-denger fw-bolder"
                        onClick={() => navigate("/SignUp#top")}
                      >
                        Sign Up
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </button>
              )}
              <button
                type="button"
                className={`${Style.cart} btn px-1`}
                ref={cartlement}
                onClick={() => navigate("/Bag#top")}
              >
                <FaShoppingCart className={`text-white`} />
                <span className="position-absolute top-0 mt-2 start-100 translate-middle badge rounded-pill bg-danger">
                  {bagLength}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div
        className={`${Style.searchtost} toast-container position-fixed top-0 end-0 translate-middle-x`}
      >
        <div
          className="toast"
          id="myToast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          ref={toastRef}
        >
          <div className="toast-header">
            <strong className="me-auto">Search here</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-info" type="submit">
                Search
              </button>
            </form>
            {searchResults && (
              <div className="search-results">
                {searchResults.map((result) => (
                  <div key={result.id} className="search-result-item">
                    <img
                      src={result.image}
                      style={{ width: "40%", marginLeft: "5rem" }}
                      alt=""
                    />
                    <h3 className="text-center">{result.deviceName}</h3>
                    <p
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {result.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {loading && <LoadingSpinner />}
      <ToastContainer />
      {seeUserDetails && (
        <UserDetails
          users={users}
          closePopup={() => setSeeUserDetails(false)}
        />
      )}
    </>
  );
}

export default Navbar;
