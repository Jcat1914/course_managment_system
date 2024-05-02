import React from "react"
import { logout } from "../../services/authService.js";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../models/routes.js";
export const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await logout()
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true })
  };
  return (
    <button onClick={handleLogout} className="bg-blue-500 text-white p-2 rounded-md">
      Logout
    </button>
  );
}
