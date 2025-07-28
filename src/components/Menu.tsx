import "@/styles/Menu.css";
import gsap from "gsap";
import { useEffect, useRef, useState, useCallback } from "react";

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const menuToggleRef = useRef<HTMLDivElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const menuPreviewImgRef = useRef<HTMLDivElement>(null);

  const cleanupPreviewImages = useCallback(() => {
    const menuPreviewImg = menuPreviewImgRef.current;
    if (!menuPreviewImg) return;

    const previewImages = menuPreviewImg.querySelectorAll("img");
    if (previewImages.length > 3) {
      for (let i = 0; i < previewImages.length - 3; i++) {
        menuPreviewImg.removeChild(previewImages[i]);
      }
    }
  }, []);

  const resetPreviewImage = useCallback(() => {
    const menuPreviewImg = menuPreviewImgRef.current;
    if (!menuPreviewImg) return;

    menuPreviewImg.innerHTML = "";
    const defaultPreviewImg = document.createElement("img");
    defaultPreviewImg.src = "/img/menu/img-1.png";
    menuPreviewImg.appendChild(defaultPreviewImg);
  }, []);

  const animateMenuToggle = useCallback((isOpening: boolean) => {
    const open = document.querySelector("p#menu-open");
    const close = document.querySelector("p#menu-close");

    gsap.to(isOpening ? open : close, {
      x: isOpening ? -5 : 5,
      y: isOpening ? -10 : 10,
      rotation: isOpening ? -5 : 5,
      opacity: 0,
      delay: 0.25,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(isOpening ? close : open, {
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      delay: 0.5,
      ease: "power2.out",
    });
  }, []);

  const openMenu = useCallback(() => {
    if (isAnimating || isOpen) return;
    setIsAnimating(true);

    animateMenuToggle(true);

    const menuContent = menuContentRef.current;
    const menuOverlay = menuOverlayRef.current;

    if (menuContent) {
      gsap.to(menuContent, {
        rotation: 0,
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1.25,
        ease: "power4.inOut",
      });
    }

    gsap.to([".link a", ".social a"], {
      y: "0%",
      opacity: 1,
      duration: 1,
      delay: 0.75,
      stagger: 0.1,
      ease: "power3.out",
    });

    if (menuOverlay) {
      gsap.to(menuOverlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 175%, 0% 100%)",
        duration: 1.25,
        ease: "power4.inOut",
        onComplete: () => {
          setIsOpen(true);
          setIsAnimating(false);
        },
      });
    }
  }, [isAnimating, isOpen, animateMenuToggle]);

  const closeMenu = useCallback(() => {
    if (isAnimating || !isOpen) return;
    setIsAnimating(true);

    animateMenuToggle(false);

    const menuContent = menuContentRef.current;
    const menuOverlay = menuOverlayRef.current;

    if (menuContent) {
      gsap.to(menuContent, {
        rotation: -15,
        x: -100,
        y: -100,
        scale: 1.5,
        opacity: 0.25,
        duration: 1.25,
        ease: "power4.inOut",
      });
    }

    if (menuOverlay) {
      gsap.to(menuOverlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.25,
        ease: "power4.inOut",
        onComplete: () => {
          setIsOpen(false);
          setIsAnimating(false);
          gsap.set([".link a", ".social a"], { y: "120%" });
          resetPreviewImage();
        },
      });
    }
  }, [isAnimating, isOpen, animateMenuToggle, resetPreviewImage]);

  const handleMenuToggle = useCallback(() => {
    if (!isOpen) openMenu();
    else closeMenu();
  }, [isOpen, openMenu, closeMenu]);

  const handleLinkHover = useCallback(
    (link: HTMLAnchorElement) => {
      if (!isOpen || isAnimating) return;

      const imgSrc = link.getAttribute("data-img");
      if (!imgSrc) return;

      const menuPreviewImg = menuPreviewImgRef.current;
      if (!menuPreviewImg) return;

      const previewImages = menuPreviewImg.querySelectorAll("img");
      if (
        previewImages.length > 0 &&
        previewImages[previewImages.length - 1].src.endsWith(imgSrc)
      )
        return;

      const newPreviewImg = document.createElement("img");
      newPreviewImg.src = imgSrc;
      newPreviewImg.style.opacity = "0";
      newPreviewImg.style.transform = "scale(1.25) rotate(10deg)";

      menuPreviewImg.appendChild(newPreviewImg);
      cleanupPreviewImages();

      gsap.to(newPreviewImg, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.75,
        ease: "power2.out",
      });
    },
    [isOpen, isAnimating, cleanupPreviewImages]
  );

  const handleLinkClick = useCallback(() => {
    if (!isOpen || isAnimating) return;
    closeMenu();
  }, [isOpen, isAnimating, closeMenu]);

  useEffect(() => {
    const menuToggle = menuToggleRef.current;
    const menuLinks = document.querySelectorAll(".link a");

    const handleToggleClick = () => {
      handleMenuToggle();
    };

    const handleLinkMouseOver = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      handleLinkHover(target);
    };

    const handleLinkClickEvent = () => {
      handleLinkClick();
    };

    // Add event listeners
    if (menuToggle) {
      menuToggle.addEventListener("click", handleToggleClick);
    }

    menuLinks.forEach((link) => {
      link.addEventListener("mouseover", handleLinkMouseOver);
      link.addEventListener("click", handleLinkClickEvent);
    });

    // Cleanup function
    return () => {
      if (menuToggle) {
        menuToggle.removeEventListener("click", handleToggleClick);
      }

      menuLinks.forEach((link) => {
        link.removeEventListener("mouseover", handleLinkMouseOver);
        link.removeEventListener("click", handleLinkClickEvent);
      });
    };
  }, [handleMenuToggle, handleLinkHover, handleLinkClick]);

  return (
    <>
      <nav>
        <div className="logo">
          <a href="#"></a>
        </div>
        <div className="menu-toggle" ref={menuToggleRef}>
          <p id="menu-open">Menu</p>
          <p id="menu-close">Close</p>
        </div>
      </nav>

      <div className="menu-overlay" ref={menuOverlayRef}>
        <div className="menu-content" ref={menuContentRef}>
          <div className="menu-items">
            <div className="col-lg">
              <div className="menu-preview-img" ref={menuPreviewImgRef}>
                <img src="/img/menu/img-1.png" alt="" />
              </div>
            </div>
            <div className="col-sm">
              <div className="menu-links">
                <div className="link">
                  <a
                    href="#professional-experience"
                    data-img="/img/menu/img-1.png"
                  >
                    Experience
                  </a>
                </div>
                <div className="link">
                  <a href="#projects" data-img="/img/menu/img-2.png">
                    Projects
                  </a>
                </div>
                <div className="link">
                  <a href="#skills" data-img="/img/menu/img-3.png">
                    Skills
                  </a>
                </div>
                <div className="link">
                  <a href="#" data-img="/img/menu/img-4.png">
                    Connect
                  </a>
                </div>
              </div>
              <div className="menu-socials">
                <div className="social">
                  <a href="https://www.linkedin.com/in/joshuayherrera/">
                    LinkedIn
                  </a>
                </div>
                <div className="social">
                  <a href="https://github.com/joshuayherrera">Github</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
