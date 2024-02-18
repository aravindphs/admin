import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    new_price: "",
    old_price: "",
    category: "women",
    image: "",
  });

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChanger = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });
    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);

      await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Product Added.") : alert("Failed.");
        });
    }
  };

  return (
    <div className="add-product">
      <div className="addProduct-itemField">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={handleChanger}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="addProduct-price">
        <div className="addProduct-itemField">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={handleChanger}
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="addProduct-itemField">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={handleChanger}
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addProduct-itemField">
        <p className="productCategory-p">Product Category</p>
        <select
          name="category"
          value={productDetails.category}
          onChange={handleChanger}
          className="addProduct-selector"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addProduct-itemField">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addProduct-thumbnailImage"
            alt=""
          />
        </label>
        <input
          onChange={handleImage}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        onClick={() => {
          Add_Product();
        }}
        className="addProduct-btn"
      >
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
