"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../SectionHeading";
import { profile, projects } from "../../lib/portfolio";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Projects() {
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce) {
        gsap.set(".reveal", { opacity: 1, y: 0 });
      } else {
        gsap.from(".reveal", {
          y: 28,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 78%",
            once: true,
          },
        });
      }

      const cards = gsap.utils.toArray<HTMLElement>(".proj-card");
      cards.forEach((card) => {
        const underline = card.querySelector<HTMLElement>(".proj-underline");
        const arrow = card.querySelector<HTMLElement>(".proj-arrow");
        if (!underline || !arrow) return;

        gsap.set(underline, { scaleX: 0, transformOrigin: "left center" });

        const enter = () => {
          gsap.to(underline, {
            scaleX: 1,
            duration: 0.45,
            ease: "power3.out",
          });
          gsap.to(arrow, { x: 4, duration: 0.3, ease: "power2.out" });
        };
        const leave = () => {
          gsap.to(underline, {
            scaleX: 0,
            duration: 0.35,
            ease: "power3.in",
            transformOrigin: "right center",
            onComplete: () => {
              gsap.set(underline, { transformOrigin: "left center" });
            },
          });
          gsap.to(arrow, { x: 0, duration: 0.3, ease: "power2.out" });
        };

        card.addEventListener("mouseenter", enter);
        card.addEventListener("focusin", enter);
        card.addEventListener("mouseleave", leave);
        card.addEventListener("focusout", leave);
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      id="projects"
      ref={rootRef}
      className="relative w-full bg-[--background] py-28 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading index={3} title="Projects" eyebrow="Selected work" />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {projects.map((project) => {
            const primaryMetric = project.metrics?.[0];
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="proj-card reveal group relative block border border-white/8 bg-white/[0.02] p-6 transition-colors hover:border-white/20 focus:outline-none focus-visible:border-[--accent] sm:p-7"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-px w-12 bg-[--accent]"
                />

                <div className="flex items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[--muted]">
                  <span>{project.year}</span>
                  <span>{project.role}</span>
                </div>

                <h3
                  className="relative mt-4 inline-block text-2xl tracking-tight sm:text-3xl"
                  style={{
                    fontFamily:
                      "var(--font-f1-bold), system-ui, sans-serif",
                  }}
                >
                  {project.title}
                  <span
                    aria-hidden
                    className="proj-underline absolute -bottom-1 left-0 block h-[2px] w-full bg-[--accent]"
                  />
                </h3>

                <p className="mt-3 text-[15px] leading-relaxed text-[--foreground]/70">
                  {project.tagline}
                </p>

                {primaryMetric ? (
                  <div className="mt-5 inline-flex items-baseline gap-2 border border-[--accent]/30 bg-[--accent]/5 px-3 py-1.5">
                    <span
                      className="text-base text-[--accent]"
                      style={{
                        fontFamily:
                          "var(--font-f1-bold), system-ui, sans-serif",
                      }}
                    >
                      {primaryMetric.value}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[--foreground]/70">
                      {primaryMetric.label}
                    </span>
                  </div>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[--foreground]/65"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 5 ? (
                    <span className="px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[--foreground]/45">
                      +{project.stack.length - 5}
                    </span>
                  ) : null}
                </div>

                <div className="mt-7 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-[--foreground]/75">
                  <span>View case study</span>
                  <span
                    aria-hidden
                    className="proj-arrow inline-block text-[--accent]"
                  >
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="reveal mt-10 flex justify-end">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[--foreground]/70 transition-colors hover:text-[--foreground]"
          >
            View more on GitHub
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-1"
            >
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
