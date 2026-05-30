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
    description:
      "India's leading community-driven platform for blue-collar job discovery. RojAvasar simplifies hiring by connecting verified local professionals with homeowners and businesses through a scalable Next.js and Node.js ecosystem.",
    tags: ["Next.js", "React.js", "Typescript", "Node.js", "MongoDB"],
    link: "http://187.127.155.185:3000/",
  },
  {
    id: "02",
    title: "My-Ai",
    category: "Next.js · Django · OpenRouterApis",
    description:
      "Resilient AI Assistant powered by Next.js & Django. Features custom failover logic across 5+ OpenRouter models for a premium, always-on AI experience on the free tier.",
    tags: ["Next.js", "Django", "OpenRouterApis"],
    link: "https://my-ai-next.vercel.app/",
  },
];

function getScrollDistance(track: HTMLElement) {
  return Math.max(0, track.scrollWidth - window.innerWidth);
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      const refresh = () => ScrollTrigger.refresh(true);

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const scrollTween = gsap.to(track, {
          x: () => -getScrollDistance(track),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollDistance(track)}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) {
                gsap.set(progressRef.current, { scaleX: self.progress });
              }
            },
          },
        });

        const containerAnim = scrollTween;

        if (introRef.current) {
          gsap.to(introRef.current, {
            x: -120,
            opacity: 0.25,
            scale: 0.92,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${Math.min(getScrollDistance(track) * 0.35, 400)}`,
              scrub: true,
            },
          });

          gsap.from(".project-intro-line", {
            scaleX: 0,
            transformOrigin: "left center",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "top 60%",
              scrub: 1,
            },
          });
        }

        cards.forEach((card) => {
          const inner = card.querySelector(".project-card-inner");
          const number = card.querySelector(".project-number");
          const reveals = card.querySelectorAll(".project-reveal");

          if (inner && containerAnim) {
            gsap.fromTo(
              inner,
              {
                scale: 0.82,
                opacity: 0.45,
                rotateY: 14,
                filter: "blur(6px)",
              },
              {
                scale: 1,
                opacity: 1,
                rotateY: 0,
                filter: "blur(0px)",
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: containerAnim,
                  start: "left 95%",
                  end: "left 35%",
                  scrub: true,
                },
              }
            );
          }

          if (number && containerAnim) {
            gsap.fromTo(
              number,
              { x: 80, opacity: 0.03 },
              {
                x: 0,
                opacity: 0.07,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: containerAnim,
                  start: "left 90%",
                  end: "left 40%",
                  scrub: true,
                },
              }
            );
          }

          if (reveals.length && containerAnim) {
            gsap.fromTo(
              reveals,
              { y: 48, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                stagger: 0.06,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: containerAnim,
                  start: "left 85%",
                  end: "left 45%",
                  scrub: 1,
                },
              }
            );
          }
        });

        gsap.to(".project-scroll-hint", {
          opacity: 0,
          x: 20,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=200",
            scrub: true,
          },
        });

        return () => scrollTween.kill();
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(track, { clearProps: "transform" });

        if (introRef.current) {
          gsap.from(introRef.current.children, {
            y: 40,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: introRef.current,
              start: "top 88%",
            },
          });
        }

        cards.forEach((card, i) => {
          const inner = card.querySelector(".project-card-inner");
          if (!inner) return;

          gsap.fromTo(
            inner,
            { y: 70, opacity: 0, scale: 0.94, rotateX: 6 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotateX: 0,
              duration: 1,
              delay: i * 0.05,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
              },
            }
          );

          gsap.from(card.querySelectorAll(".project-reveal"), {
            y: 24,
            opacity: 0,
            stagger: 0.07,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
            },
          });
        });
      });

      const t = setTimeout(refresh, 250);
      window.addEventListener("resize", refresh);

      return () => {
        clearTimeout(t);
        window.removeEventListener("resize", refresh);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="projects-section relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-20 pt-8">
        <div className="flex items-center gap-6 mb-4">
          <span className="section-label">03 — Selected Works</span>
          <div className="divider-line" />
          <span className="section-label opacity-60">{projects.length} projects</span>
        </div>
        <div className="hidden md:block h-0.5 w-full rounded-full bg-[var(--border)] overflow-hidden">
          <div
            ref={progressRef}
            className="h-full w-full origin-left rounded-full"
            style={{
              transform: "scaleX(0)",
              background: "linear-gradient(90deg, var(--accent), var(--accent2))",
            }}
          />
        </div>
      </div>

      <div className="projects-stage md:h-screen flex md:items-center pt-24 md:pt-20 pb-16 md:pb-0">
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row gap-10 md:gap-10 px-6 md:px-20 md:will-change-transform w-full"
        >
          <div
            ref={introRef}
            className="project-intro shrink-0 w-full md:w-[38vw] flex flex-col justify-center gap-6 md:pr-4"
          >
            <div className="project-intro-line h-px w-16 mb-2 origin-left" style={{ background: "var(--accent)" }} />
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              <span className="text-primary block">Work that</span>
              <span className="gradient-text block">speaks for</span>
              <span className="text-faint block">itself.</span>
            </h2>
            <p className="text-secondary text-base leading-relaxed max-w-sm">
              Every project is built with performance, scalability, and a pixel-perfect eye for detail.
            </p>
            <div className="project-scroll-hint hidden md:flex items-center gap-3 text-tertiary text-sm mt-4">
              <span className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1 w-1 rounded-full bg-[var(--accent)] animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </span>
              <span>Scroll to explore projects</span>
            </div>
          </div>

          {projects.map((p) => (
            <div
              key={p.id}
              className="project-card shrink-0 w-full md:w-[55vw] md:h-[70vh] flex flex-col"
            >
              <div className="project-card-inner relative flex-1 min-h-[420px] md:min-h-0 rounded-3xl glass-card p-8 md:p-12 flex flex-col justify-between overflow-hidden group hover:border-[var(--accent-border)]">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 80% 20%, var(--accent-soft), transparent 60%)",
                  }}
                />

                <div className="flex items-start justify-between relative z-10">
                  <div className="project-reveal flex items-center gap-3">
                    <span className="accent-dot" />
                    <span className="tag-pill">{p.category}</span>
                  </div>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-reveal p-4 rounded-full accent-btn hover:scale-110 transition-transform"
                  >
                    <BsArrowUpRightCircle size={22} />
                  </a>
                </div>

                <div className="project-number absolute right-6 md:right-8 top-1/2 -translate-y-1/2 font-display-tight text-[10rem] md:text-[15rem] font-extrabold leading-none text-[var(--accent)] opacity-[0.05] pointer-events-none select-none">
                  {p.id}
                </div>

                <div className="relative z-10">
                  <h3 className="project-reveal text-4xl md:text-6xl font-black tracking-tighter mb-4 text-primary">
                    {p.title}
                  </h3>
                  <p className="project-reveal text-secondary text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                    {p.description}
                  </p>
                  <div className="project-reveal flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="tag-pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="project-card shrink-0 hidden md:flex w-[22vw] items-center justify-center">
            <p className="text-tertiary text-sm section-label rotate-90 whitespace-nowrap">
              More coming soon
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
