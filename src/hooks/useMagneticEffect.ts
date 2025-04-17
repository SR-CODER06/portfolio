import { useEffect, RefObject } from "react";
import { gsap } from "gsap";

export const useMagneticEffect = (elementRefs: RefObject<HTMLElement>[]) => {
  useEffect(() => {
    const cleanupFunctions: (() => void)[] = [];

    elementRefs.forEach((elementRef) => {
      if (!elementRef.current) return;

      const element = elementRef.current;

      const handleMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = element.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        const centerX = width / 2;
        const centerY = height / 2;
        const distance = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2),
        );

        if (distance < 120) {
          const moveX = (x - centerX) * 0.4;
          const moveY = (y - centerY) * 0.4;
          gsap.to(element, {
            x: moveX,
            y: moveY,
            scale: 1.05,
            duration: 0.3,
            ease: "power3.out",
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
        });
      };

      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);

      cleanupFunctions.push(() => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    });

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, [elementRefs]);
};
