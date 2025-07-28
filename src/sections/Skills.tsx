import "@/styles/Skills.css";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const profileImagesContainerRef = useRef<HTMLDivElement>(null);
  const profileImagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const nameElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const nameHeadingsRef = useRef<(HTMLHeadingElement | null)[]>([]);

  useGSAP(
    () => {
      if (typeof window !== "undefined") {
        gsap.registerPlugin(SplitText);
      }

      const profileImagesContainer = profileImagesContainerRef.current;
      const profileImages = profileImagesRef.current;
      const nameElements = nameElementsRef.current;
      const nameHeadings = nameHeadingsRef.current.filter(Boolean);

      // Store event listeners for cleanup
      const eventListeners: Array<{
        element: HTMLElement;
        event: string;
        handler: () => void;
      }> = [];

      nameHeadings.forEach((heading) => {
        if (heading) {
          const split = new SplitText(heading, { type: "chars" });
          split.chars.forEach((char) => {
            char.classList.add("letter");
          });
        }
      });

      if (nameElements[0]) {
        const defaultLetters = nameElements[0].querySelectorAll(".letter");
        gsap.set(defaultLetters, { y: "100%" });

        if (window.innerWidth >= 900) {
          profileImages.forEach((img) => {
            if (!img) return;

            const correspondingNameIndex = profileImages.indexOf(img) + 1;
            const correspondingName = nameElements[correspondingNameIndex];
            if (!correspondingName) return;

            const letters = correspondingName.querySelectorAll(".letter");

            const mouseenterHandler = () => {
              gsap.to(img, {
                width: 140,
                height: 140,
                duration: 0.5,
                ease: "power4.out",
              });

              gsap.to(letters, {
                y: "-100%",
                ease: "power4.out",
                duration: 0.75,
                stagger: {
                  each: 0.025,
                  from: "center",
                },
              });
            };

            const mouseleaveHandler = () => {
              gsap.to(img, {
                width: 70,
                height: 70,
                duration: 0.5,
                ease: "power4.out",
              });

              gsap.to(letters, {
                y: "0%",
                ease: "power4.out",
                duration: 0.75,
                stagger: {
                  each: 0.025,
                  from: "center",
                },
              });
            };

            img.addEventListener("mouseenter", mouseenterHandler);
            img.addEventListener("mouseleave", mouseleaveHandler);

            eventListeners.push(
              { element: img, event: "mouseenter", handler: mouseenterHandler },
              { element: img, event: "mouseleave", handler: mouseleaveHandler }
            );
          });

          if (profileImagesContainer) {
            const containerMouseenterHandler = () => {
              const defaultLetters =
                nameElements[0]?.querySelectorAll(".letter");
              if (defaultLetters) {
                gsap.to(defaultLetters, {
                  y: "0%",
                  ease: "power4.out",
                  duration: 0.75,
                  stagger: {
                    each: 0.025,
                    from: "center",
                  },
                });
              }
            };

            const containerMouseleaveHandler = () => {
              const defaultLetters =
                nameElements[0]?.querySelectorAll(".letter");
              if (defaultLetters) {
                gsap.to(defaultLetters, {
                  y: "100%",
                  ease: "power4.out",
                  duration: 0.75,
                  stagger: {
                    each: 0.025,
                    from: "center",
                  },
                });
              }
            };

            profileImagesContainer.addEventListener(
              "mouseenter",
              containerMouseenterHandler
            );
            profileImagesContainer.addEventListener(
              "mouseleave",
              containerMouseleaveHandler
            );

            eventListeners.push(
              {
                element: profileImagesContainer,
                event: "mouseenter",
                handler: containerMouseenterHandler,
              },
              {
                element: profileImagesContainer,
                event: "mouseleave",
                handler: containerMouseleaveHandler,
              }
            );
          }
        }
      }

      return () => {
        // Clean up event listeners
        eventListeners.forEach(({ element, event, handler }) => {
          element.removeEventListener(event, handler);
        });
      };
    },
    { scope: containerRef }
  );

  return (
    <section id="skills" className="skills" ref={containerRef}>
      <div className="profile-images" ref={profileImagesContainerRef}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, index) => (
          <div
            key={`img${num}`}
            className="img"
            ref={(el) => {
              profileImagesRef.current[index] = el;
            }}
          >
            <img
              src={`/img/skills/img-${num}.svg`}
              alt={`Skill ${num}`}
              width={140}
              height={140}
            />
          </div>
        ))}
      </div>
      <div className="profile-names">
        <div
          className="name default"
          ref={(el) => {
            nameElementsRef.current[0] = el;
          }}
        >
          <h1
            ref={(el) => {
              nameHeadingsRef.current[0] = el;
            }}
          >
            My Skills
          </h1>
        </div>
        {[
          "HTML",
          "CSS",
          "JavaScript",
          "React.JS",
          "TypeScript",
          "TailwindCss",
          "Next.JS",
          "Git",
          "GitHub",
        ].map((name, index) => (
          <div
            key={name}
            className="name"
            ref={(el) => {
              nameElementsRef.current[index + 1] = el;
            }}
          >
            <h1
              ref={(el) => {
                nameHeadingsRef.current[index + 1] = el;
              }}
            >
              {name}
            </h1>
          </div>
        ))}
      </div>
    </section>
  );
}
