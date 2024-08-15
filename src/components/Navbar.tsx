import React from 'react';
import "../styles/Navbar.css"; // Corregido el path

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/" className="navbar-title">Nasa Space Arequipa</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/" className="navbar-link">Inicio</a></li>
        <li><a href="/about" className="navbar-link">Acerca de</a></li>
        <li><a href="/contact" className="navbar-link">Contacto</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
