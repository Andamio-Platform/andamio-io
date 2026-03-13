import type { Variants } from "framer-motion";

/** Fade-in from below. Default: y=20, duration=0.5 */
export const fadeIn = (y = 20, duration = 0.5): Variants => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { duration, ease: "easeOut" } },
});

/** Stagger container. Default: stagger=0.1 */
export const staggerContainer = (stagger = 0.1): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
});

/** Slide-in from the right. Used for list items in StatusSection. */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
