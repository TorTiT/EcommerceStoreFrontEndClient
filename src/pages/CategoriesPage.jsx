import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../redux/slices/categorySlice";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(
    (state) => state.categories,
  );
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [editStatus, setEditStatus] = useState({});

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllCategories());
    }
  }, [status, dispatch]);

  const handleAddCategory = () => {
    if (newCategoryName && newCategoryDescription) {
      dispatch(
        addCategory({
          name: newCategoryName,
          description: newCategoryDescription,
        }),
      );
      setNewCategoryName("");
      setNewCategoryDescription("");
    }
  };

  const handleUpdateCategory = (id) => {
    const { name, description } = editStatus[id] || {};
    if (name && description) {
      dispatch(updateCategory({ id, updateData: { name, description } }));
      setEditStatus((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
  };

  const toggleEdit = (id) => {
    const category = categories.find((c) => c._id === id);
    if (editStatus[id]) {
      handleUpdateCategory(id);
    } else {
      setEditStatus({
        ...editStatus,
        [id]: { name: category.name, description: category.description },
      });
    }
  };

  const handleChange = (id, changes) => {
    setEditStatus((prev) => ({ ...prev, [id]: { ...prev[id], ...changes } }));
  };

  const renderCategories = () => {
    return categories.map((category) => (
      <div
        key={category._id}
        className="category-item mb-4 rounded bg-white p-4 shadow-md"
      >
        {editStatus[category._id] ? (
          <>
            <input
              className="category-input mb-2 w-full rounded border border-gray-300 p-2"
              type="text"
              value={editStatus[category._id].name}
              onChange={(e) =>
                handleChange(category._id, { name: e.target.value })
              }
            />
            <textarea
              className="category-textarea mb-2 w-full rounded border border-gray-300 p-2"
              value={editStatus[category._id].description}
              onChange={(e) =>
                handleChange(category._id, { description: e.target.value })
              }
            />
          </>
        ) : (
          <>
            <span className="text-lg font-bold">{category.name}</span>
            <p className="text-gray-600">{category.description}</p>
          </>
        )}
        <div className="flex space-x-2">
          <button
            className="edit-button rounded bg-blue-500 px-4 py-2 text-white"
            onClick={() => toggleEdit(category._id)}
          >
            {editStatus[category._id] ? "Save" : "Edit"}
          </button>
          <button
            className="delete-button rounded bg-red-500 px-4 py-2 text-white"
            onClick={() => handleDeleteCategory(category._id)}
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-3xl font-bold text-blue-600">
          Category Management
        </h1>
        {status === "loading" && <p className="text-yellow-600">Loading...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        <div className="category-form mb-6">
          <input
            className="category-input mb-2 w-full rounded border border-gray-300 p-2"
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="New category name"
          />
          <textarea
            className="category-textarea mb-2 w-full rounded border border-gray-300 p-2"
            value={newCategoryDescription}
            onChange={(e) => setNewCategoryDescription(e.target.value)}
            placeholder="Category description"
          />
          <button
            className="add-button rounded bg-green-500 px-4 py-2 text-white"
            onClick={handleAddCategory}
          >
            Add Category
          </button>
        </div>
        <div className="category-list">{renderCategories()}</div>
      </div>
    </div>
  );
};

export default CategoriesPage;
