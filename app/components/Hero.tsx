"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { profile } from "../lib/portfolio";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const play = () => {
        if (
          typeof window !== "undefined" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
          gsap.set(".hero-reveal", { opacity: 1, y: 0 });
          gsap.set(".hero-cta", { opacity: 1, y: 0 });
          return;
        }

        gsap.set(".hero-reveal", { opacity: 0, y: 20 });
        gsap.set(".hero-cta", { opacity: 0, y: 14 });

        const tl = gsap.timeline({
          delay: 0.15,
          defaults: { ease: "power3.out" },
        });

        tl.to(".hero-meta", { opacity: 1, y: 0, duration: 0.5 })
          .to(
            ".hero-name",
            { opacity: 1, y: 0, duration: 0.7 },
            "-=0.25"
          )
          .to(
            ".hero-rule",
            { opacity: 1, y: 0, duration: 0.5 },
            "-=0.4"
          )
          .to(
            ".hero-role",
            { opacity: 1, y: 0, duration: 0.5 },
            "-=0.4"
          )
          .to(
            ".hero-tagline",
            { opacity: 1, y: 0, duration: 0.55 },
            "-=0.3"
          )
          .to(
            ".hero-cta",
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.08,
              ease: "power4.out",
            },
            "-=0.25"
          );
      };

      if (!document.body.classList.contains("intro-active")) {
        play();
        return;
      }

      const observer = new MutationObserver(() => {
        if (!document.body.classList.contains("intro-active")) {
          observer.disconnect();
          play();
        }
      });

      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"],
      });

      return () => observer.disconnect();
    },
    { scope: rootRef }
  );

  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document
      .getElementById("projects")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={rootRef}
      className="relative isolate flex min-h-svh w-full flex-col justify-center overflow-hidden bg-[--background] text-[--foreground]"
    >
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.08]"
        aria-hidden
      />
      <div
        className="bg-carbon pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
      />
      <div
        className="bg-speed-lines pointer-events-none absolute inset-x-0 top-1/3 h-px"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute -left-40 top-1/2 h-[640px] w-[640px] -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(225,6,0,0.16) 0%, rgba(225,6,0,0.04) 35%, transparent 65%)",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(225,6,0,0.6), transparent)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-24 pt-32 sm:pt-40">
        <div className="hero-reveal hero-meta flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.4em] text-[--muted]">
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[--accent] shadow-[0_0_12px_rgba(225,6,0,0.8)]" />
            {profile.location}
          </span>
          <span className="hidden h-3 w-px bg-[--muted]/40 sm:inline-block" />
          <span>Currently: Cofounder @ PalAte</span>
          <span className="hidden h-3 w-px bg-[--muted]/40 sm:inline-block" />
          <span className="text-[--foreground]/70">
            Available May 2026
          </span>
        </div>

        <h1
          className="hero-reveal hero-name mt-6 text-5xl tracking-tight sm:text-7xl md:text-[96px] md:leading-[0.95]"
          style={{
            fontFamily: "var(--font-f1-bold), system-ui, sans-serif",
          }}
        >
          {profile.name}
        </h1>

        <div className="mt-4 flex items-center gap-4">
          <span
            aria-hidden
            className="hero-reveal hero-rule h-px w-12 bg-[--accent]"
          />
          <p className="hero-reveal hero-role text-xl font-light text-[--foreground]/80 sm:text-2xl">
            {profile.role}
          </p>
        </div>

        <p className="hero-reveal hero-tagline mt-8 max-w-xl text-base leading-relaxed text-[--foreground]/60 sm:text-lg">
          {profile.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            onClick={scrollToProjects}
            className="hero-cta group inline-flex items-center gap-2 border border-[--accent] bg-[--accent]/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[--foreground] transition-colors hover:bg-[--accent]/20"
          >
            View Projects
            <span
              aria-hidden
              className="inline-block transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta inline-flex items-center gap-2 border border-white/15 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[--foreground]/85 transition-colors hover:border-white/40 hover:text-[--foreground]"
          >
            GitHub
            <span aria-hidden>↗</span>
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hero-cta inline-flex items-center gap-2 border border-white/15 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[--foreground]/85 transition-colors hover:border-white/40 hover:text-[--foreground]"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
