import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import { clearCart } from "../../redux/slices/cartSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
  };

  return (
    <button
      onClick={handleLogout}
      className="transform rounded border-l-indigo-800 p-2 text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-sky-800"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
