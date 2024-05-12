import React, { useState } from "react";
import Header from "../../../component/Header/Header";
import { Outlet, Link } from "react-router-dom";
import { PrivateRoutes } from "../../../models/routes";
import { useLoggedUserStore } from "../../../stores/loggedUserStore";

export const Dashboard = () => {
  // element to be rendered in the list of actions
  const [showAdminActions, setShowAdminActions] = useState(false)
  const [dashboardText, setDashboardText] = useState("Admin Dashboard")

  const { user } = useLoggedUserStore()

  const prefix = "/private/Dashboard"
  function onClick() {
    if (dashboardText === "Admin Dashboard") {
      setDashboardText("Registrar Dashboard")
      setShowAdminActions(true)
      return
    } else {
      setDashboardText("Admin Dashboard")
      setShowAdminActions(false)
    }
  }
  return (
    <>
      <Header onClick={onClick} dashboardText={dashboardText} role={user.role} />
      <main className="min-h-screen">
        <ul className="bg-blue-50 flex gap-7 items-center justify-around p-2">
          {showAdminActions && user.role === 'admin' ? (
            <>
              <li><Link to={`${prefix}/Admin/${PrivateRoutes.USER}`} >User</Link></li>
              <li><Link to={`${prefix}/Admin/${PrivateRoutes.STUDENT}`} >Students</Link></li>
              <li><Link to={`${prefix}/Admin/${PrivateRoutes.FACULTY}`}>Faculty</Link></li>
              <li><Link to={`${prefix}/Admin/${PrivateRoutes.BUILDING}`}>Building</Link></li>
              <li><Link to={`${prefix}/Admin/${PrivateRoutes.PROGRAM}`}>Program</Link></li>
              <li><Link to={`${prefix}/Admin/${PrivateRoutes.COURSE}`}>Courses</Link></li>
              <li><Link to={`${prefix}/Admin/${PrivateRoutes.TERM}`}>Term</Link></li>
            </>)
            : (
              <li><Link to={`${prefix}/${PrivateRoutes.REGISTRAR}`}>Registrar</Link></li>
            )}
        </ul>
        <Outlet />
      </main>
    </>
  );
};

