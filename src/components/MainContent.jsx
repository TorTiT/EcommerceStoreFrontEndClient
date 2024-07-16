import React from "react";
import DealsOfTheDay from "./DealsOfTheDay";
import Recommendations from "./Recommendations";
import { useSelector } from "react-redux";

const MainContent = () => {
  const userId = useSelector((state) => state.auth.user?.user?._id);

  return (
    <div className="flex flex-grow flex-col items-center p-4">
      <div className="mb-4 w-full max-w-4xl bg-green-100 p-4 text-center">
        <h2 className="mb-2 text-2xl font-bold">Biggest Offer Revealed</h2>
        <p>More deals inside up to 50% off</p>
      </div>
      <div className="w-full max-w-4xl bg-gray-100 p-4 text-center">
        <h2 className="mb-4 text-xl font-bold">Deals of the Day</h2>
        <DealsOfTheDay />
      </div>
      <div className="w-full max-w-4xl pt-4">
        <Recommendations userId={userId} />
      </div>
    </div>
  );
};

export default MainContent;
