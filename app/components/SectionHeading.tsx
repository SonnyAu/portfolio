type SectionHeadingProps = {
  index: number;
  title: string;
  eyebrow?: string;
  className?: string;
};

export default function SectionHeading({
  index,
  title,
  eyebrow,
  className,
}: SectionHeadingProps) {
  const num = index.toString().padStart(2, "0");

  return (
    <div
      className={`reveal flex flex-col gap-3 ${className ?? ""}`}
      aria-label={title}
    >
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-[--muted]">
        <span className="text-[--accent]">{num}.</span>
        <span aria-hidden className="h-px w-8 bg-[--accent]/60" />
        {eyebrow ? <span>{eyebrow}</span> : null}
      </div>

      <div className="flex items-end gap-6">
        <h2
          className="text-3xl tracking-tight sm:text-4xl md:text-5xl"
          style={{
            fontFamily: "var(--font-f1-bold), system-ui, sans-serif",
          }}
        >
          {title}
        </h2>
        <span
          aria-hidden
          className="mb-2 hidden h-px flex-1 bg-gradient-to-r from-[--accent]/70 via-[--accent]/20 to-transparent sm:block"
        />
      </div>
    </div>
  );
}
