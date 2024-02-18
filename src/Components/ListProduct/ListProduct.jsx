import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    fetchInfo();
  };

  return (
    <div className="listProduct">
      <h1>All Products List</h1>
      <div className="listProduct-formatMain">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listProduct-allProducts">
        <hr />
        {allProducts.map((product, index) => {
          return (
            <>
              <div
                key={index}
                className="listProduct-formatMain listProduct-format"
              >
                <img
                  src={product.image}
                  alt=""
                  className="listProduct-productIcon"
                />
                <p>{product.name}</p>
                <p>&#8377;{product.old_price}</p>
                <p>&#8377;{product.new_price}</p>
                <p>{product.category}</p>
                <img
                  src={cross_icon}
                  onClick={() => remove_product(product.id)}
                  alt=""
                  className="listProduct-removeIcon"
                />
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
