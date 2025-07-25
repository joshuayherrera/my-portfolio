"use client";
import { useState, createContext, useContext } from "react";
import { Cursor } from "./ui/cursor.component";
import { AnimatePresence, motion } from "motion/react";
import { HandIcon, PointerIcon, ExternalLink } from "lucide-react";

type CursorVariant = "default" | "button" | "dock" | "menu" | "menu-link";

interface CursorContextType {
  cursorVariant: CursorVariant;
  setCursorVariant: (variant: CursorVariant) => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorVariant: "default",
  setCursorVariant: () => {},
});

export const useCursor = () => useContext(CursorContext);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");

  return (
    <CursorContext.Provider value={{ cursorVariant, setCursorVariant }}>
      {children}
      <CustomCursor variant={cursorVariant} />
    </CursorContext.Provider>
  );
}

function CustomCursor({ variant }: { variant: CursorVariant }) {
  const [isHovering, setIsHovering] = useState(false);

  const handlePositionChange = (x: number, y: number) => {
    // Detectar si está sobre elementos interactivos
    const elementUnderCursor = document.elementFromPoint(x, y);
    if (elementUnderCursor) {
      const isInteractive =
        elementUnderCursor.closest('[data-cursor="button"]') ||
        elementUnderCursor.closest('[data-cursor="dock"]') ||
        elementUnderCursor.closest('[data-cursor="menu"]') ||
        elementUnderCursor.closest('[data-cursor="menu-link"]') ||
        elementUnderCursor.closest("button") ||
        elementUnderCursor.closest("a") ||
        elementUnderCursor.tagName === "BUTTON" ||
        elementUnderCursor.tagName === "A";

      setIsHovering(!!isInteractive);
    }
  };

  const getCursorContent = () => {
    switch (variant) {
      case "button":
        return (
          <motion.div
            animate={{
              width: isHovering ? 100 : 20,
              height: isHovering ? 40 : 20,
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex items-center justify-center rounded-full bg-gray-500/40 backdrop-blur-md border border-gray-500/40"
          >
            <AnimatePresence>
              {isHovering && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="inline-flex w-full items-center justify-center"
                >
                  <div className="inline-flex items-center text-sm text-white font-medium">
                    Click <HandIcon className="ml-1 h-3 w-3" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );

      case "dock":
        return (
          <motion.div
            animate={{
              width: isHovering ? 80 : 16,
              height: isHovering ? 32 : 16,
            }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="flex items-center justify-center rounded-full bg-gray-500/40 backdrop-blur-md dark:bg-gray-300/40"
          >
            <AnimatePresence>
              {isHovering && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="inline-flex w-full items-center justify-center"
                >
                  <div className="inline-flex items-center text-sm text-white">
                    Visit <ExternalLink className="ml-1 h-4 w-4" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );

      case "menu":
        return (
          <motion.div
            animate={{
              width: isHovering ? 90 : 18,
              height: isHovering ? 36 : 18,
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex items-center justify-center rounded-full bg-gray-500/40 backdrop-blur-md border border-gray-500/40"
          >
            <AnimatePresence>
              {isHovering && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="inline-flex w-full items-center justify-center"
                >
                  <div className="inline-flex items-center text-sm text-white font-medium">
                    Explore <PointerIcon className="ml-1 h-3 w-3" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );

      case "menu-link":
        return (
          <motion.div
            animate={{
              width: isHovering ? 95 : 20,
              height: isHovering ? 38 : 20,
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex items-center justify-center rounded-full bg-gray-700/70 backdrop-blur-md border border-gray-600/50"
          >
            <AnimatePresence>
              {isHovering && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="inline-flex w-full items-center justify-center"
                >
                  <div className="inline-flex items-center text-sm text-white font-medium">
                    Navigate <PointerIcon className="ml-1 h-3 w-3" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );

      default:
        return (
          <motion.div
            animate={{
              width: isHovering ? 24 : 12,
              height: isHovering ? 24 : 12,
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="rounded-full bg-black dark:bg-white"
          />
        );
    }
  };

  return (
    <Cursor
      variants={{
        initial: { scale: 0.3, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.3, opacity: 0 },
      }}
      springConfig={{
        bounce: 0.001,
      }}
      transition={{
        ease: "easeInOut",
        duration: 0.15,
      }}
      onPositionChange={handlePositionChange}
    >
      {getCursorContent()}
    </Cursor>
  );
}
