"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchor = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const hashIdx = href.indexOf("#");
    if (hashIdx === -1) return;
    const id = href.slice(hashIdx + 1);
    if (typeof window === "undefined") return;
    if (window.location.pathname !== "/") return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    setOpen(false);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/5 bg-[--background]/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6"
        aria-label="Primary"
      >
        <Link
          href="/"
          aria-label="Home"
          className="group inline-flex items-center gap-2"
          onClick={(e) => {
            if (typeof window === "undefined") return;
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <span
            className="text-[--accent] text-lg leading-none transition-transform group-hover:scale-105"
            style={{
              fontFamily: "var(--font-f1-bold), system-ui, sans-serif",
              letterSpacing: "0.02em",
              transform: "skewX(-4deg)",
              display: "inline-block",
            }}
          >
            SA
          </span>
          <span
            aria-hidden
            className="h-3 w-px bg-[--accent]/50"
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[--muted]">
            Sonny Au
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <ul className="flex items-center gap-7 font-mono text-[11px] uppercase tracking-[0.25em] text-[--foreground]/70">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleAnchor(e, link.href)}
                  className="transition-colors hover:text-[--foreground]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[--accent]/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-[--foreground] transition-colors hover:border-[--accent] hover:bg-[--accent]/10"
          >
            Résumé
          </a>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex flex-col gap-1.5 p-2"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-px w-5 bg-[--foreground] transition-transform ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-[--foreground] transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-[--foreground] transition-transform ${
              open ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/5 bg-[--background]/95 backdrop-blur-md md:hidden">
          <ul className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-6 py-4 font-mono text-sm uppercase tracking-[0.25em]">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleAnchor(e, link.href)}
                  className="block py-2 text-[--foreground]/80 transition-colors hover:text-[--foreground]"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2 text-[--accent]"
              >
                Résumé ↗
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
