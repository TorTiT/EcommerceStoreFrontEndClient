import { createSelector } from "reselect";

// Basic input-selectors
const selectCart = (state) => state.cart;
const selectProducts = (state) => state.products.products;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.items,
);

export const selectCartStatus = createSelector(
  [selectCart],
  (cart) => cart.status,
);

export const selectCartError = createSelector(
  [selectCart],
  (cart) => cart.error,
);

// Selector to merge cart items with product details
export const selectCartItemsWithDetails = createSelector(
  [selectCartItems, selectProducts],
  (cartItems, products) =>
    cartItems.map((item) => {
      const productDetails = products.find(
        (product) => product._id === item.product,
      );
      return {
        ...item,
        productDetails: productDetails || {}, // Default to empty object if not found
      };
    }),
);
