import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../redux/slices/productsSlice";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (query.length > 0) {
      const filtered = products
        .filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 5); // Limit to first 5 products
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [query, products]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(query)); // Dispatch the search query to the Redux store
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-full border border-gray-300 p-3 text-gray-900 focus:border-blue-500 focus:outline-none"
        />
      </form>
      {filteredProducts.length > 0 && (
        <div className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg">
          {filteredProducts.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200"
              onClick={() => setQuery("")} // Clear the query on product selection
            >
              {product.images && product.images[0] && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="mr-2 h-8 w-8 rounded-full object-cover"
                />
              )}
              <span>{product.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
