import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Pas de vérification — on redirige directement
    navigate("/inventaire");
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="gradient-circle circle-1"></div>
        <div className="gradient-circle circle-2"></div>
        <div className="gradient-circle circle-3"></div>
      </div>
      
      <div className="login-container">
        <div className="login-header">
          <div className="logo-circle">🚗</div>
          <h2>Bienvenue !</h2>
          <p className="subtitle">Connectez-vous à votre compte</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Nom d'utilisateur</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                placeholder="Entrez votre nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="input-group">
            <label>Mot de passe</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Se souvenir de moi</span>
            </label>
            <a href="#" className="forgot-password">Mot de passe oublié ?</a>
          </div>
          
          <button type="submit" className="btn-submit">
            Se connecter
          </button>
        </form>
        
        <div className="divider">
          <span>OU</span>
        </div>
        
        <div className="social-login">
          <button className="btn-social google">
            <span>🔵</span> Google
          </button>
          <button className="btn-social github">
            <span>⚫</span> GitHub
          </button>
        </div>
        
        <p className="auth-footer">
          Pas encore de compte ? <Link to="/register">Créer un compte</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
