"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../SectionHeading";
import { profile } from "../../lib/portfolio";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Contact() {
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
        duration: 0.7,
        stagger: 0.1,
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

  const year = new Date().getFullYear();

  return (
    <section
      id="contact"
      ref={rootRef}
      className="bg-asphalt relative w-full overflow-hidden border-t border-white/5 py-28 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/3 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(225,6,0,0.14) 0%, rgba(225,6,0,0.04) 35%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          index={5}
          title="Get in touch"
          eyebrow="Contact"
        />

        <p className="reveal mt-10 max-w-2xl text-lg text-[--foreground]/70 sm:text-xl">
          Looking for a software engineer who ships. Open to full-time roles
          starting May 2026, interesting contract work, and side projects worth
          arguing about.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="reveal group mt-10 inline-flex items-baseline gap-4 break-all text-[--foreground] transition-colors hover:text-[--accent]"
        >
          <span
            className="text-3xl sm:text-5xl md:text-6xl"
            style={{
              fontFamily: "var(--font-f1-bold), system-ui, sans-serif",
              letterSpacing: "0.01em",
            }}
          >
            {profile.email}
          </span>
          <span
            aria-hidden
            className="hidden text-2xl text-[--accent] transition-transform group-hover:translate-x-2 sm:inline"
          >
            →
          </span>
        </a>

        <div className="reveal mt-12 grid gap-y-4 text-sm text-[--foreground]/75 sm:grid-cols-2 sm:gap-x-12">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[--muted]">
              Elsewhere
            </div>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-[--foreground]"
                >
                  github.com/SonnyAu <span aria-hidden>↗</span>
                </a>
              </li>
              <li>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-[--foreground]"
                >
                  linkedin.com/in/sonny-au <span aria-hidden>↗</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[--muted]">
              Direct
            </div>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
                  className="transition-colors hover:text-[--foreground]"
                >
                  {profile.phone}
                </a>
              </li>
              <li className="text-[--foreground]/65">{profile.location}</li>
            </ul>
          </div>
        </div>

        <div className="reveal mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-[--muted]">
          <span>© {year} Sonny Au</span>
          <span>Built with Next.js · GSAP · Tailwind</span>
        </div>
      </div>
    </section>
  );
}
