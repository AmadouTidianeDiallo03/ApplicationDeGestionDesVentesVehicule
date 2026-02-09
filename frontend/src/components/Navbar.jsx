import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/logo.png"; // tu pourras remplacer par ton vrai logo

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Pour le moment, on redirige simplement vers la page de connexion
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profil");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <h1 className="navbar-title">Gestion des Stocks</h1>
      </div>

      <div className="navbar-right">
        <button className="navbar-btn" onClick={handleProfile}>
          Profil
        </button>
        <button className="navbar-btn logout" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
