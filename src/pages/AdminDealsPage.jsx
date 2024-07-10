import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDealsRequest,
  addDealRequest,
  removeDealRequest,
} from "../redux/slices/dealsSlice";
import { fetchAllProducts } from "../redux/slices/productsSlice";

const AdminDealsPage = () => {
  const dispatch = useDispatch();
  const deals = useSelector((state) => state.deals.deals);
  const products = useSelector((state) => state.products.products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dealPrice, setDealPrice] = useState("");

  useEffect(() => {
    dispatch(fetchDealsRequest());
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleAddDeal = () => {
    if (selectedProduct && dealPrice) {
      const newDeal = {
        product: selectedProduct._id,
        dealPrice: parseFloat(dealPrice),
      };
      console.log("Sending new deal to server:", newDeal); // Log data before sending
      dispatch(addDealRequest(newDeal));
      setSelectedProduct(null);
      setDealPrice("");
    }
  };

  const handleRemoveDeal = (dealId) => {
    dispatch(removeDealRequest(dealId));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-2xl font-bold">Admin Deals Page</h2>
      <div className="mb-4">
        <label className="mb-2 block font-semibold">Select Product:</label>
        <select
          className="w-full rounded border p-2"
          value={selectedProduct?._id || ""}
          onChange={(e) =>
            setSelectedProduct(
              products.find((product) => product._id === e.target.value),
            )
          }
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="mb-2 block font-semibold">Deal Price:</label>
        <input
          type="number"
          className="w-full rounded border p-2"
          value={dealPrice}
          onChange={(e) => setDealPrice(e.target.value)}
        />
      </div>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white"
        onClick={handleAddDeal}
      >
        Add Deal
      </button>
      <h3 className="mb-4 mt-8 text-xl font-bold">Current Deals</h3>
      {deals.map((deal) => (
        <div key={deal._id} className="mb-4 rounded border p-4">
          <p>Product: {deal.product.name}</p>
          <p>Deal Price: ${deal.dealPrice}</p>
          <button
            className="rounded bg-red-500 px-4 py-2 text-white"
            onClick={() => handleRemoveDeal(deal._id)}
          >
            Remove Deal
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminDealsPage;
