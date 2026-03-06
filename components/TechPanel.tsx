"use client";

const projects = [
  {
    index: "01",
    name: "project-name",
    description: "Short description of what this project does and why it matters.",
    tags: ["TypeScript", "Next.js", "PostgreSQL"],
  },
  {
    index: "02",
    name: "project-name",
    description: "Another project — one line is enough to get the idea across.",
    tags: ["Python", "FastAPI", "Docker"],
  },
  {
    index: "03",
    name: "project-name",
    description: "Third project — what problem it solves, who uses it.",
    tags: ["Go", "Kubernetes", "GCP"],
  },
];

const stack: Record<string, string[]> = {
  languages: ["TypeScript", "Python", "Go", "SQL"],
  infra:     ["Docker", "Kubernetes", "GCP", "Heroku"],
  tools:     ["Next.js", "FastAPI", "PostgreSQL", "Redis"],
};

export default function TechPanel() {
  const scrollToHero = () => {
    const canvas = document.querySelector(".canvas-scroll") as HTMLElement;
    if (canvas) canvas.scrollTo({ left: window.innerWidth, behavior: "smooth" });
  };

  return (
    <section className="snap-start flex-shrink-0 w-screen h-screen relative overflow-hidden flex">
      {/* Main content */}
      <div
        className="flex-1 flex flex-col justify-center overflow-y-auto"
        style={{ padding: "clamp(2rem, 5vw, 4rem)", paddingRight: "2rem" }}
      >
        {/* Header */}
        <div style={{ marginBottom: "3rem", animation: "fade-in 0.7s ease 0.2s both" }}>
          <p style={{
            fontSize: "0.5rem",
            letterSpacing: "0.25em",
            color: "var(--color-accent)",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}>
            software engineer
          </p>
          <h2 style={{
            fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
            color: "var(--color-primary)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            fontWeight: 700,
            fontFamily: "'Space Mono', monospace",
          }}>
            tade heldt
          </h2>
        </div>

        {/* Projects */}
        <div style={{ marginBottom: "2.5rem" }}>
          <p style={{
            fontSize: "0.45rem",
            letterSpacing: "0.22em",
            color: "var(--color-primary-muted)",
            textTransform: "uppercase",
            marginBottom: "1rem",
            animation: "fade-in 0.7s ease 0.4s both",
          }}>
            work
          </p>

          {projects.map((p, i) => (
            <div
              key={p.index}
              style={{
                borderTop: "1px solid var(--color-accent-subtle)",
                paddingTop: "0.85rem",
                paddingBottom: "0.85rem",
                animation: `fade-in 0.7s ease ${0.5 + i * 0.1}s both`,
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.9rem", marginBottom: "0.3rem" }}>
                <span style={{
                  fontSize: "0.42rem",
                  color: "var(--color-primary-muted)",
                  letterSpacing: "0.1em",
                  fontFamily: "'Space Mono', monospace",
                  flexShrink: 0,
                }}>
                  {p.index}
                </span>
                <span style={{
                  fontSize: "0.82rem",
                  color: "var(--color-primary)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  fontFamily: "'Space Mono', monospace",
                }}>
                  {p.name}
                </span>
              </div>

              <p style={{
                fontSize: "0.58rem",
                color: "var(--color-primary)",
                opacity: 0.55,
                letterSpacing: "0.02em",
                marginLeft: "1.8rem",
                marginBottom: "0.55rem",
                lineHeight: 1.6,
              }}>
                {p.description}
              </p>

              <div style={{ display: "flex", gap: "0.35rem", marginLeft: "1.8rem", flexWrap: "wrap" }}>
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "0.4rem",
                      letterSpacing: "0.14em",
                      color: "var(--color-accent)",
                      border: "1px solid var(--color-accent-subtle)",
                      padding: "0.15em 0.55em",
                      textTransform: "uppercase",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div style={{ borderTop: "1px solid var(--color-accent-subtle)" }} />
        </div>

        {/* Stack */}
        <div style={{ animation: "fade-in 0.7s ease 0.9s both" }}>
          <p style={{
            fontSize: "0.45rem",
            letterSpacing: "0.22em",
            color: "var(--color-primary-muted)",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}>
            stack
          </p>

          {Object.entries(stack).map(([group, items]) => (
            <div
              key={group}
              style={{ display: "flex", gap: "1.2rem", marginBottom: "0.55rem", alignItems: "baseline" }}
            >
              <span style={{
                fontSize: "0.42rem",
                letterSpacing: "0.15em",
                color: "var(--color-primary-muted)",
                textTransform: "uppercase",
                width: "56px",
                flexShrink: 0,
              }}>
                {group}
              </span>
              <span style={{
                fontSize: "0.58rem",
                color: "var(--color-primary)",
                opacity: 0.65,
                letterSpacing: "0.04em",
                fontFamily: "'Space Mono', monospace",
              }}>
                {items.join(",  ")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right edge strip — points to hero */}
      <button
        onClick={scrollToHero}
        aria-label="Go to home"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "64px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "none",
          padding: 0,
          borderTop: "none",
          borderRight: "none",
          borderBottom: "none",
          borderLeft: "1px solid var(--color-accent-subtle)",
          cursor: "pointer",
          gap: "1.2rem",
          animation: "fade-in 0.7s ease 1.1s both",
          opacity: 0.6,
          transition: "opacity 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
      >
        <div style={{ flex: 1, width: "1px", backgroundColor: "var(--color-accent-subtle)" }} />

        <span style={{
          fontSize: "0.52rem",
          letterSpacing: "0.22em",
          color: "var(--color-accent)",
          textTransform: "uppercase",
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
        }}>
          home
        </span>

        <span style={{
          fontSize: "0.85rem",
          color: "var(--color-accent)",
          animation: "nudge 2.4s ease-in-out infinite",
          lineHeight: 1,
        }}>
          →
        </span>

        <div style={{ flex: 1, width: "1px", backgroundColor: "var(--color-accent-subtle)" }} />
      </button>
    </section>
  );
}
