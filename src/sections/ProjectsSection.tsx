import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "@/styles/Projects.css";
import Skills from "./Skills";
import HeroSection from "./HeroSection";

gsap.registerPlugin(ScrollTrigger);

interface SpotlightItem {
  name: string;
  img: string;
}

interface AnimationConfig {
  gap: number;
  speed: number;
  arcRadius: number;
}

interface BezierPosition {
  x: number;
  y: number;
}
const config: AnimationConfig = {
  gap: 0.08,
  speed: 0.3,
  arcRadius: 500,
};

const spotlightItems: SpotlightItem[] = [
  { name: "Silent Arc", img: "/img/projects/img_1.jpg" },
  { name: "Bloom24", img: "/img/projects/img_2.jpg" },
  { name: "Glass Fade", img: "/img/projects/img_3.jpg" },
  { name: "Echo 9", img: "/img/projects/img_4.jpg" },
  { name: "Velvet Loop", img: "/img/projects/img_5.jpg" },
  { name: "Field Two", img: "/img/projects/img_6.jpg" },
  { name: "Pale Thread", img: "/img/projects/img_7.jpg" },
  { name: "Stillroom", img: "/img/projects/img_8.jpg" },
  { name: "Ghostline", img: "/img/projects/img_9.jpg" },
  { name: "Mono 73", img: "/img/projects/img_10.jpg" },
];

const ProjectsSection: React.FC = () => {
  const spotlightRef = useRef<HTMLElement>(null);
  const titlesRef = useRef<HTMLDivElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const spotlightHeaderRef = useRef<HTMLDivElement>(null);
  const titlesContainerElementRef = useRef<HTMLDivElement>(null);
  const introTextElementsRef = useRef<HTMLDivElement[]>([]);
  const backgroundImageRef = useRef<HTMLDivElement>(null);
  const backgroundImgRef = useRef<HTMLImageElement>(null);

  const currentActiveIndexRef = useRef(0);

  const getBezierPosition = (t: number): BezierPosition => {
    const containerWidth = window.innerWidth * 0.3;
    const containerHeight = window.innerHeight;
    const arcStartX = containerWidth - 220;
    const arcStartY = -200;
    const arcEndY = containerHeight + 200;
    const arcControlPointX = arcStartX + config.arcRadius;
    const arcControlPointY = containerHeight / 2;

    const x =
      (1 - t) * (1 - t) * arcStartX +
      2 * (1 - t) * t * arcControlPointX +
      t * t * arcStartX;

    const y =
      (1 - t) * (1 - t) * arcStartY +
      2 * (1 - t) * t * arcControlPointY +
      t * t * arcEndY;

    return { x, y };
  };

  const getImgProgressState = (
    index: number,
    overallProgress: number
  ): number => {
    const startTime = index * config.gap;
    const endTime = startTime + config.speed;

    if (overallProgress < startTime) return -1;
    if (overallProgress > endTime) return 2;

    return (overallProgress - startTime) / config.speed;
  };

  useEffect(() => {
    let lenis: Lenis | null = null;
    let scrollTriggerInstance: ScrollTrigger | null = null;
    let rafCallback: ((time: number) => void) | null = null;

    const setupAnimations = () => {
      try {
        if (!spotlightRef.current) {
          console.warn("spotlightRef no está disponible");
          return;
        }

        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          infinite: false,
        });

        rafCallback = (time: number) => lenis?.raf(time * 1000);
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(rafCallback);
        gsap.ticker.lagSmoothing(0);

        const titlesContainer = titlesRef.current;
        const imagesContainer = imagesContainerRef.current;

        if (!titlesContainer || !imagesContainer) {
          console.warn("Contenedores no están disponibles");
          return;
        }

        titlesContainer.innerHTML = "";
        imagesContainer.innerHTML = "";

        const newTitleElements: HTMLHeadingElement[] = [];
        const newImageElements: HTMLDivElement[] = [];

        spotlightItems.forEach((item, index) => {
          const titleElement = document.createElement("h1");
          titleElement.textContent = item.name;
          titleElement.style.opacity = index === 0 ? "1" : "0.25";
          titlesContainer.appendChild(titleElement);
          newTitleElements.push(titleElement);

          const imgWrapper = document.createElement("div");
          imgWrapper.className = "spotlight-img";
          const imgElement = document.createElement("img");
          imgElement.src = item.img;
          imgElement.alt = "";
          imgWrapper.appendChild(imgElement);
          imagesContainer.appendChild(imgWrapper);
          newImageElements.push(imgWrapper);

          gsap.set(imgWrapper, { opacity: 0 });
        });

        gsap.set(titlesContainer, {
          y: window.innerHeight,
        });

        scrollTriggerInstance = ScrollTrigger.create({
          trigger: spotlightRef.current,
          start: "top top",
          end: `+=${window.innerHeight * 10}px`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            if (progress <= 0.2) {
              const animationProgress = progress / 0.2;

              const moveDistance = window.innerWidth * 0.6;
              if (introTextElementsRef.current?.[0]) {
                gsap.set(introTextElementsRef.current[0], {
                  x: -animationProgress * moveDistance,
                  opacity: 1,
                });
              }
              if (introTextElementsRef.current?.[1]) {
                gsap.set(introTextElementsRef.current[1], {
                  x: animationProgress * moveDistance,
                  opacity: 1,
                });
              }

              if (backgroundImageRef.current) {
                gsap.set(backgroundImageRef.current, {
                  transform: `scale(${animationProgress})`,
                });
              }
              if (backgroundImgRef.current) {
                gsap.set(backgroundImgRef.current, {
                  transform: `scale(${1.5 - animationProgress * 0.5})`,
                });
              }

              newImageElements.forEach((img) => gsap.set(img, { opacity: 0 }));
              if (spotlightHeaderRef.current)
                spotlightHeaderRef.current.style.opacity = "0";
              if (titlesContainerElementRef.current) {
                gsap.set(titlesContainerElementRef.current, {
                  "--before-opacity": "0",
                  "--after-opacity": "0",
                });
              }
            } else if (progress > 0.2 && progress <= 0.25) {
              if (backgroundImageRef.current)
                gsap.set(backgroundImageRef.current, { transform: "scale(1)" });
              if (backgroundImgRef.current)
                gsap.set(backgroundImgRef.current, { transform: "scale(1)" });

              if (introTextElementsRef.current?.[0])
                gsap.set(introTextElementsRef.current[0], { opacity: 0 });
              if (introTextElementsRef.current?.[1])
                gsap.set(introTextElementsRef.current[1], { opacity: 0 });

              if (spotlightHeaderRef.current)
                spotlightHeaderRef.current.style.opacity = "1";
              if (titlesContainerElementRef.current) {
                gsap.set(titlesContainerElementRef.current, {
                  "--before-opacity": "1",
                  "--after-opacity": "1",
                });
              }

              newImageElements.forEach((img) => gsap.set(img, { opacity: 0 }));
            } else if (progress > 0.25 && progress <= 0.95) {
              const switchProgress = (progress - 0.25) / 0.7;

              const viewportHeight = window.innerHeight;
              const titlesContainer = titlesRef.current;
              if (titlesContainer) {
                const titlesContainerHeight = titlesContainer.scrollHeight;
                const startPosition = viewportHeight;
                const targetPosition = -titlesContainerHeight;
                const totalDistance = startPosition - targetPosition;
                const currentY = startPosition - switchProgress * totalDistance;

                gsap.set(titlesContainer, {
                  y: currentY,
                });
              }

              newImageElements.forEach((img, index) => {
                const imageProgress = getImgProgressState(
                  index,
                  switchProgress
                );

                if (imageProgress < 0 || imageProgress > 1) {
                  gsap.set(img, { opacity: 0 });
                } else {
                  const pos = getBezierPosition(imageProgress);
                  gsap.set(img, {
                    x: pos.x - 100,
                    y: pos.y - 75,
                    opacity: 1,
                  });
                }
              });

              const viewportMiddle = window.innerHeight / 2;
              let closestIndex = 0;
              let closestDistance = Infinity;

              newTitleElements.forEach((title, index) => {
                if (title && title.getBoundingClientRect) {
                  const titleRect = title.getBoundingClientRect();
                  const titleCenter = titleRect.top + titleRect.height / 2;
                  const distanceFromCenter = Math.abs(
                    titleCenter - viewportMiddle
                  );

                  if (distanceFromCenter < closestDistance) {
                    closestDistance = distanceFromCenter;
                    closestIndex = index;
                  }
                }
              });

              if (
                closestIndex !== currentActiveIndexRef.current &&
                newTitleElements[closestIndex] &&
                spotlightItems[closestIndex]
              ) {
                if (newTitleElements[currentActiveIndexRef.current]) {
                  newTitleElements[
                    currentActiveIndexRef.current
                  ].style.opacity = "0.25";
                }

                newTitleElements[closestIndex].style.opacity = "1";

                if (backgroundImgRef.current) {
                  backgroundImgRef.current.src =
                    spotlightItems[closestIndex].img;
                }

                currentActiveIndexRef.current = closestIndex;
              }
            } else if (progress > 0.95) {
              if (spotlightHeaderRef.current)
                spotlightHeaderRef.current.style.opacity = "0";
              if (titlesContainerElementRef.current) {
                gsap.set(titlesContainerElementRef.current, {
                  "--before-opacity": "0",
                  "--after-opacity": "0",
                });
              }
            }
          },
        });
      } catch (error) {
        console.error("Error setting up animations:", error);
      }
    };

    setupAnimations();

    return () => {
      try {
        if (scrollTriggerInstance) {
          scrollTriggerInstance.kill();
          scrollTriggerInstance = null;
        }
        if (rafCallback) {
          gsap.ticker.remove(rafCallback);
        }
        if (lenis) {
          lenis.destroy();
          lenis = null;
        }
        gsap.killTweensOf("*");
      } catch (error) {
        console.error("Error during cleanup:", error);
      }
    };
  }, []);
  return (
    <div className="projects-section">
      {/* Sección Intro */}
      <section className="intro">
        <HeroSection />
      </section>

      {/* Sección Principal - Spotlight */}
      <section id="projects" className="spotlight" ref={spotlightRef}>
        <div className="spotlight-intro-text-wrapper">
          <div
            className="spotlight-intro-text"
            ref={(el) => {
              if (el) introTextElementsRef.current[0] = el;
            }}
          >
            <p>Amazing</p>
          </div>
          <div
            className="spotlight-intro-text"
            ref={(el) => {
              if (el) introTextElementsRef.current[1] = el;
            }}
          >
            <p>Projects</p>
          </div>
        </div>

        {/* Imagen de fondo con zoom */}
        <div className="spotlight-bg-img" ref={backgroundImageRef}>
          <img src="/img/projects/img_1.jpg" alt="" ref={backgroundImgRef} />
        </div>

        {/* Contenedor de títulos con clip-path */}
        <div
          className="spotlight-titles-container"
          ref={titlesContainerElementRef}
        >
          <div className="spotlight-titles" ref={titlesRef} />
        </div>

        {/* Contenedor de imágenes que vuelan */}
        <div className="spotlight-images" ref={imagesContainerRef} />

        {/* Header "Discover" */}
        <div className="spotlight-header" ref={spotlightHeaderRef}>
          <p>Discover</p>
        </div>
      </section>

      {/* Sección Outro */}
      <section className="outro">
        <Skills />
      </section>
    </div>
  );
};

export default ProjectsSection;
