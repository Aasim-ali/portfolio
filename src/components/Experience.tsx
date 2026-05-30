"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const experiences = [
  {
    period: "2024 — Present",
    duration: "1 Year",
    role: "MERN Stack Developer",
    company: "Ambient Infotech",
    description:
      "Building and maintaining full-stack web applications using MongoDB, Express, React, and Node.js. Delivering scalable features, REST APIs, and responsive UIs for client-facing products.",
    highlights: ["React & Next.js", "Node.js APIs", "MongoDB", "Production deployments"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = listRef.current?.querySelectorAll(".exp-item");
      if (items?.length) {
        gsap.fromTo(
          items,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 80%",
            },
          }
        );
      }

      gsap.fromTo(
        ".exp-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative py-32 md:py-48 px-6 md:px-20">
      <div className="max-w-7xl mx-auto mb-24">
        <div className="flex items-center gap-6">
          <span className="section-label">02 — Experience</span>
          <div className="divider-line" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-primary mb-4">
            Where I&apos;ve <span className="gradient-text">worked.</span>
          </h2>
          <p className="text-secondary text-lg max-w-xl">
            Professional experience building real-world products with modern web technologies.
          </p>
        </div>

        <div ref={listRef} className="relative">
          <div
            className="exp-line absolute left-[7px] md:left-[11px] top-2 bottom-2 w-px origin-top"
            style={{ background: "linear-gradient(180deg, var(--accent), var(--accent2), transparent)" }}
          />

          <div className="flex flex-col gap-8">
            {experiences.map((exp) => (
              <div key={exp.company} className="exp-item relative pl-10 md:pl-14">
                <span
                  className="absolute left-0 top-6 h-[15px] w-[15px] md:h-[23px] md:w-[23px] rounded-full border-2"
                  style={{
                    borderColor: "var(--accent)",
                    background: "var(--background)",
                    boxShadow: "0 0 12px var(--accent-glow)",
                  }}
                />

                <div className="glass-card rounded-3xl p-8 md:p-10 hover:border-[var(--accent-border)] transition-all duration-300 group">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                      <p className="section-label mb-2">{exp.period}</p>
                      <h3 className="text-2xl md:text-3xl font-bold text-primary group-hover:gradient-text transition-all">
                        {exp.role}
                      </h3>
                      <p className="text-lg font-semibold mt-1" style={{ color: "var(--accent)" }}>
                        {exp.company}
                      </p>
                    </div>
                    <span className="tag-pill shrink-0 self-start">{exp.duration}</span>
                  </div>

                  <p className="text-secondary leading-relaxed mb-6 max-w-2xl">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((tag) => (
                      <span key={tag} className="tag-pill">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
