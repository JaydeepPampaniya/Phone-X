import React, { createContext, useState } from "react";
import cookies from "js-cookie";
import axios from "axios";

export const BagContext = createContext();
const ContextProvider = ({ children }) => {
  const id = cookies.get("UserCookie");
  const [bagLength, setBagLength] = useState([]);

  const fetchDataForBagItemLength = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2022/getBagItem/${id}`
      );
      if (response.data.success === 1) {
        setBagLength(response.data.data.length);
      } 
    } catch (error) {
        console.log(error);  
    } 
  };
  return (
    <BagContext.Provider value={{ bagLength, fetchDataForBagItemLength }}>
      {children}
    </BagContext.Provider>
  );
};

export default ContextProvider;
