import { Route, Routes } from "react-router-dom";
import React from "react";

export function RoutesWithNotFound({ children }) {
  return (
    <Routes>
      {children}
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}

