import React from "react";
import Header from "../../../component/Header/Header";
import { Outlet, Link } from "react-router-dom";
import { PrivateRoutes } from "../../../models/routes";

export const Dashboard = () => {
  // element to be rendered in the list of actions
  const prefix = "/private/Dashboard"
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <ul className="bg-blue-50 flex gap-7 items-center justify-around p-2">
          <li><Link to={`${prefix}/${PrivateRoutes.USER}`} >User</Link></li>
          <li><Link to={`${prefix}/${PrivateRoutes.STUDENT}`} >Students</Link></li>
          <li><Link to={`${prefix}/${PrivateRoutes.FACULTY}`}>Faculty</Link></li>
          <li>Program</li>
          <li>Courses</li>
          <li>Rooms</li>
          <li>Terms</li>
        </ul>
        <Outlet />
      </main>
    </>
  );
};

