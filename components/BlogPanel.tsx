"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { posts, type Post, type Run } from "@/data/posts";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const MAX_BAR_HEIGHT = 80;
const ROW_HEIGHT = 22;

export default function BlogPanel() {
  const [activeWeek, setActiveWeek] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToWeek = useCallback((week: number) => {
    const index = posts.findIndex((p) => p.week === week);
    const section = sectionRefs.current[index];
    if (section && contentRef.current) {
      contentRef.current.scrollTo({ top: section.offsetTop, behavior: "smooth" });
    }
  }, []);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      const next = activeWeek + dir;
      if (next >= 0 && next <= 21) scrollToWeek(next);
    },
    [activeWeek, scrollToWeek]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") { e.preventDefault(); navigate(1); }
      if (e.key === "ArrowUp") { e.preventDefault(); navigate(-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const onScroll = () => {
      const trigger = container.scrollTop + container.clientHeight / 3;
      let active = 0;
      for (let i = 0; i < sectionRefs.current.length; i++) {
        const ref = sectionRefs.current[i];
        if (ref && ref.offsetTop <= trigger) active = posts[i].week;
        else break;
      }
      setActiveWeek(active);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="snap-start flex-shrink-0 w-screen h-screen flex overflow-hidden">
      <div style={{ width: "180px", flexShrink: 0, borderRight: "1px solid var(--color-accent-subtle)" }}>
        <Timeline activeWeek={activeWeek} onSelect={scrollToWeek} />
      </div>

      <div ref={contentRef} className="flex-1 overflow-y-auto">
        {posts.map((post, i) => (
          <div
            key={post.week}
            ref={(el) => { sectionRefs.current[i] = el; }}
            style={{
              minHeight: "70vh",
              padding: "4rem",
              borderBottom: "1px solid var(--color-accent-subtle)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <PostContent post={post} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Timeline({
  activeWeek,
  onSelect,
}: {
  activeWeek: number;
  onSelect: (week: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const index = posts.findIndex((p) => p.week === activeWeek);
    const dot = dotRefs.current[index];
    if (!container || !dot) return;

    const targetTop = dot.offsetTop - container.clientHeight / 3;
    container.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
  }, [activeWeek]);

  return (
    <div
      ref={containerRef}
      className="timeline-scroll h-full overflow-y-auto"
      style={{ paddingLeft: "48px", paddingRight: "24px", paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="relative flex flex-col items-start">
        <div
          className="absolute top-0 bottom-0"
          style={{ left: "4px", width: "1px", backgroundColor: "var(--color-accent-subtle)" }}
        />

        {posts.map((post, i) => {
          const isActive = post.week === activeWeek;
          const isPublished = post.published;

          return (
            <button
              key={post.week}
              ref={(el) => { dotRefs.current[i] = el; }}
              onClick={() => onSelect(post.week)}
              className="flex items-center gap-3 relative"
              style={{ height: `${ROW_HEIGHT}px`, cursor: "pointer", background: "none", border: "none", padding: 0 }}
            >
              <div
                style={{
                  width: isActive ? "14px" : "11px",
                  height: isActive ? "14px" : "11px",
                  borderRadius: "50%",
                  backgroundColor: isActive ? "var(--color-primary)" : isPublished ? "var(--color-accent)" : "transparent",
                  border: `1.5px solid ${isActive ? "var(--color-primary)" : isPublished ? "var(--color-accent)" : "var(--color-accent-subtle)"}`,
                  flexShrink: 0,
                  zIndex: 1,
                  transition: "all 0.2s ease",
                }}
              />
              <span
                style={{
                  fontSize: "0.58rem",
                  letterSpacing: "0.1em",
                  color: isActive || isPublished ? "var(--color-primary)" : "var(--color-primary-muted)",
                  transition: "color 0.2s ease",
                }}
              >
                {post.week === 0 ? "intro" : `W${String(post.week).padStart(2, "0")}`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PostContent({ post }: { post: Post }) {
  if (post.week === 0) {
    return (
      <div style={{ maxWidth: "620px" }}>
        <div style={{ borderBottom: "1px solid var(--color-accent-subtle)", paddingBottom: "2rem", marginBottom: "2.5rem" }}>
          <p style={{ fontSize: "0.58rem", letterSpacing: "0.2em", color: "var(--color-accent)", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            THE PROJECT &nbsp;&nbsp; {post.date}
          </p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--color-primary)", lineHeight: 1, letterSpacing: "-0.03em", fontWeight: 700 }}>
            Backyard Ultra
          </h2>
        </div>
        <div style={{ fontSize: "0.82rem", lineHeight: "1.95", color: "var(--color-primary)", opacity: 0.8, whiteSpace: "pre-line" }}>
          {post.content}
        </div>
      </div>
    );
  }

  if (!post.published) {
    return (
      <div style={{ opacity: 0.35 }}>
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--color-accent)", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          WEEK {post.week} OF 21
        </p>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--color-primary)", lineHeight: 1, letterSpacing: "-0.03em", fontWeight: 700 }}>
          Week {post.week}
        </h2>
        <p style={{ fontSize: "0.8rem", color: "var(--color-primary)", marginTop: "2rem", letterSpacing: "0.05em" }}>
          still running.
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "620px" }}>
      <div style={{ borderBottom: "1px solid var(--color-accent-subtle)", paddingBottom: "2rem", marginBottom: "2.5rem" }}>
        <p style={{ fontSize: "0.58rem", letterSpacing: "0.2em", color: "var(--color-accent)", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          WEEK {post.week} OF 21 &nbsp;&nbsp; {post.date}
        </p>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--color-primary)", lineHeight: 1, letterSpacing: "-0.03em", fontWeight: 700 }}>
          Week {post.week}
        </h2>
      </div>

      <WeekCalendar runs={post.runs} />

      <div style={{ fontSize: "0.82rem", lineHeight: "1.95", color: "var(--color-primary)", opacity: 0.8, whiteSpace: "pre-line", marginTop: "2.5rem" }}>
        {post.content}
      </div>
    </div>
  );
}

function WeekCalendar({ runs }: { runs: Run[] }) {
  const maxKm = Math.max(...runs.map((r) => r.km), 1);
  const totalKm = runs.reduce((sum, r) => sum + r.km, 0);
  const runMap = Object.fromEntries(runs.map((r) => [r.day, r]));

  return (
    <div className="flex items-end gap-10">
      <div className="flex items-end gap-4">
        {DAYS.map((day) => {
          const run = runMap[day];
          const km = run?.km ?? 0;
          const barH = km > 0 ? Math.max(8, (km / maxKm) * MAX_BAR_HEIGHT) : 0;
          const isLong = km === maxKm && km > 0;

          return (
            <div key={day} className="flex flex-col items-center gap-2">
              {/* Bar */}
              <div style={{ height: `${MAX_BAR_HEIGHT}px`, display: "flex", alignItems: "flex-end" }}>
                <div style={{
                  width: "20px",
                  height: `${barH}px`,
                  backgroundColor: isLong ? "var(--color-primary)" : "var(--color-accent)",
                  transition: "height 0.3s ease",
                }} />
              </div>

              {/* km */}
              {km > 0 && (
                <span style={{ fontSize: "0.55rem", color: "var(--color-primary)", letterSpacing: "0.04em", fontWeight: 700 }}>
                  {km}km
                </span>
              )}

              {/* Pace */}
              {run?.pace && (
                <span style={{ fontSize: "0.5rem", color: "var(--color-accent)", letterSpacing: "0.04em" }}>
                  {run.pace}
                </span>
              )}

              {/* Heart rate */}
              {run?.hr && (
                <span style={{ fontSize: "0.5rem", color: "var(--color-accent)", letterSpacing: "0.04em" }}>
                  ♥ {run.hr}
                </span>
              )}

              {/* Day label */}
              <span style={{ fontSize: "0.48rem", letterSpacing: "0.14em", color: km > 0 ? "var(--color-primary)" : "var(--color-accent-subtle)", opacity: km > 0 ? 0.45 : 1, textTransform: "uppercase" }}>
                {day}
              </span>
            </div>
          );
        })}
      </div>

      {/* Total */}
      <div style={{ paddingBottom: "1.4rem" }}>
        <p style={{ fontSize: "0.5rem", letterSpacing: "0.2em", color: "var(--color-accent)", textTransform: "uppercase", marginBottom: "0.2rem" }}>
          total
        </p>
        <p style={{ fontSize: "2.5rem", color: "var(--color-primary)", letterSpacing: "-0.03em", lineHeight: 1, fontWeight: 700 }}>
          {totalKm}
        </p>
        <p style={{ fontSize: "0.55rem", letterSpacing: "0.15em", color: "var(--color-accent)" }}>km</p>
      </div>
    </div>
  );
}
