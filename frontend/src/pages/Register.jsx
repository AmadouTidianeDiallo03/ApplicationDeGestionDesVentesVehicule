import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";
import "../styles/register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    
    dispatch(registerUser({ username, email, password }));
    alert("Inscription réussie ! ✅");
    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="gradient-circle circle-1"></div>
        <div className="gradient-circle circle-2"></div>
        <div className="gradient-circle circle-3"></div>
      </div>
      
      <div className="register-container">
        <div className="register-header">
          <div className="logo-circle">🚗</div>
          <h2>Créer un compte</h2>
          <p className="subtitle">Rejoignez-nous dès aujourd'hui</p>
        </div>
        
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Nom d'utilisateur</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                placeholder="Choisissez un nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="3"
              />
            </div>
          </div>

          <div className="input-group">
            <label>Email</label>
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                type="email"
                placeholder="votre.email@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Créez un mot de passe sécurisé"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
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

          <div className="input-group">
            <label>Confirmer le mot de passe</label>
            <div className="input-wrapper">
              <span className="input-icon">🔐</span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Répétez votre mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" required />
              <span>J'accepte les conditions d'utilisation</span>
            </label>
          </div>
          
          <button type="submit" className="btn-submit">
            Créer mon compte
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
          Déjà un compte ? <Link to="/">Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
