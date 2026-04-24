export default function SectionHeader({ title, subtitle }) {
  return (
    <section className="section-header">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </section>
  );
}
