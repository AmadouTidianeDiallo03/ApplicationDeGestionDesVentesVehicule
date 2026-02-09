import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Inventaire from "./pages/Inventaire";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inventaire" element={<Inventaire />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
