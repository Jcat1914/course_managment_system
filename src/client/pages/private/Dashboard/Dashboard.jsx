import React from "react";
import Header from "../../../component/Header/Header";
import { Outlet, Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <>
      <Header />
      <main>
        <ul className="bg-blue-50 flex gap-7 items-center justify-around">
          <li>Users</li>
          <li>Students</li>
          <li>Faculty</li>
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

