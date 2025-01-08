import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { GrAddCircle } from "react-icons/gr";
import LoadingSpinner from "./LoadingSpinner";
import cookies from "js-cookie";
import { AiFillDelete } from "react-icons/ai";

function Search() {
  const { deviceName } = useParams();
  const [product, setProduct] = useState(null);
  const id1 = cookies.get("UserCookie");
  const navigate = useNavigate("");

  // useEffect(() => {
  //   fetch(`http://localhost:2022/getDataForItem/${id}`)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch product details');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       if (Array.isArray(data) && data.length === 1) {
  //         setProduct(data[0]);
  //       } else {
  //         throw new Error('Invalid product data format');
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     });
  // }, [id]);

  useEffect(() => {
    fetch(`http://localhost:2022/getDataForItem/${deviceName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProduct(data[0]);
        } else {
          throw new Error("No product data found");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const [inBag, setInBag] = useState(false);

  useEffect(() => {
    if (id1 && product) {
      const userId = id1;
      const productId = product.id;
      axios
        .get(
          `http://localhost:2022/getBagItem?userId=${userId}&productId=${productId}`
        )
        .then((response) => {
          setInBag(response.data.inBag);
        })
        .catch((error) => {
          console.log("Error checking bag:", error);
        });
    }
  }, [id1, product]);

  const addToBag = async () => {
    if (!id1) {
      navigate("/SignIn");
    } else {
      const userId = id1;
      const productId = product.id;
      console.log("productId", productId);
      const data = { userId, productId };
      await axios
        .post("http://localhost:2022/addToBag", data)
        .then((result) => {
          console.log(result);
          setInBag(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleRemoveItem = async (id) => {
    await axios
      .delete(`http://localhost:2022/deleteBagItem/${id}`)
      .then((result) => {
        console.log(result);
        if (result.data.success == 1) {
          alert("Item Remove");
          window.location.reload();
        } else {
          console.log("item not removed");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error occurred while delete api calling. Please try again.");
      });
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container my-5" id="top">
      <div className="row">
        <div className="card mb-3">
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
                <span className="current-price">Rs {product.currentPrice}</span>
                <span className="original-price">
                  Rs {product.originalPrice}
                </span>
                <span className="discount">({product.discount}% OFF)</span>
              </div>
              <div className="rating text-center">4.5 ⭐ | 30250</div>
              {inBag ? (
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
        </div>
      </div>
    </div>
  );
}

export default Search;
