import { useState } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiUser } from "react-icons/fi";
import SectionTitle from "./SectionTitle.jsx";
import { profile } from "../data/portfolioData.js";
import { usePrefersReducedMotion } from "../hooks/useReducedMotion.js";

export default function About() {
  const [photoFailed, setPhotoFailed] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="section about" id="about">
      <SectionTitle eyebrow="About" title="A bit about me" />
      <motion.div
        className="about-grid"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}
      >
        <div className="photo-wrap">
          {photoFailed ? (
            <div className="avatar-initials" aria-label={profile.name}>
              {profile.initials}
            </div>
          ) : (
            <img
              src={profile.photoSrc}
              alt={`Portrait of ${profile.name}`}
              onError={() => setPhotoFailed(true)}
            />
          )}
        </div>
        <div>
          <p className="bio">{profile.bio}</p>
          <ul className="meta-list">
            <li>
              <FiMapPin aria-hidden="true" />
              <span>{profile.location}</span>
            </li>
            <li>
              <FiUser aria-hidden="true" />
              <span>{profile.status}</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
