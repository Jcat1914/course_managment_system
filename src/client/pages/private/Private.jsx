import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "../../helpers/RoutesWithNotFound.jsx";
import { Navigate } from "react-router-dom";
import { PrivateRoutes } from "../../models/routes.js"
import { Dashboard } from "../../pages/private/Dashboard/Dashboard.jsx";
import { StudentDashboard } from "../../pages/private/Dashboard/StudentDashboard.jsx";

export function Private() {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={PrivateRoutes.DASHBOARD} />} />
      <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} >
        <Route path={PrivateRoutes.STUDENT} element={<StudentDashboard />} />
      </Route>
    </RoutesWithNotFound>
  )
}
