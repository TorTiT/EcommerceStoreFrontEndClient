import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchProductById } from "../redux/slices/productsSlice";
import { addItemToCartRequest } from "../redux/slices/cartSlice";

const ProductPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.user?._id);
  const product = useSelector((state) =>
    state.products.products.find((p) => p._id === productId),
  );
  const deals = useSelector((state) => state.deals.deals);
  const categories = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.products.status);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId, product]);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.size[0]);
      setSelectedColor(product.color);
    }
  }, [product]);

  const deal = deals.find((deal) => deal.product._id === productId);
  const productPrice = deal ? deal.dealPrice : product?.price;

  const category = categories.find((cat) => cat._id === product?.category);

  const handleAddToCart = () => {
    if (!userId) {
      alert("Please log in to add items to your cart");
      return;
    }

    dispatch(
      addItemToCartRequest({
        userId,
        itemDetails: {
          productId: product._id,
          price: productPrice,
          quantity: 1,
          size: selectedSize,
          color: selectedColor,
          productDetails: product,
        },
      }),
    );

    toast.success(`${product.name} has been added to your cart!`);
  };

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

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error loading product</p>;

  return (
    <div className="container mx-auto p-4">
      {product ? (
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full rounded-lg bg-gray-200 p-4 shadow-md md:w-1/2">
            <div className="flex items-center justify-center">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="object-contain"
                style={{ maxHeight: "80vh", width: "100%" }}
              />
            </div>
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
          <div className="mt-4 w-full rounded-lg bg-gray-100 p-4 shadow-md md:ml-4 md:mt-0 md:w-1/2">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="mt-2">{product.description}</p>
            {deal ? (
              <div>
                <p className="text-lg font-bold text-red-500">
                  ${deal.dealPrice}
                </p>
                <p className="text-sm line-through">${product.price}</p>
              </div>
            ) : (
              <p className="mt-2 text-lg font-bold">${product.price}</p>
            )}
            <div className="mt-2">
              <label className="block text-gray-700">Size:</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full rounded border p-2"
              >
                {product.size.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-2">
              <label className="block text-gray-700">Color:</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full rounded border p-2"
              >
                {product.color.split(", ").map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-2">
              <label className="block text-gray-700">Category:</label>
              <p>{category?.name}</p>
            </div>
            <button
              onClick={handleAddToCart}
              className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductPage;
