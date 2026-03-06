export default function HeroPanel() {
  return (
    <section
      className="snap-start flex-shrink-0 w-screen h-screen flex flex-col items-center justify-center relative"
    >
      <div className="flex flex-col items-start gap-5 animate-fade-in">
        <h1
          style={{
            fontSize: "clamp(3rem, 8vw, 7.5rem)",
            color: "#017CC3",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            fontWeight: 700,
            fontFamily: "monospace",
          }}
        >
          Tade Heldt
        </h1>
        <p
          style={{
            fontSize: "clamp(0.65rem, 1vw, 0.85rem)",
            color: "#FFE9D2",
            backgroundColor: "#017CC3",
            letterSpacing: "0.1em",
            fontWeight: 400,
            padding: "0.3em 0.7em",
          }}
        >
          i write code. i run loops.
        </p>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute right-10 bottom-10 flex items-center gap-2"
        style={{
          color: "#ADD4E5",
          opacity: 0.8,
          fontSize: "0.65rem",
          letterSpacing: "0.15em",
        }}
      >
        <span>run log</span>
        <span style={{ animation: "nudge 2.2s ease-in-out infinite" }}>→</span>
      </div>

      {/* Corner marker top-left */}
      <div
        className="absolute top-10 left-10"
        style={{
          fontSize: "0.6rem",
          letterSpacing: "0.15em",
          color: "#ADD4E5",
          opacity: 0.8,
        }}
      >
        tade.dev
      </div>
    </section>
  );
}
