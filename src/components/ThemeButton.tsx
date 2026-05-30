"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ACCENTS, useTheme, type AccentId, type ThemeMode } from "../context/ThemeContext";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { MdPalette } from "react-icons/md";

const POSITION_KEY = "theme-btn-pos";
const DRAG_THRESHOLD = 6;

export default function ThemeButton() {
  const { mode, accent, setMode, setAccent } = useTheme();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 24, y: 24 });
  const [dragging, setDragging] = useState(false);

  const btnRef = useRef<HTMLButtonElement>(null);
  const dragRef = useRef({
    active: false,
    moved: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(POSITION_KEY);
      if (raw) {
        const { x, y } = JSON.parse(raw);
        setPos({ x, y });
      } else {
        setPos({
          x: window.innerWidth - 72,
          y: window.innerHeight - 72,
        });
      }
    } catch {
      /* ignore */
    }
  }, []);

  const clampPosition = useCallback((x: number, y: number) => {
    const size = 52;
    const maxX = window.innerWidth - size;
    const maxY = window.innerHeight - size;
    return {
      x: Math.max(8, Math.min(x, maxX)),
      y: Math.max(8, Math.min(y, maxY)),
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    btnRef.current?.setPointerCapture(e.pointerId);
    dragRef.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startY: e.clientY,
      originX: pos.x,
      originY: pos.y,
    };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    if (
      !dragRef.current.moved &&
      Math.abs(dx) + Math.abs(dy) > DRAG_THRESHOLD
    ) {
      dragRef.current.moved = true;
    }
    const next = clampPosition(
      dragRef.current.originX + dx,
      dragRef.current.originY + dy
    );
    setPos(next);
  };

  const onPointerUp = () => {
    if (!dragRef.current.active) return;
    const wasMoved = dragRef.current.moved;
    dragRef.current.active = false;
    setDragging(false);
    localStorage.setItem(POSITION_KEY, JSON.stringify(pos));
    if (!wasMoved) setOpen((v) => !v);
  };

  useEffect(() => {
    const onResize = () => setPos((p) => clampPosition(p.x, p.y));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [clampPosition]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-label="Theme settings"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          left: pos.x,
          top: pos.y,
          touchAction: "none",
        }}
        className={`theme-fab fixed z-[9000] flex h-[52px] w-[52px] items-center justify-center rounded-full border backdrop-blur-xl transition-shadow duration-300 ${
          dragging ? "cursor-grabbing scale-105" : "cursor-grab hover:scale-110"
        } ${open ? "theme-fab-active" : ""}`}
      >
        <MdPalette size={22} className="text-[var(--accent)]" />
        <span className="theme-fab-ring" aria-hidden />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[8999] flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setOpen(false)}
        >
          {/* <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" /> */}

          <div
            className="theme-modal relative w-full max-w-md overflow-hidden rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Accent preview strip */}
            <div
              className="h-2 w-full"
              style={{
                background: `linear-gradient(90deg, var(--accent), var(--accent2), var(--accent))`,
              }}
            />

            <div className="p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="section-label mb-1">Appearance</p>
                  <h3 className="text-xl font-bold text-[var(--foreground)]">
                    Customize theme
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted-fg)] hover:text-[var(--foreground)] transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Mode toggle */}
              <p className="section-label mb-3">Mode</p>
              <div className="mb-8 grid grid-cols-2 gap-3">
                {(["dark", "light"] as ThemeMode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`theme-mode-btn flex flex-col items-center gap-3 rounded-2xl border p-4 transition-all duration-300 ${
                      mode === m ? "theme-mode-btn-active" : ""
                    }`}
                  >
                    <div
                      className={`flex h-14 w-full items-center justify-center rounded-xl ${
                        m === "dark"
                          ? "bg-[#0a0a0a] border border-white/10"
                          : "bg-white border border-black/10"
                      }`}
                    >
                      {m === "dark" ? (
                        <HiOutlineMoon size={24} className="text-white/80" />
                      ) : (
                        <HiOutlineSun size={24} className="text-amber-500" />
                      )}
                    </div>
                    <span className="text-sm font-medium capitalize text-[var(--foreground)]">
                      {m}
                    </span>
                  </button>
                ))}
              </div>

              {/* Accent picker */}
              <p className="section-label mb-3">Accent color</p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {(Object.entries(ACCENTS) as [AccentId, (typeof ACCENTS)[AccentId]][]).map(
                  ([id, { label, primary, secondary }]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setAccent(id)}
                      className={`theme-accent-btn flex flex-col items-center gap-2 rounded-2xl border p-3 transition-all duration-300 ${
                        accent === id ? "theme-accent-btn-active" : ""
                      }`}
                    >
                      <div
                        className="h-10 w-10 rounded-full transition-all"
                        style={{
                          background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                          boxShadow: accent === id ? `0 0 0 3px ${primary}55` : "none",
                        }}
                      />
                      <span className="text-xs font-medium text-[var(--muted-fg)]">
                        {label}
                      </span>
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
