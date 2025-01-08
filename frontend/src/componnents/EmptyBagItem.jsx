import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const EmptyBagItem = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center mt-5 text-center">
      <img
        src="../../public/assets/background/pato-juan.gif" 
        alt="Empty Bag"
        className="mb-4"
        style={{ maxWidth: "150px" }}
      />
      <h2 className="mb-3">Your Bag is Empty 😢</h2>
      <p className="mb-4 text-muted">
        Looks like you haven’t added anything to your bag yet.
      </p>
      <button
        className="btn btn-danger px-4 py-2"
        onClick={()=> navigate('/')}
      >
        Go to Shopping
      </button>
    </div>
  );
};

export default EmptyBagItem;
