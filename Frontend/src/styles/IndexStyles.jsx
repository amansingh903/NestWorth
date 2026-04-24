export default function IndexStyles() {
  return (
    <style>{`
      /* GLOBAL RESET */
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      html, body, #root {
        height: 100%;
      }

      img {
        display: block;
        max-width: 100%;
      }

      button {
        font: inherit;
      }

      a {
        color: inherit;
      }

      /* CSS VARIABLES */
      :root {
        --ink: #0f172a;
        --ink-2: #334155;
        --ring: #e5e7eb;
        --bg: #ffffff;
      }

      /* BODY BASE STYLE */
      body {
        font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
        color: var(--ink);
        background: #ffffff;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    `}</style>
  );
}
