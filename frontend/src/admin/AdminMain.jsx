import React from 'react';
import AdminNav from './AdminNav';
import { useState } from 'react';
import UserList from './UserList';
import AddItem from './AddItem';
import AddPostCategory from './AddPostCategory';
import OrderList from './OrderList';

const AdminMain = () => {
  const [selectedTab, setSelectedTab] = useState("UserList");
  return (
    <>
      <AdminNav
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      ></AdminNav>
      <div>
        {selectedTab === "UserList" ? (
          <UserList />
        ) : selectedTab === "AddItem" ? (
          <AddItem />
        ) : selectedTab === "AddPostCategory" ? (
          <AddPostCategory />
        ) : (
          <OrderList />
        )}
      </div>
    </>
  )
}

export default AdminMain
