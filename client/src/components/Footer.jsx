import SocialLinks from "./SocialLinks.jsx";
import { profile } from "../data/portfolioData.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with the MERN stack.
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
