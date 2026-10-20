export default function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <header className="section-title">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {subtitle ? <p className="muted">{subtitle}</p> : null}
    </header>
  );
}
