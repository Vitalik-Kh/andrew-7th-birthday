import { useTransform } from 'framer-motion';

export const useCarPosition = (scrollProgress) => {
  // Car rotation follows the road curves
  // Values represent: [scroll position] -> [rotation in degrees]
  const carRotation = useTransform(
    scrollProgress,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    [0, -12, 8, -15, 10, -8, 5, 0]
  );

  // Horizontal position shifts for curves
  // Values represent: [scroll position] -> [x offset in pixels]
  const carX = useTransform(
    scrollProgress,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    [0, -80, 60, -100, 80, -60, 40, 0]
  );

  return { carRotation, carX };
};
