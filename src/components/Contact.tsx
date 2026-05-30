"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { FaRegCopy } from "react-icons/fa6";
import { MdOutlineLocalPhone } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa6";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    let ctx = gsap.context(() => {
      if (ctaRef.current) {
        const split = new SplitText(ctaRef.current, { type: "lines" });
        gsap.fromTo(split.lines,
          { y: "100%", skewY: 4 },
          {
            y: "0%",
            skewY: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            }
          }
        );
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const copyPhone = () => {
    const phoneNumber = "+917850040117";

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(phoneNumber)
        .then(() => handleSuccess())
        .catch(() => fallbackCopy(phoneNumber));
    } else {
      fallbackCopy(phoneNumber);
    }
  };

  const fallbackCopy = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) handleSuccess();
    } catch {
      /* ignore */
    }

    document.body.removeChild(textArea);
  };

  const handleSuccess = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="contact" ref={sectionRef} className="relative overflow-hidden pt-32 pb-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto mb-24">
        <div className="flex items-center gap-6">
          <span className="section-label">05 — Contact</span>
          <div className="divider-line" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto">

        <div className="mb-20 overflow-hidden">
          <h2
            ref={ctaRef}
            className="text-[clamp(3rem,9vw,9rem)] font-black tracking-[-0.04em] leading-[0.85]"
          >
            <span className="text-primary block">Let&apos;s </span>
            <span className="gradient-text block">build</span>
            <span className="text-primary block">something</span>
            <span className="text-faint block">remarkable.</span>
          </h2>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-4 mb-20">
          <button
            onClick={copyPhone}
            data-cursor
            data-cursor-label="COPY"
            className="group p-6 rounded-2xl glass-card hover:border-[var(--accent)] transition-all duration-300 text-left"
          >
            <div className="flex justify-between items-start mb-6">
              <MdOutlineLocalPhone size={20} className="text-tertiary group-hover:text-[var(--accent)] transition-colors" />
              <FaRegCopy size={18} className="text-secondary group-hover:text-[var(--accent)] transition-colors" />
            </div>
            <p className="text-tertiary text-xs section-label mb-2">Phone</p>
            <p className="text-primary font-semibold text-lg group-hover:gradient-text transition-all">
              +91 7850040117
            </p>
            <p className="text-xs text-tertiary mt-1">
              {copied ? "Copied to clipboard ✓" : "Click to copy"}
            </p>
          </button>

          <a
            href="https://www.linkedin.com/in/developeraasim334/"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            data-cursor-label="OPEN"
            className="group p-6 rounded-2xl glass-card hover:border-[var(--accent)] transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <FaLinkedin size={20} className="text-tertiary group-hover:text-[var(--accent)] transition-colors" />
              <BsArrowUpRightCircle size={18} className="text-tertiary group-hover:text-[var(--accent)] transition-colors" />
            </div>
            <p className="text-tertiary text-xs section-label mb-2">LinkedIn</p>
            <p className="text-primary font-semibold text-lg group-hover:gradient-text transition-colors">
              developeraasim334
            </p>
            <p className="text-xs text-tertiary mt-1">Connect with me</p>
          </a>

          <div
            className="p-6 rounded-2xl border"
            style={{
              borderColor: "var(--accent-border)",
              background: "var(--accent-soft)",
            }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--accent)" }} />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 accent-dot" />
              </span>
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--accent)" }}>Available</span>
            </div>
            <p className="text-secondary text-sm leading-relaxed">
              Currently open to{" "}
              <strong className="text-primary">freelance projects</strong>,{" "}
              <strong className="text-primary">remote roles</strong>, and
              collaborations of any kind.
            </p>
            <p className="text-tertiary text-xs mt-4">Response within 24 hours.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8" style={{ borderTop: "1px solid var(--divider)" }}>
          <p className="text-tertiary text-sm">
            © 2025 Syed Aasim Ali — All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-tertiary text-sm">
            <span className="font-bold gradient-text">AASIM.</span>
            <span>·</span>
            <span>Built with React & GSAP</span>
          </div>
        </div>
      </div>

      <div
        className="font-display-tight absolute bottom-0 left-0 right-0 text-center text-[20vw] font-extrabold leading-none pointer-events-none select-none"
        style={{ lineHeight: 0.85, color: "var(--accent)", opacity: 0.04 }}
      >
        AASIM
      </div>
    </footer>
  );
}
