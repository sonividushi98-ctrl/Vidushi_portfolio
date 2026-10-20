import { FaAward, FaLaptopCode } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import PageTransition from "../components/PageTransition.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import { certifications } from "../data/portfolioData.js";

const icons = {
  Coursera: FaLaptopCode,
  LNMIIT: FaAward,
};

export default function Achievements() {
  return (
    <PageTransition>
      <section className="section">
        <SectionTitle
          eyebrow="Proof of work"
          title="Certifications & achievements"
        />
        <div className="cards-grid">
          {certifications.map((item) => {
            const Icon = icons[item.platform] || FaAward;
            return (
              <article className="glass-card cert-card" key={item.id}>
                <div className="cert-icon" aria-hidden="true">
                  <Icon />
                </div>
                <h3>{item.title}</h3>
                <p className="muted">
                  {item.platform} · {item.year}
                </p>
                <a
                  className="btn btn-primary"
                  href={item.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FiExternalLink aria-hidden="true" />
                  Verify
                </a>
              </article>
            );
          })}
        </div>
      </section>
    </PageTransition>
  );
}
