import { useEffect } from "react";
import { useCursor } from "../components/CustomCursor";

type CursorVariant = "default" | "button" | "dock" | "menu" | "menu-link";

export function useCursorHover(variant: CursorVariant = "button") {
  const { setCursorVariant } = useCursor();

  const onMouseEnter = () => setCursorVariant(variant);
  const onMouseLeave = () => setCursorVariant("default");

  return {
    onMouseEnter,
    onMouseLeave,
  };
}

export function useCursorEffect(
  ref: React.RefObject<HTMLElement>,
  variant: CursorVariant = "button"
) {
  const { setCursorVariant } = useCursor();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => setCursorVariant(variant);
    const handleMouseLeave = () => setCursorVariant("default");

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, variant, setCursorVariant]);
}
