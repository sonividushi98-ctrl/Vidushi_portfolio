import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition.jsx";

export default function NotFound() {
  return (
    <PageTransition>
      <section className="section not-found">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p className="muted">That route does not exist in this portfolio.</p>
        <Link className="btn btn-primary" to="/">
          Back to home
        </Link>
      </section>
    </PageTransition>
  );
}
