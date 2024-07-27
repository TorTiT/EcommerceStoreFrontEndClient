import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, dealPrice }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className="relative flex h-96 flex-col rounded border bg-white p-4 shadow-lg">
      <div className="relative h-48 flex-shrink-0">
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="h-full w-full object-cover"
        />
        {product.images.length > 1 && (
          <>
            <button
              onClick={handlePreviousImage}
              className="absolute left-0 top-1/2 -translate-y-1/2 transform bg-gray-800 px-2 py-1 text-white"
            >
              &lt;
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-0 top-1/2 -translate-y-1/2 transform bg-gray-800 px-2 py-1 text-white"
            >
              &gt;
            </button>
          </>
        )}
      </div>
      <div className="flex-grow overflow-hidden">
        <h2 className="mt-2 truncate text-xl font-bold">{product.name}</h2>
        <p className="truncate">{product.description}</p>
      </div>
      <div>
        {dealPrice ? (
          <div>
            <p className="text-lg font-bold text-red-500">${dealPrice}</p>
            <p className="text-sm line-through">${product.price}</p>
          </div>
        ) : (
          <p className="text-lg font-bold">${product.price}</p>
        )}
      </div>
      <Link
        to={`/product/${product._id}`}
        className="mt-2 block rounded bg-blue-500 px-4 py-2 text-center text-white"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
