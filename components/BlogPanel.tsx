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
      contentRef.current.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }
  }, []);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      const next = activeWeek + dir;
      if (next >= 0 && next <= 28) scrollToWeek(next);
    },
    [activeWeek, scrollToWeek]
  );

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") { e.preventDefault(); navigate(1); }
      if (e.key === "ArrowUp") { e.preventDefault(); navigate(-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  // Track active week via scroll — section becomes active when its top
  // crosses the 1/3 mark (matching where the timeline dot sits)
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const onScroll = () => {
      const trigger = container.scrollTop + container.clientHeight / 3;
      let active = 1;
      for (let i = 0; i < sectionRefs.current.length; i++) {
        const ref = sectionRefs.current[i];
        if (ref && ref.offsetTop <= trigger) active = i + 1;
        else break;
      }
      setActiveWeek(active);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="snap-start flex-shrink-0 w-screen h-screen flex overflow-hidden">
      {/* Timeline */}
      <div
        style={{
          width: "180px",
          flexShrink: 0,
          borderRight: "1px solid rgba(173, 212, 229, 0.4)",
        }}
      >
        <Timeline activeWeek={activeWeek} onSelect={scrollToWeek} />
      </div>

      {/* Continuous canvas */}
      <div ref={contentRef} className="flex-1 overflow-y-auto">
        {posts.map((post, i) => (
          <div
            key={post.week}
            ref={(el) => { sectionRefs.current[i] = el; }}
            style={{
              minHeight: "70vh",
              padding: "4rem",
              borderBottom: "1px solid rgba(173, 212, 229, 0.1)",
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
          style={{ left: "4px", width: "1px", backgroundColor: "rgba(173, 212, 229, 0.4)" }}
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
              style={{
                height: `${ROW_HEIGHT}px`,
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: 0,
              }}
            >
              <div
                style={{
                  width: isActive ? "14px" : "11px",
                  height: isActive ? "14px" : "11px",
                  borderRadius: "50%",
                  backgroundColor: isActive
                    ? "#017CC3"
                    : isPublished
                    ? "#ADD4E5"
                    : "transparent",
                  border: `1.5px solid ${
                    isActive
                      ? "#017CC3"
                      : isPublished
                      ? "#ADD4E5"
                      : "rgba(173, 212, 229, 0.3)"
                  }`,
                  flexShrink: 0,
                  zIndex: 1,
                  transition: "all 0.2s ease",
                }}
              />
              <span
                style={{
                  fontSize: "0.58rem",
                  letterSpacing: "0.1em",
                  color: isActive
                    ? "#017CC3"
                    : isPublished
                    ? "#017CC3"
                    : "rgba(1, 124, 195, 0.25)",
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
        <div style={{ borderBottom: "1px solid rgba(173, 212, 229, 0.35)", paddingBottom: "2rem", marginBottom: "2.5rem" }}>
          <p style={{ fontSize: "0.58rem", letterSpacing: "0.2em", color: "#ADD4E5", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            THE PROJECT &nbsp;·&nbsp; {post.date}
          </p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#017CC3", lineHeight: 1, letterSpacing: "-0.03em", fontWeight: 700 }}>
            Backyard Ultra
          </h2>
        </div>
        <div
          style={{
            fontSize: "0.82rem",
            lineHeight: "1.95",
            color: "#017CC3",
            opacity: 0.8,
            whiteSpace: "pre-line",
          }}
        >
          {post.content}
        </div>
      </div>
    );
  }

  if (!post.published) {
    return (
      <div style={{ opacity: 0.4 }}>
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "#ADD4E5", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          WEEK {post.week} OF 28
        </p>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#017CC3", lineHeight: 1, letterSpacing: "-0.03em", fontWeight: 700 }}>
          Week {post.week}
        </h2>
        <p style={{ fontSize: "0.8rem", color: "#017CC3", marginTop: "2rem", letterSpacing: "0.05em" }}>
          still running.
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "620px" }}>
      <div style={{ borderBottom: "1px solid rgba(173, 212, 229, 0.35)", paddingBottom: "2rem", marginBottom: "2.5rem" }}>
        <p style={{ fontSize: "0.58rem", letterSpacing: "0.2em", color: "#ADD4E5", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          WEEK {post.week} OF 28 &nbsp;·&nbsp; {post.date}
        </p>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#017CC3", lineHeight: 1, letterSpacing: "-0.03em", fontWeight: 700 }}>
          Week {post.week}
        </h2>
      </div>

      <WeekCalendar runs={post.runs} />

      <div
        style={{
          fontSize: "0.82rem",
          lineHeight: "1.95",
          color: "#017CC3",
          opacity: 0.8,
          whiteSpace: "pre-line",
          marginTop: "2.5rem",
        }}
      >
        {post.content}
      </div>
    </div>
  );
}

function WeekCalendar({ runs }: { runs: Run[] }) {
  const maxKm = Math.max(...runs.map((r) => r.km), 1);
  const totalKm = runs.reduce((sum, r) => sum + r.km, 0);
  const runMap = Object.fromEntries(runs.map((r) => [r.day, r.km]));

  return (
    <div className="flex items-end gap-10">
      <div className="flex items-end gap-2">
        {DAYS.map((day) => {
          const km = runMap[day] ?? 0;
          const barH = km > 0 ? Math.max(6, (km / maxKm) * MAX_BAR_HEIGHT) : 0;
          const isLong = km === maxKm && km > 0;

          return (
            <div key={day} className="flex flex-col items-center gap-1">
              <div style={{ height: `${MAX_BAR_HEIGHT}px`, display: "flex", alignItems: "flex-end" }}>
                <div
                  style={{
                    width: "20px",
                    height: `${barH}px`,
                    backgroundColor: isLong ? "#017CC3" : "#ADD4E5",
                    transition: "height 0.3s ease",
                  }}
                />
              </div>
              {km > 0 && (
                <span style={{ fontSize: "0.5rem", color: "#017CC3", letterSpacing: "0.05em" }}>
                  {km}
                </span>
              )}
              <span
                style={{
                  fontSize: "0.5rem",
                  letterSpacing: "0.08em",
                  color: km > 0 ? "#017CC3" : "rgba(173, 212, 229, 0.5)",
                  textTransform: "uppercase",
                }}
              >
                {day}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ paddingBottom: "1.4rem" }}>
        <p style={{ fontSize: "0.5rem", letterSpacing: "0.2em", color: "#ADD4E5", textTransform: "uppercase", marginBottom: "0.2rem" }}>
          total
        </p>
        <p style={{ fontSize: "2.5rem", color: "#017CC3", letterSpacing: "-0.03em", lineHeight: 1, fontWeight: 700 }}>
          {totalKm}
        </p>
        <p style={{ fontSize: "0.55rem", letterSpacing: "0.15em", color: "#ADD4E5" }}>km</p>
      </div>
    </div>
  );
}
