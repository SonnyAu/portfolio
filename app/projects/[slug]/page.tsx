import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, profile, projects } from "../../lib/portfolio";

type PageParams = { slug: string };

export function generateStaticParams(): PageParams[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project not found — Sonny Au" };
  }
  return {
    title: `${project.title} — Sonny Au`,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const hasLinks = Boolean(project.links.live || project.links.github);

  return (
    <main className="relative w-full bg-[--background] text-[--foreground]">
      <div
        className="bg-grid pointer-events-none absolute inset-0 top-0 h-[480px] opacity-[0.07]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-5xl px-6 pb-24 pt-32 sm:pt-40">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[--foreground]/70 transition-colors hover:text-[--foreground]"
        >
          <span aria-hidden>←</span> Back to projects
        </Link>

        <header className="mt-10 border-b border-white/8 pb-12">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.35em] text-[--muted]">
            <span className="text-[--accent]">{project.year}</span>
            <span aria-hidden className="h-3 w-px bg-[--muted]/40" />
            <span>{project.role}</span>
          </div>

          <h1
            className="mt-5 text-4xl tracking-tight sm:text-6xl md:text-7xl md:leading-[0.95]"
            style={{
              fontFamily: "var(--font-f1-bold), system-ui, sans-serif",
            }}
          >
            {project.title}
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-[--foreground]/75 sm:text-xl">
            {project.tagline}
          </p>

          {hasLinks ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.live ? (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[--accent] bg-[--accent]/10 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.3em] transition-colors hover:bg-[--accent]/20"
                >
                  Live site <span aria-hidden>↗</span>
                </a>
              ) : null}
              {project.links.github ? (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.3em] transition-colors hover:border-white/40"
                >
                  GitHub <span aria-hidden>↗</span>
                </a>
              ) : null}
            </div>
          ) : null}
        </header>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_240px]">
          <div className="space-y-12">
            <section>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-[--accent]">
                Overview
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-[--foreground]/80">
                {project.summary}
              </p>
            </section>

            <section>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-[--accent]">
                Highlights
              </h2>
              <ul className="mt-5 space-y-3">
                {project.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex gap-3 text-[15px] leading-relaxed text-[--foreground]/80"
                  >
                    <span
                      aria-hidden
                      className="mt-2 inline-block h-px w-4 shrink-0 bg-[--accent]"
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            {project.metrics?.length ? (
              <section>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-[--accent]">
                  Metrics
                </h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="border border-white/8 bg-white/[0.02] p-5"
                    >
                      <div
                        className="text-3xl tracking-tight text-[--accent] sm:text-4xl"
                        style={{
                          fontFamily:
                            "var(--font-f1-bold), system-ui, sans-serif",
                        }}
                      >
                        {m.value}
                      </div>
                      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-[--muted]">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-[--muted]">
                Stack
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[--foreground]/75"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-[--muted]">
                Role
              </h3>
              <p className="mt-3 text-sm text-[--foreground]/80">
                {project.role}
              </p>
            </div>

            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-[--muted]">
                Year
              </h3>
              <p
                className="mt-3 text-lg text-[--accent]"
                style={{
                  fontFamily: "var(--font-f1-bold), system-ui, sans-serif",
                }}
              >
                {project.year}
              </p>
            </div>
          </aside>
        </div>

        <footer className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-[--muted]">
          <Link
            href="/#projects"
            className="transition-colors hover:text-[--foreground]"
          >
            ← All projects
          </Link>
          <a
            href={`mailto:${profile.email}`}
            className="transition-colors hover:text-[--foreground]"
          >
            Get in touch →
          </a>
        </footer>
      </div>
    </main>
  );
}
