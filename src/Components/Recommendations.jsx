import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendations } from "../redux/slices/recommendationsSlice";
import {
  selectRecommendations,
  selectRecommendationsStatus,
  selectRecommendationsError,
} from "../redux/selectors/recommendationsSelectors";

const Recommendations = ({ userId, triggerUpdate }) => {
  const dispatch = useDispatch();
  const recommendations = useSelector(selectRecommendations);
  const status = useSelector(selectRecommendationsStatus);
  const error = useSelector(selectRecommendationsError);

  useEffect(() => {
    if (userId) {
      dispatch(fetchRecommendations(userId));
    }
  }, [dispatch, userId, triggerUpdate]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed")
    return (
      <div>
        Error: {typeof error === "object" ? JSON.stringify(error) : error}
      </div>
    );

  return (
    <div className="recommendations rounded bg-white p-4 shadow">
      <h2 className="mb-4 text-xl font-bold">Recommended Products</h2>
      <ul className="space-y-4">
        {recommendations.map((product) => (
          <li
            key={product._id}
            className="flex items-center rounded bg-gray-100 p-4 shadow"
          >
            {product.images?.[0] && (
              <img
                src={product.images[0]}
                alt={product.name}
                className="mr-4 h-16 w-16 object-cover"
              />
            )}
            <div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p>{product.description}</p>
              <p className="font-bold">${product.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
