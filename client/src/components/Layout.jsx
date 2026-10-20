import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
