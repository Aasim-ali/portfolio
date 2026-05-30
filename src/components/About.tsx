"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useTheme } from "../context/ThemeContext";

const pillars = [
  { icon: "⚡", title: "Speed-first", desc: "Clean, optimized code that performs at scale." },
  { icon: "🎨", title: "Design-aware", desc: "I bridge the gap between design and engineering." },
  { icon: "🔗", title: "Full-Stack", desc: "From MongoDB to React — I own the entire stack." },
];

export default function About() {
  const { mode } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    let ctx = gsap.context(() => {
      if (avatarRef.current) {
        gsap.fromTo(avatarRef.current,
          { opacity: 0, scale: 0.92 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: avatarRef.current,
              start: "top 85%",
            }
          }
        );
      }

      if (textRef.current) {
        const dimColor = mode === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";
        const fullColor = mode === "dark" ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)";
        const split = new SplitText(textRef.current, { type: "chars" });
        gsap.fromTo(
          split.chars,
          { color: dimColor },
          {
            color: fullColor,
            stagger: 0.04,
            ease: "none",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 70%",
              end: "bottom 40%",
              scrub: 1.5,
            },
          }
        );
      }

      if (pillarsRef.current) {
        const cards = pillarsRef.current.querySelectorAll(".pillar-card");
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.18,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [mode]);

  const displayText =
    "I'm a self-driven developer who codes with purpose. Every project is a chance to solve a real problem, ship something polished, and grow as an engineer. I don't just write code — I build experiences clients are proud to show off.";

  return (
    <section id="about" ref={sectionRef} className="relative py-32 md:py-48 px-6 md:px-20">
      <div className="max-w-7xl mx-auto mb-24">
        <div className="flex items-center gap-6">
          <span className="section-label">01 — About</span>
          <div className="divider-line" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-16 md:gap-32 items-start">

        <div className="flex flex-col gap-8">
          <div
            ref={avatarRef}
            className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden glass-card p-8 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <span className="tag-pill">Full-Stack Dev</span>
              <span className="text-secondary text-sm font-mono">v2.0</span>
            </div>

            <div className="text-center">
              <div
                className="font-display-tight text-[8rem] font-extrabold leading-none gradient-text select-none"
                style={{ lineHeight: 1 }}
              >
                SA
              </div>
              <p className="mt-4 text-primary font-semibold text-xl">Syed Aasim Ali</p>
              <p className="text-secondary text-sm mt-1">MERN · Node · Python · Java</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "Node", "MongoDB", "Express"].map((tech) => (
                <span key={tech} className="tag-pill">{tech}</span>
              ))}
            </div>

            <div
              className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-2xl pointer-events-none"
              style={{ background: "var(--accent-soft)" }}
            />
            <div
              className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full blur-2xl pointer-events-none"
              style={{ background: "color-mix(in srgb, var(--accent2) 12%, transparent)" }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-16">
          <div
            ref={textRef}
            className="text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.4] tracking-tight text-primary"
          >
            {displayText}
          </div>

          <div ref={pillarsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {pillars.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="pillar-card p-6 rounded-2xl glass-card hover:border-[var(--accent-border)] transition-all duration-300 group"
                style={{ background: "var(--accent-soft)" }}
              >
                <span className="text-3xl mb-4 block">{icon}</span>
                <h3 className="font-semibold text-primary mb-1 group-hover:gradient-text transition-all">{title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
