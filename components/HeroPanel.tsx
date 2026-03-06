"use client";

import { useCountUp } from "./CountUp";
import { posts } from "@/data/posts";

const totalKm = posts.filter(p => p.published).reduce((sum, p) => sum + p.runs.reduce((s, r) => s + r.km, 0), 0);
const totalHours = posts.filter(p => p.published).reduce((sum, p) => sum + p.hours, 0);

function LiveStat({ label, value, decimals = 0 }: { label: string; value: number; decimals?: number }) {
  const count = useCountUp(value, 1800, 1000);
  return (
    <div>
      <p style={{ fontSize: "0.45rem", letterSpacing: "0.2em", color: "var(--color-accent)", textTransform: "uppercase", marginBottom: "0.25rem" }}>
        {label}
      </p>
      <p style={{ fontSize: "1.4rem", color: "var(--color-primary)", letterSpacing: "-0.03em", lineHeight: 1, fontWeight: 700, fontFamily: "monospace" }}>
        {count.toFixed(decimals)}
      </p>
    </div>
  );
}

function DataNote({ label, value, align = "left" }: { label: string; value: string; align?: "left" | "right" }) {
  return (
    <div style={{ textAlign: align }}>
      <p style={{
        fontSize: "0.45rem",
        letterSpacing: "0.2em",
        color: "var(--color-accent)",
        textTransform: "uppercase",
        marginBottom: "0.25rem",
      }}>
        {label}
      </p>
      <p style={{
        fontSize: "0.58rem",
        letterSpacing: "0.14em",
        color: "var(--color-primary)",
        opacity: 0.45,
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}>
        {value}
      </p>
    </div>
  );
}

export default function HeroPanel() {
  const scrollToYards = () => {
    const canvas = document.querySelector(".canvas-scroll") as HTMLElement;
    if (canvas) canvas.scrollTo({ left: window.innerWidth, behavior: "smooth" });
  };

  return (
    <section
      className="snap-start flex-shrink-0 w-screen h-screen relative overflow-hidden flex items-center justify-center"
    >
      {/* Watermark */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          userSelect: "none",
          pointerEvents: "none",
          bottom: "-2rem",
          right: "4rem",
          top: "auto",
          left: "auto",
          transform: "none",
          whiteSpace: "nowrap",
          textAlign: "center",
          animation: "watermark-in 2s ease 0.1s both",
        }}
      >
        <div style={{
          fontSize: "clamp(5rem, 15vw, 18rem)",
          color: "var(--color-primary)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          fontWeight: 700,
          fontFamily: "monospace",
        }}>
          6.706km
        </div>
        <div style={{
          fontSize: "clamp(0.7rem, 1.6vw, 1.4rem)",
          color: "var(--color-primary)",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          fontFamily: "monospace",
          marginTop: "0.6em",
          fontWeight: 400,
        }}>
          on the hour, every hour
        </div>
      </div>

      {/* Main content — no width cap, let name breathe */}
      <div className="flex flex-col items-start gap-5 relative" style={{ zIndex: 1 }}>
        <h1
          style={{
            fontSize: "clamp(3rem, 8vw, 7.5rem)",
            color: "var(--color-primary)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            fontWeight: 700,
            fontFamily: "monospace",
            whiteSpace: "nowrap",
            animation: "fade-in 0.7s ease 0.3s both",
          }}
        >
          Tade Heldt
        </h1>
        <p
          style={{
            fontSize: "clamp(0.65rem, 1vw, 0.85rem)",
            color: "var(--color-bg)",
            backgroundColor: "var(--color-primary)",
            letterSpacing: "0.1em",
            padding: "0.3em 0.7em",
            animation: "fade-in 0.7s ease 0.5s both",
            transition: "background-color 0.3s ease, color 0.3s ease",
          }}
        >
          i write code. i run loops.
        </p>
      </div>

      {/* Corner data notes */}
      <div style={{ position: "absolute", top: "2.5rem", left: "2.5rem", animation: "fade-in 0.7s ease 0.7s both" }}>
        <DataNote label="training" value="28 weeks" />
      </div>

      <div style={{ position: "absolute", top: "2.5rem", right: "80px", animation: "fade-in 0.7s ease 0.8s both" }}>
        <DataNote label="format" value="Backyard Ultra" align="right" />
      </div>

      <div
        className="flex gap-8"
        style={{ position: "absolute", bottom: "2.5rem", left: "2.5rem", animation: "fade-in 0.7s ease 0.9s both" }}
      >
        <LiveStat label="km logged" value={totalKm} />
        <LiveStat label="hours" value={totalHours} decimals={1} />
      </div>

      <div style={{ position: "absolute", bottom: "2.5rem", right: "80px", animation: "fade-in 0.7s ease 1.0s both" }}>
        <DataNote label="goal" value="GO ONE MORE" align="right" />
      </div>

      {/* Right edge strip */}
      <button
        onClick={scrollToYards}
        aria-label="Go to the yards"
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

        <span
          style={{
            fontSize: "0.52rem",
            letterSpacing: "0.22em",
            color: "var(--color-accent)",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          the yards
        </span>

        <span
          style={{
            fontSize: "0.85rem",
            color: "var(--color-accent)",
            animation: "nudge 2.4s ease-in-out infinite",
            lineHeight: 1,
          }}
        >
          →
        </span>

        <div style={{ flex: 1, width: "1px", backgroundColor: "var(--color-accent-subtle)" }} />
      </button>

    </section>
  );
}
