"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../SectionHeading";
import { experiences } from "../../lib/portfolio";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Experience() {
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce) {
        gsap.set(".reveal", { opacity: 1, y: 0 });
        gsap.set(".exp-rail", { scaleY: 1 });
        gsap.set(".exp-dot", { scale: 1, opacity: 1 });
        return;
      }

      gsap.set(".exp-rail", {
        scaleY: 0,
        transformOrigin: "top center",
      });
      gsap.set(".exp-dot", { scale: 0, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 72%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(".exp-rail", { scaleY: 1, duration: 0.9 })
        .to(
          ".exp-dot",
          { scale: 1, opacity: 1, duration: 0.3, stagger: 0.18 },
          "-=0.6"
        )
        .from(
          ".exp-card",
          { y: 24, opacity: 0, duration: 0.55, stagger: 0.15 },
          "-=0.6"
        );

      gsap.from(".exp-heading", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 78%",
          once: true,
        },
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      id="experience"
      ref={rootRef}
      className="relative w-full bg-[--background] py-28 sm:py-32"
    >
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-6xl px-6">
        <div className="exp-heading">
          <SectionHeading index={2} title="Experience" eyebrow="Work" />
        </div>

        <div className="relative mt-14 pl-8 sm:pl-12">
          <span
            aria-hidden
            className="exp-rail absolute left-2 top-0 h-full w-px bg-gradient-to-b from-[--accent] via-[--accent]/60 to-transparent sm:left-3"
          />

          <ol className="space-y-14">
            {experiences.map((job) => (
              <li
                key={`${job.company}-${job.dates}`}
                className="relative"
              >
                <span
                  aria-hidden
                  className="exp-dot absolute -left-[26px] top-2 h-3 w-3 rounded-full bg-[--accent] shadow-[0_0_18px_rgba(225,6,0,0.5)] sm:-left-[34px]"
                />

                <div className="exp-card border border-white/8 bg-white/[0.02] p-6 backdrop-blur-sm sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3
                      className="text-xl tracking-tight sm:text-2xl"
                      style={{
                        fontFamily:
                          "var(--font-f1-bold), system-ui, sans-serif",
                      }}
                    >
                      {job.company}
                    </h3>
                    <span className="border border-[--accent]/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[--accent]">
                      {job.dates}
                    </span>
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[--foreground]/75">
                    <span>{job.title}</span>
                    <span aria-hidden className="text-[--foreground]/30">
                      ·
                    </span>
                    <span className="text-[--foreground]/55">
                      {job.location}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {job.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-[15px] leading-relaxed text-[--foreground]/75"
                      >
                        <span
                          aria-hidden
                          className="mt-2 inline-block h-px w-3 shrink-0 bg-[--accent]/70"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {job.stack.map((tech) => (
                      <span
                        key={tech}
                        className="border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[--foreground]/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
