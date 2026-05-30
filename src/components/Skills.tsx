"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

const skills = [
  { name: "React / Next.js", level: 90 },
  { name: "Node.js / Express", level: 85 },
  { name: "MongoDB", level: 82 },
  { name: "TypeScript", level: 78 },
  { name: "Java", level: 70 },
  { name: "Python", level: 68 },
];

const tools = [
  "Git", "VS Code", "Postman", "Figma", "Docker (basics)", "Linux", "REST APIs", "WebSockets",
];

function SkillBar({ name, level }: { name: string; level: number }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (barRef.current) {
        gsap.fromTo(barRef.current,
          { width: 0 },
          {
            width: `${level}%`,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: barRef.current,
              start: "top 90%",
            }
          }
        );
      }
    });
    return () => ctx.revert();
  }, [level]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-primary">{name}</span>
        <span className="text-xs text-[var(--accent)] font-mono">{level}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, var(--accent), var(--accent2))" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    let ctx = gsap.context(() => {
      if (titleRef.current) {
        const split = new SplitText(titleRef.current, { type: "lines,words" });
        gsap.fromTo(split.words,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
            }
          }
        );
      }

      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 85%",
            }
          }
        );
      }

      if (toolsRef.current) {
        const toolItems = toolsRef.current.querySelectorAll(".tool-item");
        gsap.fromTo(toolItems,
          { opacity: 0, scale: 0.88 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: toolsRef.current,
              start: "top 90%",
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 md:py-48 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-6 mb-24">
          <span className="section-label">04 — Skills</span>
          <div className="divider-line" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-32">
          <div className="flex flex-col gap-8">
            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-primary"
            >
              My stack,
              <br />
              <span className="gradient-text">front to back.</span>
            </h2>
            <div className="flex flex-col gap-6">
              {skills.map((s) => (
                <SkillBar key={s.name} {...s} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <h3
              ref={subtitleRef}
              className="text-2xl font-semibold text-secondary"
            >
              Tools & ecosystem
            </h3>
            <div ref={toolsRef} className="grid grid-cols-2 gap-3">
              {tools.map((tool) => (
                <div
                  key={tool}
                  className="tool-item p-4 rounded-xl glass-card text-sm text-primary font-medium transition-all hover:border-[var(--accent)] hover:scale-105"
                >
                  {tool}
                </div>
              ))}
            </div>

            <div
              className="mt-6 p-6 rounded-2xl border"
              style={{
                background: "var(--accent-soft)",
                borderColor: "var(--accent-border)",
              }}
            >
              <p className="text-secondary text-sm mb-3 section-label">Currently learning</p>
              <div className="flex flex-wrap gap-2">
                {["Advanced Java", "System Design", "Redis", "CI/CD"].map((t) => (
                  <span key={t} className="tag-pill">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
