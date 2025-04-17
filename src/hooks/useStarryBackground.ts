import { useState, useEffect, RefObject } from "react";

interface StarProps {
  id: number;
  size: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  opacity: number;
  shine: boolean;
  shineInterval: number;
}

interface OrbProps {
  id: number;
  size: number;
  x: number;
  y: number;
  hue: number;
  opacity: number;
  parallaxFactor: number;
}

export const useStarryBackground = (heroRef: RefObject<HTMLDivElement>) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState<StarProps[]>([]);
  const [orbs, setOrbs] = useState<OrbProps[]>([]);

  // Generate stars and orbs
  useEffect(() => {
    // Create stars
    const newStars = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      opacity: Math.random() * 0.5 + 0.3,
      shine: false,
      shineInterval: Math.random() * 10000 + 5000, // Random interval between 5-15 seconds
    }));

    // Create orbs
    const newOrbs = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 80 + 40,
      x: Math.random() * 100,
      y: Math.random() * 100,
      hue: Math.random() * 60 + 200, // Blue-ish colors
      opacity: Math.random() * 0.15 + 0.05,
      parallaxFactor: (i % 3) + 1,
    }));

    setStars(newStars);
    setOrbs(newOrbs);
  }, []);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { left, top, width, height } =
          heroRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [heroRef]);

  // Random star shine effect with more dramatic shine
  useEffect(() => {
    // Function to make a random star shine dramatically
    const makeRandomStarShine = () => {
      setStars((prevStars) => {
        const newStars = [...prevStars];
        const randomIndex = Math.floor(Math.random() * newStars.length);

        // Make the star shine dramatically
        newStars[randomIndex] = {
          ...newStars[randomIndex],
          shine: true,
          size: newStars[randomIndex].size * 5, // Make it much bigger when shining
          opacity: 1,
        };

        // Reset the star after a short duration
        setTimeout(() => {
          setStars((currentStars) => {
            const resetStars = [...currentStars];
            resetStars[randomIndex] = {
              ...resetStars[randomIndex],
              shine: false,
              size: resetStars[randomIndex].size / 5, // Return to original size
              opacity: Math.random() * 0.5 + 0.3,
            };
            return resetStars;
          });
        }, 2000); // Shine for 2 seconds

        return newStars;
      });
    };

    // Set interval to make random stars shine with less frequency
    const shineInterval = setInterval(() => {
      makeRandomStarShine();
    }, 3000); // Every 3 seconds a new star will shine

    return () => clearInterval(shineInterval);
  }, []);

  return { mousePosition, stars, orbs };
};
