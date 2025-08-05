import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "@/styles/Home.css";

function HeroSection() {
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!title1Ref.current || !title2Ref.current || !taglineRef.current) {
        return;
      }

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          force3D: true, 
        },
      });

      gsap.set([title1Ref.current, title2Ref.current, taglineRef.current], {
        opacity: 0,
        y: (i) => [60, 100, 30][i],
      });

      tl.to(title1Ref.current, {
        y: 0,
        opacity: 1,
        duration: 1,
      })
        .to(
          title2Ref.current,
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
          },
          "-=0.6"
        )
        .to(
          taglineRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 1,
          },
          "-=0.4"
        );
    },
    {
      scope: containerRef, 
      dependencies: [],
    }
  );

  return (
    <section ref={containerRef} className="hero-section">
      <div className="hero-copy">
        <div className="hero-copy-wrapper">
          <h1 ref={title1Ref}>Joshua</h1>
        </div>
        <div className="hero-copy-wrapper">
          <h1 ref={title2Ref}>Alvarez</h1>
        </div>
      </div>

      <div className="hero-tagline">
        <p ref={taglineRef}>Frontend Developer based in Perú.</p>
      </div>
    </section>
  );
}

export default HeroSection;
