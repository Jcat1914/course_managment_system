import { Route } from "react-router-dom";
import RoutesWithNotFound from "../../helpers/RoutesWithNotFound";
import { Navigate } from "react-router-dom";
import { PrivateRoutes } from "../../config/routes";
import { Dashboard } from "..";

function Private() {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={PrivateRoutes.DASHBOARD} />} />
      <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
    </RoutesWithNotFound>
  )
}
export default Private
