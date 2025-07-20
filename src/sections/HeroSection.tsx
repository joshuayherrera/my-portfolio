import { Spotlight } from "../components/ui/spotlight.component";
import SplitText from "../components/ui/splitText.component";
import ShinyText from "../components/ui/shinyText.component";
import { cn } from "../lib/utils";

function HeroSection() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };
  return (
    <main className="relative flex h-screen w-screen overflow-hidden bg-black/[0.96] antialiased md:items-center md:justify-center">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
        )}
      />
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
        <div className="flex justify-center items-center w-full">
          <SplitText
            text="Joshua Alvarez"
            className="text-[#D9D9D9] bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold md:text-7xl"
            delay={100}
            duration={2}
            ease="elastic.out(1, 0.3)"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
          />
        </div>
        <div className="flex justify-center items-center w-full">
          <ShinyText
            text="A creative Frontend Developer with 2+ years of experience in building high-performance, scalable, and responsive web solutions."
            disabled={false}
            speed={5}
            className="mx-auto mt-4 max-w-xl text-center text-lg font-medium"
          />
        </div>
      </div>
    </main>
  );
}

export default HeroSection;
