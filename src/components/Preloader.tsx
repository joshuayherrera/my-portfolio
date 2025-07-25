import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Dividir el texto en letras individuales
    const text = "JOSHUA ALVAREZ";
    const letters = text.split("").map((char, index) => {
      if (char === " ") {
        return `<span class="letter space" data-index="${index}">&nbsp;</span>`;
      }
      return `<span class="letter" data-index="${index}">${char}</span>`;
    });

    textRef.current.innerHTML = letters.join("");

    const letterElements = textRef.current.querySelectorAll(".letter");

    // Timeline principal
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // Configuración inicial de las letras
    gsap.set(letterElements, {
      opacity: 0,
      y: 100,
      rotationX: -90,
      transformOrigin: "bottom center",
    });

    // Animación de entrada con stagger
    tl.to(letterElements, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: {
        amount: 0.8,
        from: "start",
      },
    })
      // Pausa para el impacto visual
      .to({}, { duration: 1.2 })
      // Animación de salida con efecto disperso
      .to(letterElements, {
        opacity: 0,
        y: -50,
        rotationX: 90,
        scale: 0.8,
        duration: 0.6,
        ease: "power2.in",
        stagger: {
          amount: 0.4,
          from: "center",
        },
      })
      // Fade out del preloader
      .to(
        preloaderRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2"
      );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div
        ref={textRef}
        className="text-6xl md:text-8xl lg:text-9xl font-bold text-white text-center leading-tight"
        style={{
          fontFamily: "inherit",
          perspective: "1000px",
        }}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .letter {
            display: inline-block;
            transform-style: preserve-3d;
          }
          .space {
            width: 0.3em;
          }
        `,
        }}
      />
    </div>
  );
};

export default Preloader;
