import React from 'react'
import cookies from 'js-cookie'
import { useEffect, useState } from 'react';
import AdminMain from './AdminMain';
import AdminLogin from './AdminLogin';

const AdminMiddle = () => {
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    const id = cookies.get("AdminId");
    if (id) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  return (
    <div>
      {isLogin ? <AdminMain /> : <AdminLogin />}
    </div>
  );

}

export default AdminMiddle
