import React, { useEffect, useMemo, useCallback, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartRequest,
  deleteCartItemRequest,
  updateCartItemRequest,
} from "../redux/slices/cartSlice";
import {
  selectCartItemsWithDetails,
  selectCartStatus,
  selectCartError,
} from "../redux/selectors/cartSelectors";
import { fetchAllProducts } from "../redux/slices/productsSlice";

const localActions = {
  SET_ITEMS: "SET_ITEMS",
  UPDATE_ITEM_QUANTITY: "UPDATE_ITEM_QUANTITY",
  REMOVE_ITEM: "REMOVE_ITEM",
  SET_ERROR: "SET_ERROR",
};

const localReducer = (state, action) => {
  switch (action.type) {
    case localActions.SET_ITEMS:
      return { ...state, items: action.payload };
    case localActions.UPDATE_ITEM_QUANTITY:
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.payload.itemId
            ? { ...item, quantity: action.payload.quantity }
            : item,
        ),
      };
    case localActions.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload.itemId),
      };
    case localActions.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const CartPage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.user?._id); // Get user ID from auth state

  const cartItemsWithDetails = useSelector(selectCartItemsWithDetails) || [];
  const status = useSelector(selectCartStatus);
  const error = useSelector(selectCartError);

  const [{ items: localItems, error: localError }, localDispatch] = useReducer(
    localReducer,
    {
      items: [],
      error: null,
    },
  );

  // Fetch products and cart data when the component mounts
  useEffect(() => {
    dispatch(fetchAllProducts());
    if (userId) {
      dispatch(fetchCartRequest(userId));
    }
  }, [dispatch, userId]);

  // Update local state when cart items with details are fetched
  useEffect(() => {
    if (cartItemsWithDetails.length > 0) {
      localDispatch({
        type: localActions.SET_ITEMS,
        payload: cartItemsWithDetails,
      });
    }
  }, [cartItemsWithDetails]);

  const handleRemoveItem = useCallback(
    (itemId) => {
      dispatch(deleteCartItemRequest({ userId, itemId })).then(() => {
        localDispatch({ type: localActions.REMOVE_ITEM, payload: { itemId } });
      });
    },
    [dispatch, userId],
  );

  const handleQuantityChange = useCallback(
    (itemId, quantity) => {
      if (quantity <= 0) {
        handleRemoveItem(itemId);
      } else {
        localDispatch({
          type: localActions.UPDATE_ITEM_QUANTITY,
          payload: { itemId, quantity },
        });
        dispatch(
          updateCartItemRequest({
            userId,
            itemId,
            updateDetails: { quantity },
          }),
        ).catch((error) => {
          const errorMessage =
            error.response?.data?.message ||
            "An error occurred while updating the item.";
          if (errorMessage === "Out of stock") {
            alert("This item is out of stock.");
          }
          localDispatch({
            type: localActions.SET_ERROR,
            payload: errorMessage,
          });
        });
      }
    },
    [dispatch, handleRemoveItem, userId],
  );

  const total = useMemo(() => {
    return localItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  }, [localItems]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") {
    const errorMessage =
      typeof error === "string" ? error : error?.message || "An error occurred";
    return <div>Error: {errorMessage}</div>;
  }

  // Filter out items without complete productDetails
  const validLocalItems = localItems.filter(
    (item) => item.productDetails && Object.keys(item.productDetails).length,
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="container mx-auto p-4">
        <h3 className="mb-4 text-2xl font-bold text-blue-600">Shopping Cart</h3>
        {localError && <div className="mb-4 text-red-500">{localError}</div>}
        {validLocalItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-items grid gap-4">
            {validLocalItems.map((item) => (
              <div
                key={item._id}
                className="cart-item flex items-center justify-between rounded bg-white p-4 shadow-md"
              >
                {item.productDetails.images?.[0] && (
                  <img
                    src={item.productDetails.images[0]}
                    alt={item.productDetails.name}
                    className="mr-4 h-16 w-16 object-cover"
                  />
                )}
                <div className="flex flex-1 items-center justify-between">
                  <div className="item-info">
                    <span className="text-lg font-semibold">
                      {item.productDetails.name}
                    </span>
                    <span className="block text-gray-500">${item.price}</span>
                    <div className="quantity-controls mt-2 flex items-center">
                      <button
                        className="mr-2 rounded bg-blue-500 px-2 py-1 text-white"
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        className="ml-2 rounded bg-blue-500 px-2 py-1 text-white"
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="total-price text-lg font-semibold">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
                <button
                  className="remove-item ml-4 rounded bg-red-500 px-3 py-1 text-white"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="cart-summary mt-6 rounded bg-white p-4 text-right shadow-md">
          <span className="text-xl font-bold">Total: ${total}</span>
          <button className="checkout-btn ml-4 rounded bg-green-500 px-4 py-2 text-white">
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
