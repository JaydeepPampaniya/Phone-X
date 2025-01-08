import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.js';
import React from "react";
import "../CSS/App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "../componnents/Home";
import SignUp from "../componnents/SignUp";
import SignIn from "../componnents/SignIn";
import Bag from "../componnents/Bag";
import About from "../componnents/About";
import Privacypolicy from "../componnents/Privacypolicy";
import Return from "../componnents/Return";
import Term from "../componnents/Term";
import AdminLogin from "../admin/AdminLogin";
import Layout from "./Layout";
import EditUser from "../componnents/EditUser";
import AdminMiddle from "../admin/AdminMiddle";
import Captcha from '../componnents/Captcha';
import Delivery from "../componnents/Delivery";
import ProductDetailApi from "../componnents/ProductDetailApi";
import Search from "../componnents/Search";
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';
import ContextProvider from "../Context/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path="" element={<Home />}></Route>
            <Route path="/EditUser" element={<EditUser />}></Route>
            <Route path="/SignUp" element={<SignUp />}></Route>
            <Route path="/SignIn" element={<SignIn />}></Route>
            <Route path='/Bag' element={<Bag />}></Route>
            <Route path="/About" element={<About />}></Route>
            <Route path="/Privacypolicy" element={<Privacypolicy />}></Route>
            <Route path="/Return" element={<Return />}></Route>
            <Route path="/Term" element={<Term />}></Route>
            <Route path="/Captcha" element={<Captcha />}></Route>
            <Route path="/Delivery" element={<Delivery />}></Route>
            <Route path="/ProductDetailApi/:id" element={<ProductDetailApi />}></Route>
            <Route path="/Search" element={<Search />}></Route>
          </Route>
          <Route>
            <Route path="/AdminLogin" element={<AdminLogin />}></Route>
            <Route path="/Admin/AdminMiddle" element={<AdminMiddle />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
