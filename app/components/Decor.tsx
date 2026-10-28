// Decorative shapes that give the site its soft, moving look. All purely visual
// (hidden from screen readers).
import Image from "next/image";

// A wavy edge between two sections. Put it at the bottom of a section and give it
// the colour of the section that comes next.
export function Wave({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      // -my-px overlaps the neighbouring sections by a pixel so no hairline shows.
      className={`relative -my-px block h-[60px] w-full sm:h-[90px] ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path
        fill="currentColor"
        d="M0,64 C180,120 360,120 540,84 C720,48 840,8 1020,20 C1200,32 1320,84 1440,72 L1440,120 L0,120 Z"
      />
    </svg>
  );
}

// A photo inside a slowly shape-shifting blob, with a coloured blob behind it.
export function BlobPhoto({
  src,
  alt,
  backdrop = "bg-peach",
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  backdrop?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative aspect-square w-full ${className}`}>
      <div
        aria-hidden
        className={`absolute -inset-4 animate-blob ${backdrop} opacity-80 sm:-inset-6`}
        style={{ animationDelay: "-6s" }}
      />
      <div className="absolute inset-0 animate-blob overflow-hidden shadow-xl shadow-cocoa/10">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

// Little floating dots and rings, like scattered sprinkles.
export function Sprinkles({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className="absolute left-[8%] top-[18%] h-3 w-3 animate-float rounded-full bg-rose" />
      <span
        className="absolute left-[44%] top-[10%] h-5 w-5 animate-float-slow rounded-full border-2 border-rose-deep/40"
        style={{ animationDelay: "-3s" }}
      />
      <span
        className="absolute bottom-[22%] left-[4%] h-2 w-6 animate-float rounded-full bg-peach"
        style={{ animationDelay: "-2s" }}
      />
      <span
        className="absolute right-[6%] top-[12%] h-4 w-4 animate-float-slow rounded-full bg-mauve"
        style={{ animationDelay: "-5s" }}
      />
      <span
        className="absolute bottom-[12%] right-[38%] h-2.5 w-2.5 animate-float rounded-full bg-rose-deep/50"
        style={{ animationDelay: "-4s" }}
      />
    </div>
  );
}
