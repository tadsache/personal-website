import TechPanel from "@/components/TechPanel";
import HeroPanel from "@/components/HeroPanel";
import BlogPanel from "@/components/BlogPanel";
import ContactPanel from "@/components/ContactPanel";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import InitialScroll from "@/components/InitialScroll";

export default function Home() {
  return (
    <ThemeProvider>
      <InitialScroll />
      <div className="vertical-scroll h-screen w-screen overflow-y-scroll snap-y snap-mandatory">
        <div className="canvas-scroll dot-grid snap-start flex-shrink-0 flex h-screen w-screen overflow-x-scroll snap-x snap-mandatory">
          <TechPanel />
          <HeroPanel />
          <BlogPanel />
        </div>
        <ContactPanel />
      </div>
      <ThemeSwitcher />
    </ThemeProvider>
  );
}
