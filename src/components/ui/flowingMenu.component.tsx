import React from "react";
import { gsap } from "gsap";
import { useCursorHover } from "../../hooks/useCursorHover";

interface MenuItemProps {
  link: string;
  text: string;
  image: string;
  onItemClick?: () => void;
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
  onItemClick?: () => void;
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({
  items = [],
  onItemClick,
}) => {
  const menuItemsRef = React.useRef<HTMLDivElement[]>([]);

  const animateOut = React.useCallback(() => {
    return gsap.to(menuItemsRef.current, {
      x: -100,
      opacity: 0,
      rotationY: -90,
      duration: 0.4,
      stagger: { amount: 0.2, from: "end" },
      ease: "back.in(1.4)",
    });
  }, []);

  React.useEffect(() => {
    // Animación de entrada para los items del menú
    gsap.fromTo(
      menuItemsRef.current,
      {
        x: 100,
        opacity: 0,
        rotationY: 90,
        transformOrigin: "left center",
      },
      {
        x: 0,
        opacity: 1,
        rotationY: 0,
        duration: 0.6,
        stagger: { amount: 0.3, ease: "power2.out" },
        ease: "back.out(1.4)",
        delay: 0.4,
      }
    );
  }, []);

  // Exponer la función animateOut a través de props
  const handleItemClick = React.useCallback(
    (itemOnClick?: () => void) => {
      // Animar salida antes de cerrar
      const exitAnimation = animateOut();
      exitAnimation.then(() => {
        itemOnClick?.();
        onItemClick?.();
      });
    },
    [animateOut, onItemClick]
  );

  return (
    <div className="w-full h-full overflow-hidden">
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            onItemClick={() => handleItemClick()}
            ref={(el: HTMLDivElement | null) => {
              if (el) menuItemsRef.current[idx] = el;
            }}
          />
        ))}
      </nav>
    </div>
  );
};

const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  ({ link, text, image, onItemClick }, ref) => {
    const itemRef = React.useRef<HTMLDivElement>(null);
    const marqueeRef = React.useRef<HTMLDivElement>(null);
    const marqueeInnerRef = React.useRef<HTMLDivElement>(null);
    const menuLinkCursorProps = useCursorHover("menu-link");

    // Combinar refs
    React.useImperativeHandle(ref, () => itemRef.current!, []);

    const animationDefaults = { duration: 0.6, ease: "expo" };

    const findClosestEdge = (
      mouseX: number,
      mouseY: number,
      width: number,
      height: number
    ): "top" | "bottom" => {
      const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
      const bottomEdgeDist =
        Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
      return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
    };

    const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
      if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
        return;
      const rect = itemRef.current.getBoundingClientRect();
      const edge = findClosestEdge(
        ev.clientX - rect.left,
        ev.clientY - rect.top,
        rect.width,
        rect.height
      );

      const tl = gsap.timeline({ defaults: animationDefaults });
      tl.set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
        .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" })
        .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" });
    };

    const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
      if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
        return;
      const rect = itemRef.current.getBoundingClientRect();
      const edge = findClosestEdge(
        ev.clientX - rect.left,
        ev.clientY - rect.top,
        rect.width,
        rect.height
      );

      const tl = gsap.timeline({ defaults: animationDefaults }) as TimelineMax;
      tl.to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }).to(
        marqueeInnerRef.current,
        { y: edge === "top" ? "101%" : "-101%" }
      );
    };

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (link.startsWith("#")) {
        e.preventDefault();
        const targetElement = document.querySelector(link);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }

      onItemClick?.();
    };

    const repeatedMarqueeContent = React.useMemo(() => {
      return Array.from({ length: 4 }).map((_, idx) => (
        <React.Fragment key={idx}>
          <span className="text-[#060010] uppercase font-normal text-[4vh] leading-[1.2] p-[1vh_1vw_0]">
            {text}
          </span>
          <div
            className="w-[200px] h-[7vh] my-[2em] mx-[2vw] p-[1em_0] rounded-[50px] bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
        </React.Fragment>
      ));
    }, [text, image]);

    return (
      <div
        className="flex-1 relative overflow-hidden text-center shadow-[0_-1px_0_0_#fff]"
        ref={itemRef}
      >
        <a
          className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-white text-[4vh] hover:text-[#060010] focus:text-white focus-visible:text-[#060010]"
          href={link}
          onMouseEnter={(e) => {
            handleMouseEnter(e);
            menuLinkCursorProps.onMouseEnter();
          }}
          onMouseLeave={(e) => {
            handleMouseLeave(e);
            menuLinkCursorProps.onMouseLeave();
          }}
          onClick={handleClick}
          data-cursor="menu-link"
        >
          {text}
        </a>
        <div
          className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-white translate-y-[101%]"
          ref={marqueeRef}
        >
          <div className="h-full w-[200%] flex" ref={marqueeInnerRef}>
            <div className="flex items-center relative h-full w-[200%] will-change-transform animate-marquee">
              {repeatedMarqueeContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default FlowingMenu;
