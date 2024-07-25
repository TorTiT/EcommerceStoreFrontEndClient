import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { fetchRecommendations } from "../../redux/slices/recommendationsSlice";
import {
  selectRecommendations,
  selectRecommendationsStatus,
  selectRecommendationsError,
} from "../../redux/selectors/recommendationsSelectors";
import ProductCard from "../ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CatalogRecommendations = ({ userId }) => {
  const dispatch = useDispatch();
  const recommendations = useSelector(selectRecommendations) || [];
  const status = useSelector(selectRecommendationsStatus);
  const error = useSelector(selectRecommendationsError);

  useEffect(() => {
    if (userId) {
      dispatch(fetchRecommendations(userId));
    }
  }, [dispatch, userId]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed")
    return (
      <div>
        Error: {typeof error === "object" ? JSON.stringify(error) : error}
      </div>
    );

  return (
    <div className="catalog-recommendations mt-6 rounded bg-white p-4 shadow-md">
      <h2 className="mb-4 text-lg font-bold text-gray-700">
        Recommended Products
      </h2>
      {recommendations.length === 0 ? (
        <p>No recommendations available.</p>
      ) : (
        <Slider {...settings}>
          {recommendations.map((product) => (
            <div key={product._id} className="p-2">
              <div className="flex items-center rounded bg-gray-100 p-2 shadow">
                {product.images?.[0] && (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="mr-2 h-12 w-12 object-cover"
                  />
                )}
                <div className="flex-grow">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-600">${product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default CatalogRecommendations;
