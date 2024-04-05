import "./App.css";
import RoutesWithNotFound from "./helpers/RoutesWithNotFound";
import { Login } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <RoutesWithNotFound>
          <Route path="/" element={<Login />} />jj



        </RoutesWithNotFound >
      </BrowserRouter>
    </>
  );
}

export default App;
