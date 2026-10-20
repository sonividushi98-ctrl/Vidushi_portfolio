import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import Journey from "./pages/Journey.jsx";
import Achievements from "./pages/Achievements.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const sectionId = location.hash.slice(1);

    if (sectionId) {
      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.hash]);

  return (
    <Layout>
      <AnimatePresence>
        <section id="home" className="portfolio-section">
          <Home />
        </section>

        <section id="journey" className="portfolio-section">
          <Journey />
        </section>

        <section id="projects" className="portfolio-section">
          <Projects />
        </section>

        <section id="achievements" className="portfolio-section">
          <Achievements />
        </section>

        <section id="contact" className="portfolio-section">
          <Contact />
        </section>
      </AnimatePresence>
    </Layout>
  );
}