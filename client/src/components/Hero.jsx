import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FiDownload } from "react-icons/fi";
import SocialLinks from "./SocialLinks.jsx";
import { profile, resumeLinks } from "../data/portfolioData.js";
import { usePrefersReducedMotion } from "../hooks/useReducedMotion.js";

export default function Hero() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="hero">
      <div className="hero-glow" aria-hidden="true" />
      <motion.div
        className="hero-copy"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="eyebrow">Hello, I am</p>
        <h1 className="hero-name">{profile.name}</h1>
        <p className="hero-role">
          {reduceMotion ? (
            profile.role
          ) : (
            <TypeAnimation
              sequence={[
                profile.typewriterRoles[0],
                1800,
                profile.typewriterRoles[1],
                1800,
                profile.typewriterRoles[2],
                1800,
              ]}
              wrapper="span"
              speed={46}
              repeat={Infinity}
            />
          )}
        </p>
        <p className="muted hero-status">{profile.status}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href={resumeLinks.pdf}>
            <FiDownload aria-hidden="true" />
            Download CV (PDF)
          </a>
          <a className="btn btn-ghost" href={resumeLinks.docx}>
            <FiDownload aria-hidden="true" />
            Download CV (Word)
          </a>
        </div>
        <SocialLinks />
      </motion.div>
    </section>
  );
}
