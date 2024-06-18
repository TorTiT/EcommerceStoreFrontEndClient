import { createSelector } from "@reduxjs/toolkit";

// Basic selector to get the recommendations state
const selectRecommendationsState = (state) => state.recommendations;

// Selector to get the recommendations list
export const selectRecommendations = createSelector(
  [selectRecommendationsState],
  (recommendationsState) => recommendationsState.recommendations,
);

// Selector to get the status of the recommendations fetch
export const selectRecommendationsStatus = createSelector(
  [selectRecommendationsState],
  (recommendationsState) => recommendationsState.status,
);

// Selector to get any error that occurred during the fetch
export const selectRecommendationsError = createSelector(
  [selectRecommendationsState],
  (recommendationsState) => recommendationsState.error,
);
