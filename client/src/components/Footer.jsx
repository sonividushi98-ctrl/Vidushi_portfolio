import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiArrowUpRight } from "react-icons/fi";
import ContactForm from "./ContactForm.jsx";
import { profile, resumeLinks } from "../data/portfolioData.js";
import { usePrefersReducedMotion } from "../hooks/useReducedMotion.js";

export default function Footer() {
  const [formOpen, setFormOpen] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const nameRef = useRef(null);

  useEffect(() => {
    const openForm = () => setFormOpen(true);
    window.addEventListener("portfolio:open-contact", openForm);
    return () => window.removeEventListener("portfolio:open-contact", openForm);
  }, []);

  useEffect(() => {
    if (!formOpen) return undefined;
    const timer = window.setTimeout(
      () => nameRef.current?.focus({ preventScroll: true }),
      500
    );
    return () => window.clearTimeout(timer);
  }, [formOpen]);

  return (
    <footer className="site-footer" id="footer">
      <div className="footer-card">
        <div className="footer-card-inner">
          <h2 className="footer-heading">
            Ready to build
            <br />
            something great?
          </h2>
          <p className="footer-sub">Have a project in mind? Let's talk it through.</p>

          <AnimatePresence mode="wait" initial={false}>
            {formOpen ? (
              <motion.div
                key="footer-form"
                className="footer-form-wrap"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="footer-form-panel" id="footer-contact-form">
                  <div className="footer-form-head">
                    <p>Send me a message</p>
                    <button
                      type="button"
                      className="footer-form-close"
                      onClick={() => setFormOpen(false)}
                      aria-label="Close contact form"
                    >
                      <FiX aria-hidden="true" />
                    </button>
                  </div>
                  <ContactForm
                    nameRef={nameRef}
                    rows={4}
                    onSuccess={() => window.setTimeout(() => setFormOpen(false), 1200)}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="footer-cta"
                className="footer-cta"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <a
                  className="footer-btn-dark"
                  href={resumeLinks.pdf}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="footer-btn-dark-label">View CV</span>
                  <span className="footer-btn-arrow" aria-hidden="true">
                    <FiArrowUpRight />
                  </span>
                </a>

                <div className="footer-contact-col">
                  <button
                    type="button"
                    className="footer-btn-light"
                    onClick={() => setFormOpen(true)}
                    aria-expanded={formOpen}
                    aria-controls="footer-contact-form"
                  >
                    <span className="footer-ring-icon" aria-hidden="true" />
                    Contact me
                  </button>
                  <p className="footer-contact-note">Talk to me directly</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="footer-copyright">
        © {new Date().getFullYear()} {profile.name}. Built with the MERN stack.
      </p>
    </footer>
  );
}
