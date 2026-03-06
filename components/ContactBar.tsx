"use client";

import { useState } from "react";

export default function ContactBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Slide-up form panel */}
      <div
        style={{
          position: "fixed",
          bottom: open ? "48px" : "-320px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(480px, 90vw)",
          backgroundColor: "var(--color-bg)",
          border: "1px solid var(--color-accent-subtle)",
          borderBottom: "none",
          padding: "2rem",
          transition: "bottom 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          zIndex: 40,
        }}
      >
        <p style={{
          fontSize: "0.45rem",
          letterSpacing: "0.25em",
          color: "var(--color-accent)",
          textTransform: "uppercase",
          marginBottom: "1.5rem",
        }}>
          get in touch
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Field label="name" placeholder="your name" />
          <Field label="email" placeholder="your@email.com" type="email" />
          <Field label="message" placeholder="what's on your mind" multiline />
        </div>

        <button
          style={{
            marginTop: "1.5rem",
            width: "100%",
            padding: "0.7em 0",
            backgroundColor: "var(--color-primary)",
            color: "var(--color-bg)",
            border: "none",
            fontFamily: "monospace",
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

      {/* Fixed bottom bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "48px",
          borderTop: "1px solid var(--color-accent-subtle)",
          backgroundColor: "var(--color-bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 50,
        }}
      >
        <button
          onClick={() => setOpen((o) => !o)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.5rem 1.5rem",
            opacity: 0.7,
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
        >
          <div style={{ width: "16px", height: "1px", backgroundColor: "var(--color-accent)" }} />
          <span style={{
            fontSize: "0.48rem",
            letterSpacing: "0.22em",
            color: "var(--color-accent)",
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}>
            {open ? "close" : "get in touch"}
          </span>
          <div style={{ width: "16px", height: "1px", backgroundColor: "var(--color-accent)" }} />
        </button>
      </div>
    </>
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
    fontFamily: "monospace",
    fontSize: "0.65rem",
    letterSpacing: "0.05em",
    padding: "0.4em 0",
    outline: "none",
    resize: "none",
    transition: "border-color 0.2s ease",
  };

  return (
    <div>
      <p style={{
        fontSize: "0.4rem",
        letterSpacing: "0.2em",
        color: "var(--color-primary-muted)",
        textTransform: "uppercase",
        marginBottom: "0.4rem",
      }}>
        {label}
      </p>
      {multiline ? (
        <textarea
          rows={3}
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
