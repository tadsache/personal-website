"use client";

export default function ContactPanel() {
  const scrollUp = () => {
    const outer = document.querySelector(".vertical-scroll") as HTMLElement;
    if (outer) outer.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="snap-start flex-shrink-0 w-screen h-screen flex items-center justify-center relative">
      {/* Up hint */}
      <button
        onClick={scrollUp}
        aria-label="Back up"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "64px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          background: "none",
          border: "none",
          borderBottom: "1px solid var(--color-accent-subtle)",
          cursor: "pointer",
          gap: "1.2rem",
          opacity: 0.6,
          transition: "opacity 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
      >
        <div style={{ height: "1px", width: "24px", backgroundColor: "var(--color-accent-subtle)" }} />
        <span style={{ fontSize: "0.52rem", letterSpacing: "0.22em", color: "var(--color-accent)", textTransform: "uppercase", fontFamily: "'Space Mono', monospace" }}>
          ↑ &nbsp; back
        </span>
        <div style={{ height: "1px", width: "24px", backgroundColor: "var(--color-accent-subtle)" }} />
      </button>

      {/* Form */}
      <div style={{ width: "min(480px, 88vw)" }}>
        <p style={{ fontSize: "0.48rem", letterSpacing: "0.25em", color: "var(--color-accent)", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          get in touch
        </p>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--color-primary)", letterSpacing: "-0.03em", lineHeight: 1, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: "2.5rem" }}>
          Say hello.
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Field label="name" placeholder="your name" />
          <Field label="email" placeholder="your@email.com" type="email" />
          <Field label="message" placeholder="what's on your mind" multiline />
        </div>

        <button
          style={{
            marginTop: "2rem",
            width: "100%",
            padding: "0.8em 0",
            backgroundColor: "var(--color-primary)",
            color: "var(--color-bg)",
            border: "none",
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          send
        </button>
      </div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  multiline = false,
}: {
  label: string;
  placeholder: string;
  type?: string;
  multiline?: boolean;
}) {
  const sharedStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "1px solid var(--color-accent-subtle)",
    color: "var(--color-primary)",
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.7rem",
    letterSpacing: "0.04em",
    padding: "0.5em 0",
    outline: "none",
    resize: "none",
    transition: "border-color 0.2s ease",
  };

  return (
    <div>
      <p style={{ fontSize: "0.42rem", letterSpacing: "0.2em", color: "var(--color-primary-muted)", textTransform: "uppercase", marginBottom: "0.5rem" }}>
        {label}
      </p>
      {multiline ? (
        <textarea
          rows={4}
          placeholder={placeholder}
          style={{ ...sharedStyle, display: "block" }}
          onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--color-accent)")}
          onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--color-accent-subtle)")}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          style={sharedStyle}
          onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--color-accent)")}
          onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--color-accent-subtle)")}
        />
      )}
    </div>
  );
}
