export interface Theme {
  id: string;
  name: string;
  bg: string;
  primary: string;
  accent: string;
  accentSubtle: string;
  primaryMuted: string;
  dotGrid: string;
}

export const themes: Theme[] = [
  {
    id: "midnight",
    name: "Midnight",
    bg: "#111B21",
    primary: "#E8DDD0",
    accent: "#4A9EBF",
    accentSubtle: "rgba(74, 158, 191, 0.25)",
    primaryMuted: "rgba(232, 221, 208, 0.3)",
    dotGrid: "rgba(74, 158, 191, 0.12)",
  },
  {
    id: "ocean",
    name: "Ocean",
    bg: "#FFE9D2",
    primary: "#017CC3",
    accent: "#ADD4E5",
    accentSubtle: "rgba(173, 212, 229, 0.4)",
    primaryMuted: "rgba(1, 124, 195, 0.25)",
    dotGrid: "rgba(173, 212, 229, 0.55)",
  },
  {
    id: "forest",
    name: "Forest",
    bg: "#E7EDEB",
    primary: "#2C5440",
    accent: "#69A481",
    accentSubtle: "rgba(105, 164, 129, 0.35)",
    primaryMuted: "rgba(44, 84, 64, 0.25)",
    dotGrid: "rgba(105, 164, 129, 0.22)",
  },
  {
    id: "dune",
    name: "Dune",
    bg: "#F0E6D0",
    primary: "#7A3B1E",
    accent: "#C4956A",
    accentSubtle: "rgba(196, 149, 106, 0.35)",
    primaryMuted: "rgba(122, 59, 30, 0.25)",
    dotGrid: "rgba(196, 149, 106, 0.28)",
  },
];

export const defaultTheme = themes[0];
