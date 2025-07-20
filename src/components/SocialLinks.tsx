import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconDownload,
} from "@tabler/icons-react";
import { FloatingDock } from "./ui/floatingDock.component";

function SocialLinks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/files/CV_Joshua_Alvarez.pdf";
    link.download = "CV_Joshua_Alvarez.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const links = [
    {
      title: "Download CV",
      icon: <IconDownload className="h-full w-full text-white" />,
      href: "/files/CV_Joshua_Alvarez.pdf",
      onClick: handleDownloadCV,
      target: "_blank",
    },

    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-white target:_blank" />
      ),
      href: "https://www.linkedin.com/in/joshuayherrera/",
      target: "_blank"
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-white target:_blank" />
      ),
      href: "https://github.com/joshuayherrera",
      target: "_blank"
    },
  ];

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { y: 100, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "elastic.out(1, 0.8)",
        delay: 0.5,
      }
    );
  }, []);

  return (
    <div ref={containerRef} className="fixed bottom-6 left-6 z-50">
      <FloatingDock mobileClassName="translate-y-0" items={links} />
    </div>
  );
}

export default SocialLinks;
