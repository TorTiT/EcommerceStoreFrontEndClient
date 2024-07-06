import React, { useState, useReducer, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addItemToCart,
  updateCartItem,
  deleteCartItem,
} from "../redux/slices/cartSlice";

// Define local actions
const localActions = {
  INCREMENT_QUANTITY: "INCREMENT_QUANTITY",
  DECREMENT_QUANTITY: "DECREMENT_QUANTITY",
  SET_QUANTITY: "SET_QUANTITY",
};

// Local reducer function
const localReducer = (state, action) => {
  switch (action.type) {
    case localActions.INCREMENT_QUANTITY:
      return { ...state, quantity: state.quantity + 1 };
    case localActions.DECREMENT_QUANTITY:
      return { ...state, quantity: Math.max(0, state.quantity - 1) };
    case localActions.SET_QUANTITY:
      return { ...state, quantity: action.payload };
    default:
      return state;
  }
};

const ProductCard = ({ product }) => {
  if (!product) {
    console.error("Product data is missing");
    return null; // Render nothing if product is undefined
  }

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items) || []; // Ensure cartItems is an array
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const userId = useSelector((state) => state.auth.user?.user?._id); // Get user ID from auth state

  // Find the item in the cart and get its quantity
  const itemInCart = cartItems.find((item) => item.product._id === product._id);
  const initialQuantity = itemInCart ? itemInCart.quantity : 0;

  const [localItem, localDispatch] = useReducer(localReducer, {
    productId: product._id,
    quantity: initialQuantity,
    price: product.price,
    color: product.color,
    size: product.size[0], // Example size, assuming product.size is an array
  });

  // Synchronize local state with Redux state
  useEffect(() => {
    if (itemInCart) {
      localDispatch({
        type: localActions.SET_QUANTITY,
        payload: itemInCart.quantity,
      });
    } else {
      localDispatch({ type: localActions.SET_QUANTITY, payload: 0 });
    }
  }, [itemInCart]);

  const handleAddToCart = () => {
    localDispatch({ type: localActions.INCREMENT_QUANTITY });
    const itemDetails = {
      productId: product._id,
      quantity: localItem.quantity + 1,
      price: product.price,
      color: product.color,
      size: product.size[0],
    };
    dispatch(addItemToCart({ userId, itemDetails }));

    // Show toast notification
    toast.success("Item added to cart!");
  };

  const handleRemoveFromCart = () => {
    if (localItem.quantity === 1) {
      dispatch(deleteCartItem({ userId, itemId: itemInCart._id }));
      localDispatch({ type: localActions.SET_QUANTITY, payload: 0 });
      toast.success("Item removed from cart!");
    } else {
      localDispatch({ type: localActions.DECREMENT_QUANTITY });
      const itemDetails = {
        productId: product._id,
        quantity: localItem.quantity - 1,
        price: product.price,
        color: product.color,
        size: product.size[0],
      };
      dispatch(
        updateCartItem({
          userId,
          itemId: itemInCart._id,
          updateDetails: itemDetails,
        }),
      );
      toast.success("Item quantity updated!");
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className="transform rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105">
      <div className="relative">
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="h-48 w-full rounded-lg object-cover"
        />
        {product.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded-l bg-gray-800 bg-opacity-50 px-3 py-1 text-white hover:bg-opacity-75"
            >
              {"<"}
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-r bg-gray-800 bg-opacity-50 px-3 py-1 text-white hover:bg-opacity-75"
            >
              {">"}
            </button>
          </>
        )}
      </div>
      <h3 className="mt-4 text-xl font-semibold text-gray-800">
        {product.name}
      </h3>
      <p className="mt-2 text-gray-600">${product.price}</p>
      <div className="mt-4 flex items-center justify-center">
        <button
          onClick={handleRemoveFromCart}
          className="mr-2 rounded-full bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          -
        </button>
        <span className="px-4 text-lg font-medium text-gray-800">
          {localItem.quantity}
        </span>
        <button
          onClick={handleAddToCart}
          className="ml-2 rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
