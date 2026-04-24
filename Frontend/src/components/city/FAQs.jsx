export default function FAQs({ city }) {
  const faqs = [
    "How long does a project take?",
    "What is the starting price?",
    "Do you provide modular kitchens?",
    "Is design consultation free?",
    "What warranty do you provide?",
    "Can I customise designs fully?",
    "Do you handle execution end-to-end?"
  ];

  return (
    <section style={styles.wrap}>
      <h2>FAQs about Interior Design in {city}</h2>

      {faqs.map((q, i) => (
        <details key={i} style={styles.item}>
          <summary>{q}</summary>
          <p>
            Yes. Our designers guide you through a seamless, premium interior journey.
          </p>
        </details>
      ))}
    </section>
  );
}

const styles = {
  wrap: { padding: "90px 8%", background: "#f9fafc" },
  item: {
    background: "#fff",
    padding: 24,
    marginBottom: 18,
    borderRadius: 14,
    boxShadow: "0 15px 30px rgba(0,0,0,.1)"
  }
};
