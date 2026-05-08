"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

const pillars = [
  { icon: "⚡", title: "Speed-first", desc: "Clean, optimized code that performs at scale." },
  { icon: "🎨", title: "Design-aware", desc: "I bridge the gap between design and engineering." },
  { icon: "🔗", title: "Full-Stack", desc: "From MongoDB to React — I own the entire stack." },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    let ctx = gsap.context(() => {
      // Avatar animation
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

      // Text reveal animation
      if (textRef.current) {
        const split = new SplitText(textRef.current, { type: "chars" });
        gsap.fromTo(
          split.chars,
          { color: "rgba(255,255,255,0.15)" },
          {
            color: "rgba(255,255,255,1)",
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

      // Pillars animation
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
  }, []);

  const displayText =
    "I'm a self-driven developer who codes with purpose. Every project is a chance to solve a real problem, ship something polished, and grow as an engineer. I don't just write code — I build experiences clients are proud to show off.";

  return (
    <section id="about" ref={sectionRef} className="relative py-32 md:py-48 px-6 md:px-20">
      {/* Divider */}
      <div className="max-w-7xl mx-auto mb-24">
        <div className="flex items-center gap-6">
          <span className="section-label">01 — About</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-16 md:gap-32 items-start">

        {/* Left: Avatar / Identity Card */}
        <div className="flex flex-col gap-8">
          {/* Stylized "avatar" card */}
          <div
            ref={avatarRef}
            className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-white/10 border border-white/5 p-8 flex flex-col justify-between"
          >
            {/* Top label */}
            <div className="flex justify-between items-start">
              <span className="tag-pill">Full-Stack Dev</span>
              <span className="text-white/60 text-sm font-mono">v2.0</span>
            </div>

            {/* Big initials */}
            <div className="text-center">
              <div
                className="text-[8rem] font-black leading-none gradient-text select-none"
                style={{ lineHeight: 1 }}
              >
                SA
              </div>
              <p className="mt-4 text-white font-semibold text-xl">Syed Aasim Ali</p>
              <p className="text-zinc-400 text-sm mt-1">MERN · Node · Python · Java</p>
            </div>

            {/* Bottom badges */}
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "Node", "MongoDB", "Express"].map((tech) => (
                <span key={tech} className="tag-pill">{tech}</span>
              ))}
            </div>

            {/* Decorative corner circle */}
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-violet-600/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-cyan-600/10 blur-2xl pointer-events-none" />
          </div>
        </div>

        {/* Right: Text + pillars */}
        <div className="flex flex-col gap-16">
          {/* Scroll-reveal text */}
          <div
            ref={textRef}
            className="text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.4] tracking-tight"
          >
            {displayText}
          </div>

          {/* Value pillars */}
          <div ref={pillarsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {pillars.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="pillar-card p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300 group"
              >
                <span className="text-3xl mb-4 block">{icon}</span>
                <h3 className="font-semibold text-white mb-1 group-hover:gradient-text transition-all">{title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
