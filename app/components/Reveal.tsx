"use client";
import { useEffect, useRef, useState } from "react";

// Fades and slides its children in the first time they scroll into view.
// `delay` (ms) lets items in a row appear one after another.
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } motion-reduce:translate-y-0 motion-reduce:opacity-100 ${className}`}
    >
      {children}
    </div>
  );
}
