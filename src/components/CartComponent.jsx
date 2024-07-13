import React, { useState, useEffect, useReducer, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCartRequest,
  deleteCartItemRequest,
  addItemToCartRequest,
  updateCartItemRequest,
} from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";
import { useSpring, animated } from "@react-spring/web";

const CartComponent = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage if the cart is open
  const cartItems = useSelector((state) => state.cart.items) || [];
  const status = useSelector((state) => state.cart.status);
  const error = useSelector((state) => state.cart.error);
  const dispatch = useDispatch();
  const cartRef = useRef(null);
  const buttonRef = useRef(null);

  const userId = useSelector((state) => state.auth.user?.user?._id); // Get user ID from auth state

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartRequest(userId));
    }
  }, [dispatch, userId]);

  const toggleCart = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen); // Toggle cart open/close
  };

  const handleRemoveItem = (itemId) => {
    dispatch(deleteCartItemRequest({ userId, itemId }));
    toast.success("Item removed from cart");
  };

  const handleAddItem = (itemDetails) => {
    const existingItem = cartItems.find(
      (item) => item.product._id === itemDetails.product._id,
    );
    if (existingItem) {
      handleUpdateItemQuantity(existingItem._id, existingItem.quantity + 1);
    } else {
      dispatch(addItemToCartRequest({ userId, itemDetails }));
      toast.success("Item added to cart");
    }
  };

  const handleUpdateItemQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId);
    } else {
      dispatch(
        updateCartItemRequest({ userId, itemId, updateDetails: { quantity } }),
      );
      toast.success("Cart updated");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartRef, buttonRef]);

  const slideInStyle = useSpring({
    transform: isOpen ? "translateX(0%)" : "translateX(-100%)",
  });

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") {
    const errorMessage =
      typeof error === "string" ? error : error?.message || "An error occurred";
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div>
      <animated.div
        ref={cartRef}
        style={slideInStyle}
        className="fixed left-0 top-0 z-50 h-full w-64 bg-white shadow-lg"
      >
        <div className="h-full flex-col overflow-y-auto p-4">
          <h3 className="text-lg font-bold">Shopping Cart</h3>
          {error && <div className="text-red-500">{error}</div>}
          {cartItems.length === 0 ? (
            <div>Your cart is empty</div>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="mt-4 flex items-center">
                {item.product?.images?.[0] && (
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="h-16 w-16 rounded object-cover"
                  />
                )}
                <div className="ml-4">
                  <h4 className="font-bold">
                    {item.product?.name || "Unknown Product"}
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
            ))
          )}
          <div className="mt-4 font-bold">
            Total: $
            {cartItems
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </div>
        </div>
      </animated.div>
      <div
        ref={buttonRef}
        className={`fixed bottom-4 left-0 z-50 ml-2 transition-transform duration-300 ${
          isOpen ? "translate-x-64" : "translate-x-0"
        }`}
      >
        <button
          className="rounded bg-blue-500 px-2 py-1 text-white focus:outline-none"
          onClick={toggleCart}
        >
          <FaShoppingCart className="mr-1 inline" />
          {isOpen ? "<" : ">"}
        </button>
      </div>
    </div>
  );
};

export default CartComponent;
