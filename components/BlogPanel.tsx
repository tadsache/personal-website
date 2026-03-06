"use client";

import { useState, useRef, useEffect } from "react";
import { posts, type Post } from "@/data/posts";

export default function BlogPanel() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const selectedPost = posts.find((p) => p.week === selectedWeek) ?? posts[0];

  return (
    <section className="snap-start flex-shrink-0 w-screen h-screen flex overflow-hidden">
      {/* Timeline column */}
      <div
        className="timeline-scroll flex-shrink-0 overflow-y-auto py-16 flex flex-col justify-start"
        style={{
          width: "180px",
          paddingLeft: "48px",
          paddingRight: "24px",
          borderRight: "1px solid rgba(173, 212, 229, 0.4)",
        }}
      >
        <Timeline
          selectedWeek={selectedWeek}
          onSelect={setSelectedWeek}
        />
      </div>

      {/* Post content column */}
      <div className="flex-1 overflow-y-auto py-16 px-16">
        <PostContent post={selectedPost} />
      </div>
    </section>
  );
}

function Timeline({
  selectedWeek,
  onSelect,
}: {
  selectedWeek: number;
  onSelect: (week: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const active = container.querySelector("[data-active='true']") as HTMLElement;
    if (active) {
      active.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selectedWeek]);

  return (
    <div ref={containerRef} className="relative flex flex-col items-start">
      {/* Vertical line */}
      <div
        className="absolute top-0 bottom-0"
        style={{
          left: "4px",
          width: "1px",
          backgroundColor: "rgba(173, 212, 229, 0.4)",
        }}
      />

      {posts.map((post) => {
        const isSelected = post.week === selectedWeek;
        const isPublished = post.published;

        return (
          <button
            key={post.week}
            data-active={isSelected}
            onClick={() => isPublished && onSelect(post.week)}
            className="flex items-center gap-3 relative"
            style={{
              paddingBottom: "13px",
              cursor: isPublished ? "pointer" : "default",
              background: "none",
              border: "none",
            }}
          >
            {/* Dot */}
            <div
              style={{
                width: isSelected ? "10px" : "8px",
                height: isSelected ? "10px" : "8px",
                borderRadius: "50%",
                backgroundColor: isSelected
                  ? "#017CC3"
                  : isPublished
                  ? "#ADD4E5"
                  : "transparent",
                border: `1.5px solid ${
                  isSelected
                    ? "#017CC3"
                    : isPublished
                    ? "#ADD4E5"
                    : "rgba(173, 212, 229, 0.3)"
                }`,
                flexShrink: 0,
                zIndex: 1,
                transition: "all 0.15s ease",
              }}
            />

            {/* Week label */}
            <span
              style={{
                fontSize: "0.58rem",
                letterSpacing: "0.1em",
                color: isSelected
                  ? "#017CC3"
                  : isPublished
                  ? "#017CC3"
                  : "rgba(1, 124, 195, 0.25)",
                transition: "color 0.15s ease",
              }}
            >
              W{String(post.week).padStart(2, "0")}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function PostContent({ post }: { post: Post }) {
  if (!post.published) {
    return (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div style={{ borderBottom: "1px solid rgba(173, 212, 229, 0.35)", paddingBottom: "2rem" }}>
          <p
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              color: "#ADD4E5",
              textTransform: "uppercase",
            }}
          >
            WEEK {post.week} OF 28
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "rgba(1, 124, 195, 0.15)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              marginTop: "1rem",
              fontWeight: 400,
            }}
          >
            {post.title}
          </h2>
        </div>
        <p
          style={{
            fontSize: "0.8rem",
            color: "rgba(1, 124, 195, 0.25)",
            letterSpacing: "0.05em",
          }}
        >
          still running.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 animate-fade-in" style={{ maxWidth: "580px" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(173, 212, 229, 0.35)", paddingBottom: "2rem" }}>
        <p
          style={{
            fontSize: "0.58rem",
            letterSpacing: "0.2em",
            color: "#ADD4E5",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          WEEK {post.week} OF 28 &nbsp;·&nbsp; {post.date}
        </p>
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "#017CC3",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            fontWeight: 400,
          }}
        >
          {post.title}
        </h2>
      </div>

      {/* Stats */}
      <div className="flex gap-12">
        <Stat label="km" value={`${post.km}`} />
        <Stat label="feeling" value={post.feeling} />
      </div>

      {/* Body */}
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p
        style={{
          fontSize: "0.55rem",
          letterSpacing: "0.2em",
          color: "#ADD4E5",
          textTransform: "uppercase",
          marginBottom: "0.3rem",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: "1.5rem",
          color: "#017CC3",
          letterSpacing: "-0.02em",
          fontWeight: 700,
        }}
      >
        {value}
      </p>
    </div>
  );
}
