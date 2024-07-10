import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCartRequest } from "../redux/slices/cartSlice";

const ProductCard = ({ product, dealPrice }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.user?._id);

  const handleAddToCart = () => {
    if (!userId) {
      alert("Please log in to add items to your cart");
      return;
    }

    dispatch(
      addItemToCartRequest({
        userId,
        itemDetails: {
          productId: product._id,
          price: dealPrice || product.price,
          quantity: 1,
          size: product.size[0], // Assuming the first size is selected
          color: product.color, // Assuming color is directly available
        },
      }),
    );
  };

  return (
    <div className="rounded border p-4 shadow">
      <img
        src={product.images[0]}
        alt={product.name}
        className="h-48 w-full object-cover"
      />
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p>{product.description}</p>
      {dealPrice ? (
        <div>
          <p className="text-lg font-bold text-red-500">${dealPrice}</p>
          <p className="text-sm line-through">${product.price}</p>
        </div>
      ) : (
        <p className="text-lg font-bold">${product.price}</p>
      )}
      <button
        onClick={handleAddToCart}
        className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
