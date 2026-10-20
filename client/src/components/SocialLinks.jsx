import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { socials } from "../data/portfolioData.js";

const icons = {
  github: FaGithub,
  linkedin: FaLinkedin,
  email: FaEnvelope,
};

export default function SocialLinks({ className = "" }) {
  return (
    <div className={`social-row ${className}`.trim()}>
      {socials.map((item) => {
        const Icon = icons[item.id];
        return (
          <a
            key={item.id}
            href={item.href}
            target={item.id === "email" ? undefined : "_blank"}
            rel={item.id === "email" ? undefined : "noreferrer"}
            aria-label={item.label}
            className="icon-btn"
          >
            <Icon aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}
