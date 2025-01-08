import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import profile from "../../public/assets/background/profile.png"
import { PiUserListBold } from "react-icons/pi";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const AdminNav = ({ selectedTab, setSelectedTab }) => {
  const navigate = useNavigate();
  const logOut = () => {
    cookies.remove('AdminId');
    navigate('/AdminLogin');
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">Phone<span style={{ color: "red" }}>X</span> Admin</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-start text-bg-dark" style={{ width: "250px" }} tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header gap-3">
              <img src={profile} alt="" width="30" height="30" />
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Administrator</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item" onClick={() => {
                  setSelectedTab("UserList");
                }}>
                  <a className={`nav-link ${selectedTab === "UserList" && "active"
                    }`} aria-current="page" href="#"><PiUserListBold /> &nbsp;User List</a>
                </li>
                <li className="nav-item" onClick={() => {
                  setSelectedTab("AddItem");
                }}>
                  <a className={`nav-link ${selectedTab === "AddItem" && "active"
                    }`} aria-current="page" href="#"><MdOutlineProductionQuantityLimits /> &nbsp;Add Item</a>
                </li>
                <li className="nav-item" onClick={() => {
                  setSelectedTab("AddPostCategory");
                }}>
                  <a className={`nav-link ${selectedTab === "AddPostCategory" && "active"
                    }`} aria-current="page" href="#"><BiCategoryAlt /> &nbsp;Add Post Category</a>
                </li>
                <li className="nav-item" onClick={() => {
                  setSelectedTab("OrderList");
                }}>
                  <a className={`nav-link ${selectedTab === "OrderList" && "active"
                    }`} aria-current="page" href="#"><BiCategoryAlt /> &nbsp;Order List</a>
                </li>
                <hr />
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#" onClick={logOut}><TbLogout />&nbsp;Log Out</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default AdminNav
