import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ProductForm = ({ onSave, onDelete, isNew, initialProduct }) => {
  const [product, setProduct] = useState(initialProduct);
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    setProduct(initialProduct);
  }, [initialProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value.split(",") }));
  };

  const handleImageChange = (e, index) => {
    const newImages = [...product.images];
    newImages[index] = e.target.value;
    setProduct((prev) => ({ ...prev, images: newImages }));
  };

  const handleAddImageField = () => {
    setProduct((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const handleRemoveImageField = (index) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(product);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (onDelete) {
      onDelete(product._id);
    } else {
      console.error("Delete function not provided");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded bg-white p-4 shadow-md"
    >
      {product._id && <input type="hidden" name="_id" value={product._id} />}

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-bold font-medium text-gray-700"
        >
          Product Name
        </label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-bold font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-bold font-medium text-gray-700"
        >
          Price
        </label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-bold font-medium text-gray-700"
        >
          Category
        </label>
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          required
          className="w-full rounded border p-2"
        >
          <option value="">Select a Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="size"
          className="block text-sm font-bold font-medium text-gray-700"
        >
          Sizes (comma-separated)
        </label>
        <input
          type="text"
          name="size"
          value={product.size.join(",")}
          onChange={handleArrayChange}
          placeholder="Sizes (comma-separated)"
          required
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label
          htmlFor="color"
          className="block text-sm font-bold font-medium text-gray-700"
        >
          Color
        </label>
        <input
          type="text"
          name="color"
          value={product.color}
          onChange={handleChange}
          placeholder="Color"
          required
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label
          htmlFor="stock"
          className="block text-sm font-bold font-medium text-gray-700"
        >
          Stock
        </label>
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Stock"
          required
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label
          htmlFor="tags"
          className="block text-sm font-bold font-medium text-gray-700"
        >
          Tags (comma-separated)
        </label>
        <input
          type="text"
          name="tags"
          value={product.tags.join(",")}
          onChange={handleArrayChange}
          placeholder="Tags (comma-separated)"
          className="w-full rounded border p-2"
        />
      </div>

      <div className="space-y-2">
        {product.images.map((image, index) => (
          <div key={index} className="flex items-center space-x-2">
            <label className="block text-sm font-bold font-medium text-gray-700">
              Image URL {index + 1}
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => handleImageChange(e, index)}
              placeholder="Image URL"
              className="w-full rounded border p-2"
            />
            <button
              type="button"
              onClick={() => handleRemoveImageField(index)}
              className="rounded bg-red-500 px-4 py-2 text-white"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddImageField}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Add Image
        </button>
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="rounded bg-green-500 px-4 py-2 text-white"
        >
          {isNew ? "Add Product" : "Update Product"}
        </button>
        {!isNew && (
          <button
            type="button"
            onClick={handleDelete}
            className="rounded bg-red-500 px-4 py-2 text-white"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
