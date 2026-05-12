"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BsArrowUpRightCircle } from "react-icons/bs";

const projects = [
  {
    id: "01",
    title: "RojAvasar",
    category: "Node.js · Next.js · React.js",
    description: "India's leading community-driven platform for blue-collar job discovery. RojAvasar simplifies hiring by connecting verified local professionals with homeowners and businesses through a scalable Next.js and Node.js ecosystem, ensuring trust, affordability, and economic growth for millions.",
    tags: ["Next.js", "React.js", "Typescript", "Node.js", "MongoDB"],
    cardClass: "bg-white/10",
    dotClass: "bg-violet-500",
    link: "http://187.127.155.185:3000/"
  },
  {
    id: "02",
    title: "My-Ai",
    category: "Next.js · Django · OpenRouterApis",
    description: "Resilient AI Assistant powered by Next.js & Django. Features a custom failover logic across 5+ OpenRouter models to deliver a premium, 'always-on' AI experience completely on the free tier.",
    tags: ["Next.js", "Django", "OpenRouterApis"],
    cardClass: "bg-white/10",
    dotClass: "bg-cyan-500",
    link: "https://my-ai-next.vercel.app/"
  },
];


export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    // Horizontal scroll pin
    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Arrow animation
      gsap.to(".arrow-icon", {
        x: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "power1.inOut"
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden">
      {/* Fixed header label */}
      <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-20 pt-8 flex items-center gap-6">
        <span className="section-label">02 — Selected Works</span>
        <div className="flex-1 h-px bg-white/5" />
        <span className="section-label text-zinc-600">{projects.length} projects</span>
      </div>

      {/* Horizontal track */}
      <div ref={containerRef} className="h-screen flex items-center">
        <div ref={trackRef} className="flex gap-6 md:gap-10 px-6 md:px-20 will-change-transform">
          {/* Intro panel */}
          <div className="shrink-0 w-[80vw] md:w-[38vw] flex flex-col justify-center gap-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              <span className="text-white">Work that</span>
              <br />
              <span className="gradient-text">speaks for</span>
              <br />
              <span className="text-white/20">itself.</span>
            </h2>
            <p className="text-zinc-500 text-base leading-relaxed max-w-sm">
              Every project is built with performance, scalability, and a pixel-perfect eye for detail.
            </p>
            <div className="flex items-center gap-2 text-zinc-600 text-sm mt-4">
              <span>Scroll to explore</span>
              <span className="arrow-icon inline-block">→</span>
            </div>
          </div>

          {/* Project cards */}
          {projects.map((p) => (
            <div
              key={p.id}
              className="shrink-0 w-[85vw] md:w-[55vw] h-[70vh] flex flex-col"
            >
              {/* Card */}
              <div
                className={`relative flex-1 rounded-3xl ${p.cardClass} p-8 md:p-12 flex flex-col justify-between overflow-hidden group transition-transform duration-500 hover:scale-[1.015]`}
              >
                {/* Top */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`h-2 w-2 rounded-full ${p.dotClass}`} />
                    <span className="tag-pill">{p.category}</span>
                  </div>
                  <a
                    href={p.link}
                    target="_blank"
                    data-cursor
                    data-cursor-label="VIEW"
                    className="p-4 rounded-full bg-white text-black hover:scale-110 transition-transform"
                  >
                    <BsArrowUpRightCircle size={22} />
                  </a>
                </div>

                {/* Middle number */}
                <div
                  className="absolute right-8 top-1/2 -translate-y-1/2 text-[15rem] font-black leading-none text-white/[0.03] pointer-events-none select-none group-hover:text-white/[0.06] transition-all duration-700"
                >
                  {p.id}
                </div>

                {/* Bottom */}
                <div>
                  <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white">
                    {p.title}
                  </h3>
                  <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="tag-pill">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* End spacer panel */}
          <div className="shrink-0 w-[30vw] flex items-center justify-center">
            <p className="text-zinc-700 text-sm section-label rotate-90 whitespace-nowrap">
              More coming soon
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
