"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import SALogo from "./SALogo";

gsap.registerPlugin(useGSAP);

const STORAGE_KEY = "sa-intro-played";

function finishIntro() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {}
  document.body.classList.remove("intro-active");
}

export default function IntroSequence() {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const topRailRef = useRef<HTMLDivElement | null>(null);
  const bottomRailRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const beamRef = useRef<HTMLDivElement | null>(null);
  const logoWrapRef = useRef<HTMLDivElement | null>(null);
  const streaksRef = useRef<HTMLDivElement | null>(null);

  const [mode, setMode] = useState<"pending" | "fade" | "play" | "done">(
    "pending"
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    let alreadyPlayed = false;
    try {
      alreadyPlayed = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      alreadyPlayed = false;
    }

    if (alreadyPlayed) {
      document.body.classList.remove("intro-active");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot sync from sessionStorage
      setMode("done");
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setMode(prefersReducedMotion ? "fade" : "play");
  }, []);

  useGSAP(
    () => {
      if (mode === "fade") {
        const overlay = overlayRef.current;
        if (!overlay) {
          setMode("done");
          return;
        }
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.out",
          onComplete: () => {
            finishIntro();
            setMode("done");
          },
        });
        return;
      }

      if (mode !== "play") return;

      gsap.set(sceneRef.current, { opacity: 1 });
      gsap.set(topRailRef.current, {
        opacity: 0,
        scaleX: 0.4,
        transformOrigin: "left center",
      });
      gsap.set(bottomRailRef.current, {
        opacity: 0,
        scaleX: 0.4,
        transformOrigin: "right center",
      });
      gsap.set(arrowRef.current, { opacity: 0, x: -8 });
      gsap.set(beamRef.current, {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "left center",
      });
      gsap.set(logoWrapRef.current, {
        xPercent: -220,
        scaleX: 1.5,
        filter: "blur(10px)",
        opacity: 0,
      });
      gsap.set(".sa-bracket-tr, .sa-bracket-bl", {
        strokeDasharray: 80,
        strokeDashoffset: 80,
        opacity: 0,
      });
      gsap.set(".sa-underline, .sa-underline-glow, .sa-underline-tip", {
        scaleX: 0,
      });
      gsap.set(".intro-streak", {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "left center",
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          finishIntro();
          setMode("done");
        },
      });

      tl.addLabel("dark", 0)
        .to(
          [topRailRef.current, bottomRailRef.current],
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.32,
            stagger: 0.05,
            ease: "power3.out",
          },
          "dark"
        )
        .to(
          arrowRef.current,
          {
            opacity: 0.35,
            x: 0,
            duration: 0.2,
            ease: "power2.out",
          },
          "dark+=0.12"
        )

        .addLabel("beam", 0.22)
        .to(
          beamRef.current,
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.3,
            ease: "power3.in",
          },
          "beam"
        )
        .to(
          arrowRef.current,
          {
            opacity: 0.9,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          },
          "beam+=0.05"
        )

        .addLabel("enter", 0.55)
        .to(
          logoWrapRef.current,
          {
            xPercent: 4,
            scaleX: 1.04,
            filter: "blur(0px)",
            opacity: 1,
            duration: 0.5,
            ease: "power4.out",
          },
          "enter"
        )
        .to(
          logoWrapRef.current,
          {
            xPercent: 0,
            scaleX: 1,
            duration: 0.12,
            ease: "power2.out",
          },
          ">"
        )
        .to(
          ".sa-bracket-tr, .sa-bracket-bl",
          {
            strokeDashoffset: 0,
            opacity: 0.9,
            duration: 0.35,
            stagger: 0.05,
            ease: "power3.out",
          },
          "enter+=0.25"
        )

        .addLabel("lock", 1.1)
        .to(
          beamRef.current,
          {
            opacity: 0.3,
            duration: 0.2,
            ease: "power2.out",
          },
          "lock"
        )
        .to(
          ".sa-underline, .sa-underline-glow, .sa-underline-tip",
          {
            scaleX: 1,
            duration: 0.28,
            ease: "power3.out",
          },
          "lock"
        )
        .addLabel("launch", 1.5)
        .to(
          ".intro-streak",
          {
            scaleX: 1.2,
            opacity: 1,
            duration: 0.22,
            stagger: 0.03,
            ease: "power4.in",
          },
          "launch"
        )
        .to(
          logoWrapRef.current,
          {
            xPercent: 240,
            scaleX: 1.8,
            skewX: -10,
            filter: "blur(6px)",
            duration: 0.4,
            ease: "power4.in",
          },
          "launch"
        )
        .to(
          ".sa-underline, .sa-underline-glow, .sa-underline-tip",
          {
            scaleX: 0,
            transformOrigin: "right center",
            duration: 0.2,
            ease: "power3.in",
          },
          "launch"
        )
        .to(
          ".intro-streak",
          {
            xPercent: 80,
            scaleX: 1.6,
            duration: 0.35,
            stagger: 0.025,
            ease: "power4.in",
          },
          "launch+=0.1"
        )

        .addLabel("fade", 1.6)
        .to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.35,
            ease: "power2.inOut",
          },
          "fade"
        );
    },
    { scope: overlayRef, dependencies: [mode] }
  );

  if (mode === "done") return null;

  if (mode === "pending") {
    return (
      <div
        ref={overlayRef}
        role="presentation"
        aria-hidden
        className="pointer-events-none fixed inset-0 z-50 bg-[--background]"
      />
    );
  }

  return (
    <div
      ref={overlayRef}
      role="presentation"
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      <div ref={sceneRef} className="absolute inset-0">
        <div className="absolute inset-0 bg-[--background]" />
        <div className="bg-asphalt pointer-events-none absolute inset-0" />

        <div
          ref={topRailRef}
          className="pointer-events-none absolute"
          style={{
            top: "16%",
            left: "6%",
            right: "6%",
            height: 1,
            background:
              "linear-gradient(90deg, rgba(220,220,225,0.45), rgba(255,255,255,0.9) 50%, rgba(220,220,225,0.45))",
          }}
        >
          <span
            className="absolute"
            style={{
              left: -1,
              top: -6,
              width: 1,
              height: 12,
              background: "rgba(255,255,255,0.75)",
            }}
          />
          <span
            className="absolute"
            style={{
              right: -1,
              top: -6,
              width: 1,
              height: 12,
              background: "rgba(255,255,255,0.75)",
            }}
          />
        </div>

        <div
          ref={bottomRailRef}
          className="pointer-events-none absolute"
          style={{
            top: "82%",
            left: "6%",
            right: "6%",
            height: 1,
            background:
              "linear-gradient(90deg, rgba(220,220,225,0.45), rgba(255,255,255,0.9) 50%, rgba(220,220,225,0.45))",
          }}
        >
          <span
            className="absolute"
            style={{
              left: -1,
              top: -6,
              width: 1,
              height: 12,
              background: "rgba(255,255,255,0.75)",
            }}
          />
          <span
            className="absolute"
            style={{
              right: -1,
              top: -6,
              width: 1,
              height: 12,
              background: "rgba(255,255,255,0.75)",
            }}
          />
        </div>

        <svg
          ref={arrowRef}
          className="pointer-events-none absolute"
          style={{ left: "2.5vw", top: "50%", transform: "translateY(-50%)" }}
          width={22}
          height={22}
          viewBox="0 0 22 22"
          fill="none"
        >
          <path
            d="M2 11 H17 M11 5 L17 11 L11 17"
            stroke="#e10600"
            strokeWidth={2}
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>

        <div
          ref={beamRef}
          className="pointer-events-none absolute left-0 right-0"
          style={{
            top: "calc(50% - 4px)",
            height: 8,
            background:
              "linear-gradient(90deg, transparent, rgba(225,6,0,0.85) 18%, rgba(255,255,255,0.95) 50%, rgba(225,6,0,0.85) 82%, transparent)",
            filter: "drop-shadow(0 0 14px rgba(225,6,0,0.85))",
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div
              ref={logoWrapRef}
              className="relative w-[min(520px,62vw)]"
              style={{ willChange: "transform, filter, opacity" }}
            >
              <SALogo className="block h-auto w-full" />
            </div>
          </div>
        </div>

        <div
          ref={streaksRef}
          className="pointer-events-none absolute inset-0"
        >
          {Array.from({ length: 4 }).map((_, i) => {
            const offsets = [-16, -5, 6, 17];
            return (
              <div
                key={i}
                className="intro-streak absolute"
                style={{
                  top: `calc(50% + ${offsets[i]}px)`,
                  left: 0,
                  right: 0,
                  height: 4 + i,
                  background:
                    "linear-gradient(90deg, transparent, rgba(225,6,0,0.9) 25%, rgba(255,220,220,0.95) 65%, transparent)",
                  filter: `blur(${1 + i * 0.6}px) drop-shadow(0 0 ${
                    8 + i * 3
                  }px rgba(225,6,0,0.75))`,
                  maskImage:
                    "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
