import { useState } from "react";
import logo from "../img/logo-color.svg";

function Navbar({ activePage, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavigation = (page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="site-navbar-wrapper">
      <nav className="site-navbar" aria-label="Main navigation">
        <button
          className="navbar-brand"
          type="button"
          onClick={() => handleNavigation("home")}
          aria-label="Go to home page"
        >
          <img src={logo} alt="Weather App logo" className="navbar-logo" />
          <span className="navbar-brand-text">Weather App</span>
        </button>

        <button
          className={`navbar-toggle ${isMenuOpen ? "navbar-toggle-open" : ""}`}
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-links ${isMenuOpen ? "navbar-links-open" : ""}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`navbar-link ${
                activePage === item.id ? "navbar-link-active" : ""
              }`}
              onClick={() => handleNavigation(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
