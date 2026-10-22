import PageTransition from "../components/PageTransition.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import ContactForm from "../components/ContactForm.jsx";
import { profile } from "../data/portfolioData.js";

export default function Contact() {
  return (
    <PageTransition>
      <section className="section contact">
        <SectionTitle
          eyebrow="Let's talk"
          title="Contact"
          subtitle={`Write to ${profile.email}. I read every message.`}
        />
        <div className="glass-card">
          <ContactForm rows={6} />
        </div>
      </section>
    </PageTransition>
  );
}
