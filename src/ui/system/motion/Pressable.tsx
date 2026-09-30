"use client";

import React from "react";
import { motion } from "motion/react";
import { motion as motionTok } from "../tokens";
import { useMotionGate } from "./useMotionGate";

type PressableProps = {
  as?: "a" | "button" | "span";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  disabled?: boolean;
  "aria-disabled"?: boolean | "true" | "false";
};

/**
 * Warm Index press feedback — scale only (no glow shadows).
 * Nest hover transition per cds-motion-framer gesture pitfall #6.
 */
export function Pressable({
  as,
  href,
  onClick,
  type = "button",
  className,
  style,
  children,
  disabled,
  "aria-disabled": ariaDisabled,
}: PressableProps) {
  const reduce = useMotionGate();
  const tag: "a" | "button" | "span" =
    as ?? (href ? "a" : onClick ? "button" : "span");

  if (reduce || disabled || ariaDisabled === true || ariaDisabled === "true") {
    if (tag === "a" && href) {
      return (
        <a href={href} onClick={onClick} className={className} style={style}>
          {children}
        </a>
      );
    }
    if (tag === "button") {
      return (
        <button
          type={type}
          onClick={onClick}
          className={className}
          style={style}
          disabled={disabled}
          aria-disabled={ariaDisabled}
        >
          {children}
        </button>
      );
    }
    return (
      <span className={className} style={style} aria-disabled={ariaDisabled}>
        {children}
      </span>
    );
  }

  const gesture = {
    whileHover: {
      scale: motionTok.press.hoverScale,
      transition: { duration: motionTok.duration.press },
    },
    whileTap: { scale: motionTok.press.tapScale },
    transition: motionTok.spring.press,
  };

  if (tag === "a" && href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        className={className}
        style={style}
        {...gesture}
      >
        {children}
      </motion.a>
    );
  }
  if (tag === "button") {
    return (
      <motion.button
        type={type}
        onClick={onClick}
        className={className}
        style={style}
        {...gesture}
      >
        {children}
      </motion.button>
    );
  }
  return (
    <motion.span className={className} style={style} {...gesture}>
      {children}
    </motion.span>
  );
}
