import React from "react";
import Image from "next/image";

interface StepProps {
  stepNumber: number;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  placeholderIcon?: string;
  placeholderText?: string;
  colorScheme: "primary" | "success" | "secondary" | "accent";
  layout: "left" | "right";
}

const colorSchemes = {
  primary: {
    bg: "bg-primary",
    text: "text-primary-foreground",
    border: "border-primary/30",
    gradient: "from-primary/20 to-primary/10",
    glow: "shadow-primary/50",
  },
  success: {
    bg: "bg-success",
    text: "text-success-foreground",
    border: "border-success/30",
    gradient: "from-success/20 to-success/10",
    glow: "shadow-success/50",
  },
  secondary: {
    bg: "bg-secondary",
    text: "text-secondary-foreground",
    border: "border-secondary/30",
    gradient: "from-secondary/20 to-secondary/10",
    glow: "shadow-secondary/50",
  },
  accent: {
    bg: "bg-accent",
    text: "text-accent-foreground",
    border: "border-accent/30",
    gradient: "from-accent/20 to-accent/10",
    glow: "shadow-accent/50",
  },
};

export default function Step({
  stepNumber,
  title,
  description,
  imageSrc,
  imageAlt = "",
  placeholderIcon,
  placeholderText,
  colorScheme,
  layout,
}: StepProps) {
  const colors = colorSchemes[colorScheme];
  const isLeftLayout = layout === "left";

  const textContent = (
    <div className={`order-1 ${isLeftLayout ? "lg:order-1" : "lg:order-2"}`}>
      <div className="mb-3 sm:mb-4 flex items-center gap-2.5 sm:gap-3">
        <div
          className={`flex h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full ${colors.bg} text-lg sm:text-xl font-bold ${colors.text} shadow-lg flex-shrink-0`}
        >
          {stepNumber}
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
          {title}
        </h3>
      </div>
      <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );

  const imageContent = (
    <div
      className={`order-2 ${isLeftLayout ? "lg:order-2" : "lg:order-1"} flex items-center justify-center`}
    >
      <div className="group relative w-full max-w-4xl">
        <div
          className={`absolute -inset-1 rounded-xl bg-gradient-to-r ${colors.gradient} opacity-50 blur-xl transition duration-500 group-hover:opacity-75`}
        ></div>
        <div className={`relative overflow-hidden rounded-xl border-2 ${colors.border} bg-card shadow-2xl max-h-[60vh]`}>
          {imageSrc ? (
            <div className="relative w-full aspect-video max-h-[60vh]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw"
                className="object-contain"
              />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent/5 to-muted/30 p-4 sm:p-6 lg:p-8 min-h-[30vh]">
              <div className="text-center">
                <div className="mb-2 sm:mb-3 text-3xl sm:text-4xl lg:text-5xl">
                  {placeholderIcon}
                </div>
                <div className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                  Screenshot placeholder
                </div>
                <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground">
                  {placeholderText}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-w-full h-full flex items-center justify-center snap-center px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div
          className={`grid items-center gap-6 sm:gap-8 lg:gap-12 ${isLeftLayout ? "lg:grid-cols-[1fr,1.2fr]" : "lg:grid-cols-[1.2fr,1fr]"}`}
        >
          {textContent}
          {imageContent}
        </div>
      </div>
    </div>
  );
}
