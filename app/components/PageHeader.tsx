import { Sprinkles, Wave } from "./Decor";

// The blush banner at the top of every inner page.
// `title` is the plain part of the heading, `accent` the word shown in script.
export default function PageHeader({
  eyebrow,
  title,
  accent,
  children,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden bg-blush text-cocoa">
      <Sprinkles />
      <div className="relative mx-auto max-w-3xl px-6 pb-10 pt-14 text-center sm:pt-20">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-rose-deep">
          {eyebrow}
        </p>
        <h1 className="font-display text-5xl font-semibold leading-tight sm:text-6xl">
          {title}{" "}
          <span className="font-script text-6xl font-normal text-rose-deep sm:text-7xl">
            {accent}
          </span>
        </h1>
        {children && <div className="mx-auto mt-5 max-w-xl leading-7 text-latte">{children}</div>}
      </div>
      <Wave className="text-cream" />
    </header>
  );
}
