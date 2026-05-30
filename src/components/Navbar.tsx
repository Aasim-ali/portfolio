"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { HiXMark } from "react-icons/hi2";

const links = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      const lines = toggleRef.current;
      if (lines) {
        gsap.to(lines.querySelector(".line-1"), { rotate: 45, y: 7, duration: 0.3 });
        gsap.to(lines.querySelector(".line-2"), { opacity: 0, duration: 0.3 });
        gsap.to(lines.querySelector(".line-3"), { rotate: -45, y: -7, duration: 0.3 });
      }
      gsap.to(menuRef.current, { opacity: 1, y: 0, duration: 0.35, display: "flex", ease: "power2.out" });
      gsap.fromTo(
        ".menu-link",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.4, delay: 0.12, ease: "power3.out" }
      );
      gsap.fromTo(
        ".menu-close-btn",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, delay: 0.05, ease: "back.out(1.6)" }
      );
    } else {
      document.body.style.overflow = "";
      const lines = toggleRef.current;
      if (lines) {
        gsap.to(lines.querySelector(".line-1"), { rotate: 0, y: 0, duration: 0.3 });
        gsap.to(lines.querySelector(".line-2"), { opacity: 1, duration: 0.3 });
        gsap.to(lines.querySelector(".line-3"), { rotate: 0, y: 0, duration: 0.3 });
      }
      gsap.to(menuRef.current, { opacity: 0, y: -16, duration: 0.3, display: "none", ease: "power2.in" });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[9001] px-6 md:px-16 py-5 flex items-center justify-end bg-transparent"
      >
        <div className="hidden md:flex items-center gap-18">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="nav-link text-sm"
            >
              {link.label}
            </button>
          ))}
        </div>

        <button
          ref={toggleRef}
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden relative z-[9002] flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full backdrop-blur-md"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className="line-1 block w-5 h-px bg-[var(--foreground)] origin-center" />
          <span className="line-2 block w-5 h-px bg-[var(--foreground)]" />
          <span className="line-3 block w-5 h-px bg-[var(--foreground)] origin-center" />
        </button>
      </nav>

      <div
        ref={menuRef}
        className="fixed inset-0 z-[8000] flex-col items-center justify-center gap-8 opacity-0 hidden backdrop-blur-xl"
        style={{ background: "color-mix(in srgb, var(--background) 97%, transparent)" }}
        onClick={(e) => {
          if (e.target === menuRef.current) closeMenu();
        }}
      >
        <button
          type="button"
          onClick={closeMenu}
          aria-label="Close menu"
          className="menu-close-btn absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200 opacity-0"
        >
          <HiXMark size={26} />
        </button>

        <p className="section-label absolute top-8 left-6">Menu</p>

        <nav className="flex flex-col items-center gap-6">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="menu-link nav-link nav-link--lg text-xl font-bold text-primary opacity-0"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
