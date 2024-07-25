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
    <button onClick={handleLogout} className="rounded p-2 text-white">
      Logout
    </button>
  );
};

export default LogoutButton;
