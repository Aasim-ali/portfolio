"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const links = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Initial nav animation
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );
    }
  }, []);

  // Hamburger & Menu animation
  useEffect(() => {
    if (menuOpen) {
      gsap.to(".line-1", { rotate: 45, y: 7, duration: 0.3 });
      gsap.to(".line-2", { opacity: 0, duration: 0.3 });
      gsap.to(".line-3", { rotate: -45, y: -7, duration: 0.3 });
      
      // Open menu
      gsap.to(menuRef.current, { opacity: 1, y: 0, duration: 0.3, display: "flex" });
      gsap.fromTo(".menu-link", { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.3, delay: 0.1 });
    } else {
      gsap.to(".line-1", { rotate: 0, y: 0, duration: 0.3 });
      gsap.to(".line-2", { opacity: 1, duration: 0.3 });
      gsap.to(".line-3", { rotate: 0, y: 0, duration: 0.3 });
      
      // Close menu
      gsap.to(menuRef.current, { opacity: 0, y: -20, duration: 0.3, display: "none" });
    }
  }, [menuOpen]);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`px-6 md:px-16 py-5 flex items-center justify-end transition-all duration-500 bg-transparent`}
      >
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-18">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="relative text-sm text-zinc-400 hover:text-white transition-colors duration-200 group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-violet-500 to-cyan-400 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 z-10"
          aria-label="Toggle menu"
        >
          <span className="line-1 block w-6 h-px bg-white origin-center" />
          <span className="line-2 block w-6 h-px bg-white" />
          <span className="line-3 block w-6 h-px bg-white origin-center" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[8000] bg-black/95 backdrop-blur-xl flex-col items-center justify-center gap-10 opacity-0 hidden"
      >
        {links.map((link) => (
          <button
            key={link.label}
            onClick={() => handleNav(link.href)}
            className="menu-link text-4xl font-bold hover:gradient-text transition-all opacity-0"
          >
            {link.label}
          </button>
        ))}
      </div>
    </>
  );
}
