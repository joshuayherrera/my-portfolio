import { useEffect, useState, useRef } from "react";
import { menuItems } from "../data/menuItems";
import FlowingMenu from "./ui/flowingMenu.component";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";

function MenuButton() {
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const openMenu = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setIsVisible(true);

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    // Liquid Wave Effect - Entrada
    tl.set(menuRef.current, {
      scaleX: 0,
      skewY: 15,
      transformOrigin: "right center",
      filter: "blur(20px) contrast(1.2)",
    })
      .set(backdropRef.current, { opacity: 0 })
      .to(backdropRef.current, { opacity: 1, duration: 0.3 })
      .to(
        menuRef.current,
        {
          scaleX: 1.1,
          skewY: 0,
          filter: "blur(0px) contrast(1)",
          duration: 0.8,
          ease: "elastic.out(1, 0.8)",
        },
        "-=0.2"
      )
      .to(
        menuRef.current,
        {
          scaleX: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.2"
      );
  };

  const closeMenu = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        isAnimating.current = false;
      },
    });

    tl.to(menuRef.current, {
      scaleX: 1.1,
      duration: 0.3,
      ease: "power2.in",
    })
      .to(
        menuRef.current,
        {
          scaleX: 0,
          skewY: 15,
          filter: "blur(20px) contrast(1.2)",
          duration: 0.8,
          ease: "elastic.in(1, 0.8)",
        },
        "-=0.1"
      )
      .to(backdropRef.current, { opacity: 0, duration: 0.3 }, "-=0.5");
  };

  const handleToggle = () => {
    if (isVisible) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

  return (
    <>
      <button
        onClick={handleToggle}
        className="fixed top-6 right-6 z-50 p-3 bg-white rounded-full hover:cursor-pointer 
        shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label={isVisible ? "Cerrar Menu" : "Abrir Menu"}
      >
        {isVisible ? (
          <X className="w-6 h-6 text-black" />
        ) : (
          <Menu className="w-6 h-6 text-black" />
        )}
      </button>

      {isVisible && (
        <div
          ref={backdropRef}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={handleToggle}
        >
          <div
            ref={menuRef}
            className="fixed top-0 right-0 w-full md:w-1/2 lg:w-1/3 h-full bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <FlowingMenu items={menuItems} onItemClick={handleToggle} />
          </div>
        </div>
      )}
    </>
  );
}

export default MenuButton;
