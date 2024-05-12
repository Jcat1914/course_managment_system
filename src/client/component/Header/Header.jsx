import React from "react";
import KeiserLogo from "../Logos/KeiserLogo";
import { LogoutButton } from "../Logout/LogoutButton";
import { PrivateRoutes } from "../../models/routes";
import { Link } from "react-router-dom";

function Header({ onClick, dashboardText, role }) {
  return (
    <header className="bg-blue-200 px-8">
      <nav className="flex justify-between items-center p-2">
        <div className="flex items-center gap-8">
          <KeiserLogo />
          <h1 className="text-lg font-mono">Course Scheduling System</h1>
        </div>
        <div className="flex gap-8 items-center">
          {role === 'admin' ? (
            <button onClick={onClick}><Link to={PrivateRoutes.ADMIN}>{dashboardText}</Link></button>
          ) : null}
          <LogoutButton />
        </div>
      </nav>
    </header >
  )
};

export default Header;
