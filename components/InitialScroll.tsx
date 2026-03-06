"use client";

import { useEffect } from "react";

export default function InitialScroll() {
  useEffect(() => {
    const canvas = document.querySelector(".canvas-scroll") as HTMLElement;
    if (canvas) canvas.scrollLeft = window.innerWidth;
  }, []);

  return null;
}
