import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import {
  education,
  extracurricular,
  internship,
} from "../data/portfolioData.js";
import { usePrefersReducedMotion } from "../hooks/useReducedMotion.js";

const items = [
  {
    title: education.degree,
    meta: `${education.institution} · ${education.years}`,
    body: education.detail,
  },
  {
    title: internship.title,
    meta: internship.organization,
    body: internship.description,
  },
  ...extracurricular.map((item) => ({
    title: item.title,
    meta: item.year,
    body: item.description,
  })),
];

export default function Journey() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <PageTransition>
      <section className="section">
        <SectionTitle
          eyebrow="Path"
          title="Education & experience"
          subtitle="A vertical timeline of study, faculty-guided internship work, and campus roles."
        />
        <ol className="timeline">
          {items.map((item, index) => (
            <motion.li
              key={item.title}
              className="timeline-item"
              initial={reduceMotion ? false : { opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="timeline-dot" aria-hidden="true" />
              <article className="glass-card">
                <h3>{item.title}</h3>
                <p className="eyebrow">{item.meta}</p>
                <p>{item.body}</p>
              </article>
            </motion.li>
          ))}
        </ol>
      </section>
    </PageTransition>
  );
}
