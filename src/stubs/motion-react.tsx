import * as React from "react";

type MotionProps<T extends keyof JSX.IntrinsicElements> =
  React.ComponentPropsWithoutRef<T> & {
    animate?: unknown;
    initial?: unknown;
    transition?: unknown;
    whileInView?: unknown;
    whileHover?: unknown;
    variants?: unknown;
    viewport?: unknown;
  };

function createMotionComponent<T extends keyof JSX.IntrinsicElements>(tag: T) {
  return React.forwardRef<HTMLElement, MotionProps<T>>(function MotionComponent(
    {
      animate,
      initial,
      transition,
      whileInView,
      whileHover,
      variants,
      viewport,
      ...rest
    },
    ref,
  ) {
    return React.createElement(tag, { ref, ...rest });
  });
}

const motion = new Proxy(
  {},
  {
    get: (_target, key: string) =>
      createMotionComponent(key as keyof JSX.IntrinsicElements),
  },
) as Record<string, React.ComponentType<any>>;

const AnimatePresence: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => <>{children}</>;

export { motion, AnimatePresence };
