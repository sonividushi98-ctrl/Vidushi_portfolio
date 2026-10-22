import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import PageTransition from "../components/PageTransition.jsx";
import { projectFilters, projects } from "../data/portfolioData.js";
import { usePrefersReducedMotion } from "../hooks/useReducedMotion.js";

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const reduceMotion = usePrefersReducedMotion();

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.tech.includes(filter)),
    [filter]
  );

  return (
    <PageTransition>
      <section className="section">
        {/* Heading — same style as About page */}
        <header className="section-title">
          <p className="eyebrow">Work</p>
          <h2>Projects</h2>
          <p className="muted">Filter by technology to explore the stack used in each project.</p>
        </header>

        <div className="filter-bar" role="tablist" aria-label="Filter projects by technology">
          {projectFilters.map((tag) => (
            <button
              key={tag}
              type="button"
              className={filter === tag ? "chip active" : "chip"}
              onClick={() => setFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="cards-grid">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.article
                layout={!reduceMotion}
                className="glass-card project-card"
                key={project.id}
                initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: 0.28 }}
              >
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="chip-row">
                  {project.tech.map((tag) => (
                    <span className="chip" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="project-actions">
                  <a
                    className="btn btn-ghost"
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub aria-hidden="true" />
                    GitHub
                  </a>
                  {project.live ? (
                    <a
                      className="btn btn-live"
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="live-dot" aria-hidden="true" />
                      Live
                      <FiExternalLink aria-hidden="true" />
                    </a>
                  ) : (
                    <button type="button" className="btn btn-disabled" disabled>
                      Live demo not available
                    </button>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </PageTransition>
  );
}
