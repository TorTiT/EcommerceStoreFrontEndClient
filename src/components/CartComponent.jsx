// src/components/CartComponent.js

import React, { useState, useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  deleteCartItem,
  addItemToCart,
  updateCartItem,
} from "../redux/slices/cartSlice";
import {
  selectCartItemsWithDetails,
  selectCartStatus,
  selectCartError,
} from "../redux/selectors/cartSelectors";
import { toast } from "react-toastify";

// Define action types for the reducer
const actionTypes = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  SET_ITEMS: "SET_ITEMS",
};

// Reducer function to manage cart state
const cartReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM:
      return [...state, action.payload];
    case actionTypes.REMOVE_ITEM:
      return state.filter((item) => item._id !== action.payload);
    case actionTypes.UPDATE_QUANTITY:
      return state.map((item) =>
        item._id === action.payload.itemId
          ? { ...item, quantity: action.payload.quantity }
          : item,
      );
    case actionTypes.SET_ITEMS:
      return action.payload;
    default:
      return state;
  }
};

const CartComponent = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage if the cart is open
  const cartItemsWithDetails = useSelector(selectCartItemsWithDetails);
  const status = useSelector(selectCartStatus);
  const error = useSelector(selectCartError);
  const dispatch = useDispatch();

  const [localCartItems, localDispatch] = useReducer(cartReducer, []); // Local reducer for cart items

  const userId = useSelector((state) => state.auth.user?.user?._id); // Get user ID from auth state

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (cartItemsWithDetails.length > 0) {
      localDispatch({
        type: actionTypes.SET_ITEMS,
        payload: cartItemsWithDetails,
      });
    }
  }, [cartItemsWithDetails]);

  const toggleCart = () => {
    setIsOpen(!isOpen); // Toggle cart open/close
  };

  const handleRemoveItem = (itemId) => {
    localDispatch({ type: actionTypes.REMOVE_ITEM, payload: itemId }); // Optimistically remove item
    dispatch(deleteCartItem({ userId, itemId }));
    toast.success("Item removed from cart");
  };

  const handleAddItem = (itemDetails) => {
    const existingItem = localCartItems.find(
      (item) => item.productId === itemDetails.productId,
    );
    if (existingItem) {
      handleUpdateItemQuantity(existingItem._id, existingItem.quantity + 1);
    } else {
      const newItem = { ...itemDetails, _id: Date.now().toString() }; // Temporary ID for new item
      localDispatch({ type: actionTypes.ADD_ITEM, payload: newItem }); // Optimistically add item
      dispatch(addItemToCart({ userId, itemDetails }));
      toast.success("Item added to cart");
    }
  };

  const handleUpdateItemQuantity = (itemId, quantity) => {
    localDispatch({
      type: actionTypes.UPDATE_QUANTITY,
      payload: { itemId, quantity },
    }); // Optimistically update item quantity
    if (quantity <= 0) {
      handleRemoveItem(itemId);
    } else {
      dispatch(updateCartItem({ userId, itemId, updateDetails: { quantity } }));
      toast.success("Cart updated");
    }
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") {
    const errorMessage =
      typeof error === "string" ? error : error?.message || "An error occurred";
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div>
      <div
        className={`fixed right-0 top-0 z-50 h-full transition-transform duration-300 ${
          isOpen ? "w-64 translate-x-0" : "w-0 translate-x-full"
        } bg-white shadow-lg`}
      >
        <div
          className={`h-full flex-col overflow-y-auto p-4 ${isOpen ? "flex" : "hidden"}`}
        >
          <h3 className="text-lg font-bold">Shopping Cart</h3>
          {error && <div className="text-red-500">{error}</div>}
          {localCartItems.map((item) => (
            <div key={item._id} className="mt-4 flex items-center">
              {item.productDetails?.images?.[0] && (
                <img
                  src={item.productDetails.images[0]}
                  alt={item.productDetails.name}
                  className="h-16 w-16 rounded object-cover"
                />
              )}
              <div className="ml-4">
                <h4 className="font-bold">
                  {item.productDetails?.name || "Unknown Product"}
                </h4>
                <p>${item.price}</p>
                <div className="mt-2 flex items-center">
                  <button
                    onClick={() =>
                      handleUpdateItemQuantity(item._id, item.quantity - 1)
                    }
                    className="mr-2 rounded bg-red-500 px-2 py-1 text-white"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleUpdateItemQuantity(item._id, item.quantity + 1)
                    }
                    className="ml-2 rounded bg-blue-500 px-2 py-1 text-white"
                  >
                    +
                  </button>
                </div>
                <button
                  className="mt-2 rounded bg-red-500 px-2 py-1 text-white focus:outline-none"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 font-bold">
            Total: $
            {localCartItems
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </div>
        </div>
      </div>
      <div className="fixed right-0 top-0 z-50 mr-2 mt-2">
        <button
          className="rounded bg-blue-500 px-2 py-1 text-white focus:outline-none"
          onClick={toggleCart}
        >
          {isOpen ? "<" : ">"}
        </button>
      </div>
    </div>
  );
};

export default CartComponent;
