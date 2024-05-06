import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "../../helpers/RoutesWithNotFound.jsx";
import { Navigate } from "react-router-dom";
import { PrivateRoutes } from "../../models/routes.js"
import { Dashboard } from "../../pages/private/Dashboard/Dashboard.jsx";
import { StudentDashboard } from "../../pages/private/Dashboard/StudentDashboard.jsx";
import { FacultyDashboard } from "../../pages/private/Dashboard/FacultyDashboard.jsx"
import { UserDashboard } from "./Dashboard/UserDashboard.jsx";
import { AddUserPage } from "./Pages/AddUserPage.jsx";
import { EditUserPage } from "./Pages/EditUserPage.jsx";
import { AddStudentPage } from "./Pages/addStudentPage.jsx";
import { TermDashboard } from "./Dashboard/TermDashboard.jsx";
import { BuildingDashboard } from "./Dashboard/BuildingRoomsDashboard.jsx";
import { ProgramDashboard } from "./Dashboard/ProgramDashboard.jsx";

export function Private() {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={PrivateRoutes.DASHBOARD} />} />
      <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} >
        <Route path={PrivateRoutes.STUDENT} element={<StudentDashboard />} />
        <Route path={PrivateRoutes.FACULTY} element={<FacultyDashboard />} />
        <Route path={PrivateRoutes.USER} element={<UserDashboard />} />
        <Route path={PrivateRoutes.BUILDING} element={<BuildingDashboard />} />
        <Route path={PrivateRoutes.PROGRAM} element={<ProgramDashboard />} />
        <Route path={`${PrivateRoutes.TERM}`} element={<TermDashboard />} />
        <Route path={`${PrivateRoutes.USER}/add`} element={<AddUserPage />} />
        <Route path={`${PrivateRoutes.USER}/edit/:id`} element={<EditUserPage />} />
        <Route path={`${PrivateRoutes.STUDENT}/add`} element={<AddStudentPage />} />
      </Route>
    </RoutesWithNotFound>
  )
}
