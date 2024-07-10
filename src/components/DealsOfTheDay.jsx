import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const DealsOfTheDay = () => {
  const deals = useSelector((state) => state.deals.deals);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {deals.map((deal) => (
        <ProductCard
          key={deal._id}
          product={deal.product}
          dealPrice={deal.dealPrice}
        />
      ))}
    </div>
  );
};

export default DealsOfTheDay;
