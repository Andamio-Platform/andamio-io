import { cn } from "~/utils/shadcn";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

export const CourseCardHoverEffect = ({
  course,
  idx,
}: {
  course: {
    title: string;
    description: string;
    link: string;
  };
  idx: number;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const animate = true;
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };

  return (
    <Link
      href={course.link}
      key={course.link}
      className="group relative  block h-full w-full p-2"
      onMouseEnter={() => setHoveredIndex(idx)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <AnimatePresence>
        {hoveredIndex === idx && (
          // <motion.span
          //   className="absolute inset-0 h-full w-full bg-secondary-foreground dark:bg-slate-800/[0.8] block  rounded-3xl"
          //   layoutId="hoverBackground"
          //   initial={{ opacity: 0 }}
          //   animate={{
          //     opacity: 1,
          //     transition: { duration: 0.15 },
          //   }}
          //   exit={{
          //     opacity: 0,
          //     transition: { duration: 0.15, delay: 0.2 },
          //   }}
          // />
          <>
            <motion.div
              variants={animate ? variants : undefined}
              initial={animate ? "initial" : undefined}
              animate={animate ? "animate" : undefined}
              transition={
                animate
                  ? {
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }
                  : undefined
              }
              style={{
                backgroundSize: animate ? "400% 400%" : undefined,
              }}
              className={cn(
                "absolute inset-0 z-[1] rounded-3xl opacity-60 blur-xl transition  duration-500 group-hover:opacity-100",
                " bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]",
              )}
            />
            <motion.div
              variants={animate ? variants : undefined}
              initial={animate ? "initial" : undefined}
              animate={animate ? "animate" : undefined}
              transition={
                animate
                  ? {
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }
                  : undefined
              }
              style={{
                backgroundSize: animate ? "400% 400%" : undefined,
              }}
              className={cn(
                "absolute inset-0 z-[1] rounded-3xl",
                "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]",
              )}
            />
          </>
        )}
      </AnimatePresence>
      <Card>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>
          <span className="truncate">{course.description}</span>
        </CardDescription>
      </Card>
    </Link>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "dark:borderbackground relative z-20 h-full w-full overflow-hidden rounded-2xl border border-transparent bg-primary p-4 group-hover:border-slate-700",
        className,
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("mt-4 font-bold tracking-wide text-zinc-100", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-sm leading-relaxed tracking-wide text-zinc-400",
        className,
      )}
    >
      {children}
    </p>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento dark:borderbackground row-span-1 flex flex-col justify-between space-y-4 rounded-sm border border-transparent bg-primary p-4 shadow-input transition duration-200 hover:shadow-xl dark:bg-primary dark:shadow-none",
        className,
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mb-2 mt-2 font-sans font-bold text-neutral-600 dark:text-neutral-200">
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
