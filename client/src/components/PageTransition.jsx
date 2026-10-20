import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/useReducedMotion.js";

export default function PageTransition({ children }) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
      transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
