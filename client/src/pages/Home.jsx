import PageTransition from "../components/PageTransition.jsx";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Skills from "../components/Skills.jsx";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <About />
      <Skills />
    </PageTransition>
  );
}
