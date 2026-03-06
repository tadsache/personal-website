import HeroPanel from "@/components/HeroPanel";
import BlogPanel from "@/components/BlogPanel";

export default function Home() {
  return (
    <div className="canvas-scroll dot-grid flex h-screen w-screen overflow-x-scroll snap-x snap-mandatory">
      <HeroPanel />
      <BlogPanel />
    </div>
  );
}
