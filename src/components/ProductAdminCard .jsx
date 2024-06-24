import React, { useState } from "react";

const ProductAdminCard = ({ product, onSave, isNew = false }) => {
  const [productData, setProductData] = useState(product);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        value={productData.name}
        onChange={handleChange}
        placeholder="Product Name"
      />
      <input
        type="text"
        name="description"
        value={productData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="number"
        name="price"
        value={productData.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <img
        src={productData.images[0] || "placeholder.jpg"}
        alt={productData.name}
        style={{ width: "100px" }}
      />
      {productData.purchases && productData.purchases.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Qty</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {productData.purchases.map((purchase) => (
              <tr key={purchase._id}>
                <td>{purchase.customerName}</td>
                <td>{purchase.quantity}</td>
                <td>{new Date(purchase.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={() => onSave(productData)}>
        {isNew ? "Add" : "Save"}
      </button>
    </div>
  );
};

export default ProductAdminCard;
