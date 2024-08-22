import { motion } from "framer-motion";
export default function MotionExample() {
  return (
    <motion.div
      className="h-48 w-48 bg-red-400"
      animate={{ x: 400, y: 400 }}
      transition={{ duration: 5 }}
    ></motion.div>
  );
}
