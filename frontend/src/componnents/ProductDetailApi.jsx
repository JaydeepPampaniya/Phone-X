import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { GrAddCircle } from "react-icons/gr";
import LoadingSpinner from "./LoadingSpinner";
import cookies from "js-cookie";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { toastStyle } from "../Constant/general";
import { BagContext } from "../Context/ContextProvider";

function ProductDetailApi() {
  const { id } = useParams();
  const [product, setProducts] = useState();
  const id1 = cookies.get("UserCookie");
  const navigate = useNavigate("");
  const [loading, setLoading] = useState(false);
  const {fetchDataForBagItemLength} = useContext(BagContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:2022/getDataForItem/${id}`
        );
        if (response.data.success === 1) {
          setProducts(response.data.data[0]);
        } else {
          toast.error(response.data.message, toastStyle);
        }
      } catch (error) {
        toast.error(error.message, toastStyle);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const [inBag, setInBag] = useState();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:2022/getBagItem/${id1}`
      );
      if (response.data.success === 1) {
        setInBag(response.data.data);
      } else {
        toast.error(response.data.message, toastStyle);
      }
    } catch (error) {
      toast.error(error.message, toastStyle);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const addToBag = async () => {
    if (!id1) {
      navigate("/SignIn");
    } else {
      try {
        setLoading(true);
        const productId = product.id;
        const data = { productId: productId, userId: id1 };
        const response = await axios.post(
          "http://localhost:2022/addToBag",
          data
        );
        if (response.status === 200) {
          fetchData();
          fetchDataForBagItemLength();
          toast.success(response.data.message, toastStyle);
        }
      } catch (error) {
        toast.error(error.message, toastStyle);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleRemoveItem = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:2022/deleteBagItem/${id}`
      );
      if (response.data.success == 1) {
        fetchData();
        fetchDataForBagItemLength();
        toast.success(response.data.message, toastStyle);
      } else {
        toast.error(response.data.message, toastStyle);
      }
    } catch (error) {
      toast.error(error.message, toastStyle);
    } finally {
      setLoading(false);
    }
  };

  const hasInBag = () => {
    return inBag?.some((item) => item.productId == id);
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="container my-5" id="top">
        <div className="row">
          <div className="card mb-3">
            {product && (
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={product.image}
                    className="img-fluid rounded-start"
                    alt="Product"
                  />
                </div>
                <div className="col-md-8 my-5">
                  <div className="card-body">
                    <h5 className="card-title">{product.deviceName}</h5>
                    <div className="company-name">{product.companyName}</div>
                    <p className="card-text">{product.description}</p>
                  </div>
                  <div className="price text-center">
                    <span className="current-price">
                      Rs {product.currentPrice}
                    </span>
                    <span className="original-price">
                      Rs {product.originalPrice}
                    </span>
                    <span className="discount">({product.discount}% OFF)</span>
                  </div>
                  <div className="rating text-center">4.5 ⭐ | 30250</div>
                  {hasInBag() ? (
                    <button
                      type="button"
                      className="btn btn-remove-bag btn-danger"
                      onClick={() => handleRemoveItem(product.id)}
                    >
                      <AiFillDelete /> Remove
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-add-bag btn-success"
                      onClick={addToBag}
                    >
                      <GrAddCircle /> Add to Bag
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {loading && <LoadingSpinner />}
    </>
  );
}

export default ProductDetailApi;
