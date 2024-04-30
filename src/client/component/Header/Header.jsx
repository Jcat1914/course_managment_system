import React from "react";
import KeiserLogo from "../Logos/KeiserLogo";

const Header = () => {
  return (
    <header className="bg-gray-600 ">
      <div className="header">
        <KeiserLogo />
        <h1 className="text-lg font-mono">Course Registration System</h1>
      </div>
    </header>
  );
};

export default Header;
