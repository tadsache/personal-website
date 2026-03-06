import HeroPanel from "@/components/HeroPanel";
import BlogPanel from "@/components/BlogPanel";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Home() {
  return (
    <ThemeProvider>
      <div className="canvas-scroll dot-grid flex h-screen w-screen overflow-x-scroll snap-x snap-mandatory">
        <HeroPanel />
        <BlogPanel />
      </div>
      <ThemeSwitcher />
    </ThemeProvider>
  );
}
