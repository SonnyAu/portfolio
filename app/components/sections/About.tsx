"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../SectionHeading";
import { education, profile } from "../../lib/portfolio";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function About() {
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        gsap.set(".reveal", { opacity: 1, y: 0 });
        return;
      }

      gsap.from(".reveal", {
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
      id="about"
      ref={rootRef}
      className="relative w-full bg-[--background] py-28 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading index={1} title="About" eyebrow="Profile" />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 text-[--foreground]/80">
            <p className="reveal text-lg leading-relaxed sm:text-xl">
              {profile.bio}
            </p>
            <p className="reveal text-base leading-relaxed text-[--foreground]/65">
              I care about the boring stuff that makes products feel fast and
              trustworthy: clean data models, considered animation, accessible
              defaults, and APIs that don&apos;t break under load. I&apos;m
              equally happy in a frontend codebase tightening type errors or in
              a backend rewriting a 900%-slower email pipeline.
            </p>
            <p className="reveal text-base leading-relaxed text-[--foreground]/65">
              Outside of work I&apos;m usually building something small for
              myself — a track database, a fantasy F1 team manager, a browser
              D&amp;D companion — or pulling apart a model to see how it
              ticks.
            </p>
          </div>

          <aside className="reveal relative border border-white/8 bg-white/[0.02] p-7 backdrop-blur-sm">
            <div
              aria-hidden
              className="absolute -left-px top-6 h-12 w-[3px] bg-[--accent]"
            />
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-[--muted]">
              <span>Education</span>
              <span className="text-[--foreground]/55">
                {education.dates}
              </span>
            </div>

            <h3
              className="mt-4 text-xl tracking-tight sm:text-2xl"
              style={{
                fontFamily: "var(--font-f1-bold), system-ui, sans-serif",
              }}
            >
              {education.school}
            </h3>
            <p className="mt-1 text-[--foreground]/75">{education.degree}</p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.25em] text-[--accent]">
              GPA {education.gpa}
            </p>

            <div className="mt-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[--muted]">
                Relevant coursework
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {education.coursework.map((c) => (
                  <span
                    key={c}
                    className="border border-white/10 px-2.5 py-1 text-[11px] text-[--foreground]/70"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
