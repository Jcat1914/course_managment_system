import React from "react";
import KeiserLogo from "../Logos/KeiserLogo";
import { LogoutButton } from "../Logout/LogoutButton";

const Header = () => {
  return (
    <header className="bg-blue-200 px-8">
      <nav className="flex justify-between items-center p-2">
        <div className="flex items-center gap-8">
          <KeiserLogo />
          <h1 className="text-lg font-mono">Course Scheduling System</h1>
        </div>
        <div>
          <LogoutButton />
        </div>
      </nav>
    </header >
  )
};

export default Header;
