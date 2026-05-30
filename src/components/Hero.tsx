"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(".hero-badge",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.1
      );

      const split = new SplitText(".hero-title", { type: "lines" });
      tl.fromTo(split.lines, {
        y: 80,
        opacity: 0,
        skewY: 3
      }, {
        y: 0,
        opacity: 1,
        skewY: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12
      }, 0.2);

      tl.fromTo(".hero-subcopy",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.9
      );

      tl.fromTo(".hero-scroll",
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        1.5
      );

      gsap.to(".hero-scroll-line", {
        y: 6,
        repeat: -1,
        yoyo: true,
        duration: 0.7,
        ease: "power1.inOut"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  const handleWork = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden px-6 md:px-20 pt-24 pb-10">
      <div className="relative z-10 max-w-7xl mx-auto w-full">

        <div className="hero-badge mb-8" style={{ marginBottom: "2rem" }}>
          <span className="tag-pill">
            <span className="mr-2 accent-dot animate-pulse inline-block" />
            Open to freelance & full-time roles
          </span>
        </div>

        <h1 className="hero-title text-[clamp(3rem,8vw,8.5rem)] font-black tracking-[-0.04em] leading-[0.9] mb-10 select-none">
          <span className="text-primary block">Building</span>
          <span className="gradient-text block">Digital</span>
          <span className="text-primary block">Experiences</span>
          <span className="text-faint block">that convert.</span>
        </h1>

        <div className="hero-subcopy flex flex-col md:flex-row gap-10 items-start md:items-end justify-between">
          <p className="max-w-xl text-secondary text-lg md:text-xl leading-relaxed">
            I&apos;m <strong className="text-primary">Syed Aasim Ali</strong> — a MERN Stack
            developer who turns bold ideas into production-ready web &amp; mobile apps.
            <br className="hidden md:block" /> Let&apos;s build something the market hasn&apos;t seen yet.
          </p>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={handleContact}
              data-cursor
              data-cursor-label="GO"
              className="magnetic-btn accent-btn px-8 py-4 text-sm tracking-wide glow"
            >
              Get in Touch
            </button>
            <button
              onClick={handleWork}
              data-cursor
              className="magnetic-btn accent-btn-outline px-8 py-4 text-sm"
            >
              View Work ↓
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
