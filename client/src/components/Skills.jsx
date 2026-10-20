import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle.jsx";
import { skills, softSkills } from "../data/portfolioData.js";
import { usePrefersReducedMotion } from "../hooks/useReducedMotion.js";

function SkillBar({ name, level, active }) {
  return (
    <div className="skill-row">
      <div className="skill-label">
        <span>{name}</span>
        <span>{level}%</span>
      </div>
      <div
        className="skill-track"
        title={`${name}: ${level}% proficiency`}
        aria-label={`${name} proficiency ${level} percent`}
      >
        <div
          className="skill-fill"
          style={{ width: active ? `${level}%` : "0%" }}
        />
        <span className="skill-tooltip">{level}% proficiency</span>
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setActive(true);
      return undefined;
    }

    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (node) observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <section className="section" id="skills" ref={ref}>
      <SectionTitle eyebrow="Skills" title="What I work with" />
      <div className="skills-grid">
        {Object.entries(skills).map(([group, items]) => (
          <article className="glass-card" key={group}>
            <h3>{group}</h3>
            {items.map((skill) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                active={active}
              />
            ))}
          </article>
        ))}
      </div>
      <div className="soft-skills">
        <h3>Soft skills</h3>
        <div className="chip-row">
          {softSkills.map((skill) => (
            <span className="chip" key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
