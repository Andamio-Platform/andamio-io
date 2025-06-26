import * as React from "react";
import { motion } from "framer-motion";

export function ToggleTextBox({ ...props }) {
  const [isToggled, setIsToggled] = React.useState(false);

  return (
    <motion.div
      onClick={() => setIsToggled(!isToggled)}
      animate={{
        backgroundColor: isToggled ? "#ff6347" : "#4682b4",
      }}
      transition={{ duration: 0.5 }}
      className="rounded-sm p-2"
    >
      {props.children}
    </motion.div>
  );
}
