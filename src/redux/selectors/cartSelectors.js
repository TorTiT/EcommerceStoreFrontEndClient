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

// Selector to get cart items with product details directly from the cart state
export const selectCartItemsWithDetails = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.map((item) => ({
      ...item,
      productDetails: item.product, // Use the product field directly
    })),
);
