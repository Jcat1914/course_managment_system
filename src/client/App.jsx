import React from "react";
import "./App.css";
import { BrowserRouter, Route, Navigate } from "react-router-dom";
import { RoutesWithNotFound } from "./helpers/RoutesWithNotFound.jsx";
import { PublicRoutes } from "./models/routes";
import { PrivateRoutes } from "./models/routes";
import { Login } from "./pages/Login/Login.jsx";
import { AuthGuard } from "./guards/authGuard.jsx";
import { Private } from "./pages/private/Private.jsx"

function App() {
  return (
    <>
      <BrowserRouter>
        <RoutesWithNotFound>
          <Route path="/" element={<Navigate to={PrivateRoutes.PRIVATE} />} />
          <Route path={PublicRoutes.LOGIN} element={<Login />} />
          <Route element={<AuthGuard privateValidation={true} />}>
            <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
          </Route>
        </RoutesWithNotFound>
      </BrowserRouter >
    </>
  );
}

export default App;
