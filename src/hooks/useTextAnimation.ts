import { useEffect } from "react";
import { useAnimation, useInView } from "framer-motion";

export const useTextAnimation = (ref: React.RefObject<HTMLElement>) => {
  const controls = useAnimation();
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.9,
        ease: [0.215, 0.61, 0.355, 1], // Cubic bezier for smooth motion
      },
    }),
  };

  return { controls, textVariants };
};
