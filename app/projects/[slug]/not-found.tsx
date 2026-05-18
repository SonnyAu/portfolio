import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-svh w-full items-center justify-center bg-[--background] text-[--foreground]">
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-xl px-6 text-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[--accent]">
          404
        </div>
        <h1
          className="mt-4 text-4xl tracking-tight sm:text-5xl"
          style={{
            fontFamily: "var(--font-f1-bold), system-ui, sans-serif",
          }}
        >
          Project not found
        </h1>
        <p className="mt-4 text-[--foreground]/70">
          That slug doesn&apos;t match anything in the case studies.
        </p>
        <Link
          href="/#projects"
          className="mt-8 inline-flex items-center gap-2 border border-[--accent] bg-[--accent]/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.3em] transition-colors hover:bg-[--accent]/20"
        >
          ← Back to projects
        </Link>
      </div>
    </main>
  );
}
