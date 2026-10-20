
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext.jsx";
import { profile } from "../data/portfolioData.js";

const links = [
  { to: "#home", label: "Home" },
  { to: "#projects", label: "Projects" },
  { to: "#journey", label: "Journey" },
  { to: "#achievements", label: "Achievements" },
  { to: "#contact", label: "Contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const sectionLink = (hash) => {
    if (location.pathname !== "/") {
      return `/${hash}`;
    }
    return hash;
  };

  const handleNavigation = (event, hash) => {
    setOpen(false);

    if (location.pathname === "/") {
      event.preventDefault();

      if (window.location.hash !== hash) {
        window.history.pushState(null, "", hash);
      }

      document.getElementById(hash.slice(1))?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a
          href="#home"
          className="brand"
          onClick={(event) => handleNavigation(event, "#home")}
        >
          {profile.initials}
        </a>

        <nav
          className={`nav-links ${open ? "open" : ""}`}
          aria-label="Primary"
        >
          {links.map((link) => (
            <a
              key={link.to}
              href={sectionLink(link.to)}
              className="nav-link"
              onClick={(event) => handleNavigation(event, link.to)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={
              theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>

          <button
            type="button"
            className="icon-btn menu-toggle"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
}