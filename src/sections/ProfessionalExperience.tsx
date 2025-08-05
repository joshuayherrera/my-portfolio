import CurvedLoop from "@/components/ui/curvedLoop.component";
import { experience } from "@/data/experienceItems";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

function ProfessionalExperience() {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    // Animación del título
    gsap.fromTo(
      ".experience-title",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".experience-title",
          start: "top 80%",
          end: "bottom 20%",
        },
      }
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".cards-wrapper",
        start: "top top",
        end: "+=140%",
        pin: true,
        scrub: 1,
        pinSpacing: false,
      },
    });

    tl.to(".card", {
      height: 95,
      stagger: 0.3,
    });
  });

  return (
    <section id="professional-experience" className="min-h-screen bg-neutral-950 text-[#e3e3db] overflow-hidden">
      <div className="px-8 md:px-16 lg:px-24 xl:px-32 py-16 mb-12">
        <h2 className="font-stardom experience-title text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8">
          Professional Experience
        </h2>
      </div>

      <div className="cards-wrapper">
        {experience.map((card) => {
          return (
            <div
              key={card.id}
              className="card p-8 mx-8 md:mx-16 lg:mx-24 xl:mx-32 border-b border-white/25 overflow-hidden hover:bg-white/5 transition-colors duration-300 flex flex-col items-center"
            >
              <div className="flex gap-6 items-center h-36 w-full max-w-7xl">
                <h1 className="text-xl -translate-y-4 opacity-80 font-mono">
                  {card.id.toString().padStart(2, "0")}
                </h1>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold font-stardom">
                    {card.title}
                  </h1>
                  <h2 className="text-xl md:text-2xl text-[#f93535] mt-2">
                    {card.company}
                  </h2>
                  <span className="text-sm text-gray-400 mt-1 block">
                    {card.period}
                  </span>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 w-full max-w-7xl">
                <div className="flex-1 max-w-2xl">
                  <p className="text-base md:text-lg opacity-80 leading-relaxed mb-12">
                    {card.text}
                  </p>

                  <div className="achievements">
                    <h4 className="text-sm font-semibold mb-3 mt-4">
                      Key Achievements:
                    </h4>
                    <ul className="space-y-2">
                      {card.achievements.map((achievement, index) => (
                        <li
                          key={index}
                          className="text-sm opacity-70 flex items-center gap-2"
                        >
                          <span className="w-2 h-2 bg-[#f93535] rounded-full mr-3 flex-shrink-0"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="w-full lg:w-64 h-64 flex-shrink-0 hidden lg:block">
                  <img
                    className="h-full w-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                    src={card.icon}
                    alt={`${card.title} at ${card.company}`}
                  />
                </div>
              </div>
            </div>
          );
        })}      
        <div className="flex mb-16" >
          <CurvedLoop marqueeText="Joshua Alvarez ✦ Frontend Developer ✦" interactive className="text-[#e3e3db]"/>
        </div>
      </div>
    </section>
  );
}

export default ProfessionalExperience;
