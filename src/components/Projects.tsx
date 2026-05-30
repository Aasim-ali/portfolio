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
    link: "http://187.127.155.185:3000/"
  },
  {
    id: "02",
    title: "My-Ai",
    category: "Next.js · Django · OpenRouterApis",
    description: "Resilient AI Assistant powered by Next.js & Django. Features a custom failover logic across 5+ OpenRouter models to deliver a premium, 'always-on' AI experience completely on the free tier.",
    tags: ["Next.js", "Django", "OpenRouterApis"],
    link: "https://my-ai-next.vercel.app/"
  },
];

function getScrollDistance(track: HTMLElement) {
  return Math.max(0, track.scrollWidth - window.innerWidth);
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const track = trackRef.current;
    const section = sectionRef.current;
    const arrow = arrowRef.current;
    if (!track || !section) return;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getScrollDistance(track),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance(track)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (arrow) {
        gsap.to(arrow, {
          x: 8,
          repeat: -1,
          yoyo: true,
          duration: 1.2,
          ease: "power1.inOut",
        });
      }
    }, section);

    const refresh = () => {
      ScrollTrigger.refresh(true);
    };

    const t = setTimeout(refresh, 200);
    window.addEventListener("resize", refresh);

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-20 pt-8 flex items-center gap-6">
        <span className="section-label">03 — Selected Works</span>
        <div className="divider-line" />
        <span className="section-label opacity-60">{projects.length} projects</span>
      </div>

      <div className="h-screen flex items-center">
        <div ref={trackRef} className="flex gap-6 md:gap-10 px-6 md:px-20 will-change-transform">
          <div className="shrink-0 w-[80vw] md:w-[38vw] flex flex-col justify-center gap-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              <span className="text-primary">Work that</span>
              <br />
              <span className="gradient-text">speaks for</span>
              <br />
              <span className="text-faint">itself.</span>
            </h2>
            <p className="text-secondary text-base leading-relaxed max-w-sm">
              Every project is built with performance, scalability, and a pixel-perfect eye for detail.
            </p>
            <div className="flex items-center gap-2 text-tertiary text-sm mt-4">
              <span>Scroll to explore</span>
              <span ref={arrowRef} className="inline-block text-[var(--accent)]">→</span>
            </div>
          </div>

          {projects.map((p) => (
            <div
              key={p.id}
              className="shrink-0 w-[85vw] md:w-[55vw] h-[70vh] flex flex-col"
            >
              <div className="relative flex-1 rounded-3xl glass-card p-8 md:p-12 flex flex-col justify-between overflow-hidden group transition-transform duration-500 hover:scale-[1.015] hover:border-[var(--accent-border)]">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 80% 20%, var(--accent-soft), transparent 60%)` }}
                />

                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <span className="accent-dot" />
                    <span className="tag-pill">{p.category}</span>
                  </div>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor
                    data-cursor-label="VIEW"
                    className="p-4 rounded-full accent-btn hover:scale-110 transition-transform"
                  >
                    <BsArrowUpRightCircle size={22} />
                  </a>
                </div>

                <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[15rem] font-black leading-none text-[var(--accent)] opacity-[0.04] pointer-events-none select-none group-hover:opacity-[0.08] transition-all duration-700">
                  {p.id}
                </div>

                <div className="relative z-10">
                  <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-primary">
                    {p.title}
                  </h3>
                  <p className="text-secondary text-base md:text-lg leading-relaxed mb-8 max-w-xl">
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

          <div className="shrink-0 w-[30vw] flex items-center justify-center">
            <p className="text-tertiary text-sm section-label rotate-90 whitespace-nowrap">
              More coming soon
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
