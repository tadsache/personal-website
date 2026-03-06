"use client";

import { themes } from "@/lib/themes";
import { useTheme } from "./ThemeProvider";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="fixed bottom-8 right-8 flex gap-2 z-50"
      style={{ mixBlendMode: "normal" }}
    >
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t)}
          title={t.name}
          style={{
            width: t.id === theme.id ? "14px" : "10px",
            height: t.id === theme.id ? "14px" : "10px",
            borderRadius: "50%",
            backgroundColor: t.primary,
            border: `2px solid ${t.id === theme.id ? t.primary : t.accent}`,
            outline: t.id === theme.id ? `2px solid ${t.primary}` : "none",
            outlineOffset: "2px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            padding: 0,
          }}
        />
      ))}
    </div>
  );
}
