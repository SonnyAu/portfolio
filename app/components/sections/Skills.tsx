"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../SectionHeading";
import { skillsByGroup } from "../../lib/portfolio";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Skills() {
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce) {
        gsap.set(".reveal, .skill-pill", { opacity: 1, y: 0 });
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

      gsap.from(".skill-pill", {
        y: 14,
        opacity: 0,
        duration: 0.4,
        ease: "power3.out",
        stagger: { each: 0.02, from: "start" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 72%",
          once: true,
        },
      });
    },
    { scope: rootRef }
  );

  const groups = Object.entries(skillsByGroup);

  return (
    <section
      id="skills"
      ref={rootRef}
      className="relative w-full bg-[--background] py-28 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading index={4} title="Skills" eyebrow="Toolbox" />

        <div className="mt-12 divide-y divide-white/8 border-y border-white/8">
          {groups.map(([group, items]) => (
            <div
              key={group}
              className="reveal grid gap-4 py-6 sm:grid-cols-[200px_1fr] sm:gap-8 sm:py-7"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="h-px w-6 bg-[--accent]"
                />
                <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-[--foreground]/85">
                  {group}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span
                    key={item}
                    className="skill-pill border border-white/12 bg-white/[0.02] px-3 py-1.5 text-[13px] text-[--foreground]/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
