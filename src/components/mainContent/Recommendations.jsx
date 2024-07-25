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

const Recommendations = ({ userId, triggerUpdate }) => {
  const dispatch = useDispatch();
  const recommendations = useSelector(selectRecommendations) || [];
  const status = useSelector(selectRecommendationsStatus);
  const error = useSelector(selectRecommendationsError);

  useEffect(() => {
    if (userId) {
      dispatch(fetchRecommendations(userId));
    }
  }, [dispatch, userId, triggerUpdate]);

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
    <div className="recommendations rounded bg-white p-4 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Recommended Products</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations available.</p>
      ) : (
        <Slider {...settings}>
          {recommendations.map((product) => (
            <div key={product._id} className="p-2">
              <ProductCard product={product} showDescription={false} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Recommendations;
