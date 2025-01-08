import React from 'react'
import Navbar from '../componnents/Navbar'
import Footer from '../componnents/Footer'
import Subscribe from '../componnents/Subscribe'
import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Subscribe></Subscribe>
      <Footer></Footer>
    </div>
  )
}

export default Layout
