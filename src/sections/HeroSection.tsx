import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Spotlight } from "../components/ui/spotlight.component";
import ShinyText from "../components/ui/shinyText.component";
import { cn } from "../lib/utils";

interface HeroSectionProps {
  isVisible?: boolean;
}

function HeroSection({ isVisible = true }: HeroSectionProps) {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && nameRef.current && subtitleRef.current) {
      // Timeline para la animación de entrada del HeroSection
      const tl = gsap.timeline();

      // Configuración inicial
      gsap.set([nameRef.current, subtitleRef.current], {
        opacity: 0,
        y: 30,
      });

      // Animación de entrada
      tl.to(nameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }).to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }
  }, [isVisible]);
  return (
    <main className="relative flex min-h-screen w-full overflow-hidden bg-black/[0.96] antialiased items-center justify-center">
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
      <section className="relative z-10 mx-auto w-full max-w-7xl p-4">
        <article className="flex justify-center items-center w-full">
          <h1
            ref={nameRef}
            className="font-stardom text-4xl md:text-5xl lg:text-6xl text-[#e3e3db] font-bold text-center px-4"
          >
            Joshua Alvarez
          </h1>
        </article>
        <article
          ref={subtitleRef}
          className="flex justify-center items-center w-full px-4"
        >
          <ShinyText
            text="A creative Frontend Developer with 2+ years of experience in building high-performance, scalable, and responsive web solutions."
            disabled={false}
            speed={5}
            className="mx-auto mt-4 max-w-lg md:max-w-xl text-center text-base md:text-lg font-medium"
          />
        </article>
      </section>
    </main>
  );
}

export default HeroSection;
