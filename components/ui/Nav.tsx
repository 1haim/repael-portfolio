"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { nav } from "@/data/content";
import { useMotion } from "@/lib/motion";
import { scrollToElement } from "@/lib/lenis";

/**
 * Fixed, minimal navigation. Tab order: skip link (in layout) → "Reduce
 * animations" switch → section links. On mobile the links collapse into a
 * simple expanding list. No overlay menu.
 */
export default function Nav() {
  const { reduced, ready, setReduced } = useMotion();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [announce, setAnnounce] = useState("");
  const listId = useId();
  const liveTimer = useRef<number | null>(null);

  // Backdrop appears only once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const ids = nav.links.map((l) => l.href.slice(1));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const onToggle = useCallback(() => {
    const next = !reduced;
    setReduced(next);
    setAnnounce(next ? nav.toggle.announceReduced : nav.toggle.announceEnabled);
    if (liveTimer.current) window.clearTimeout(liveTimer.current);
    liveTimer.current = window.setTimeout(() => setAnnounce(""), 2500);
  }, [reduced, setReduced]);

  const onLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      e.preventDefault();
      setOpen(false);
      scrollToElement(target, { reduced, offset: 0 });
      history.pushState(null, "", href);
      // Move focus for keyboard and screen-reader users without a second scroll.
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    },
    [reduced],
  );

  const linkClass = (isActive: boolean) =>
    `text-link relative inline-block py-1 text-sm font-medium tracking-[0.02em] text-ink ${
      isActive ? "after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:bg-accent" : ""
    }`;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <nav
        aria-label={nav.ariaLabel}
        className={`pointer-events-auto ml-auto flex w-fit max-w-full items-center gap-5 rounded-bl-lg px-4 py-3 transition-[background-color,box-shadow] duration-500 ease-out sm:gap-7 sm:px-6 ${
          scrolled || open ? "bg-bg/90 shadow-[0_1px_0_0_var(--rule)] backdrop-blur-md" : "bg-transparent"
        }`}
      >
        {/* Reduce animations switch — second tab stop on the page */}
        <button
          type="button"
          role="switch"
          aria-checked={ready ? reduced : false}
          onClick={onToggle}
          className="text-link flex shrink-0 items-center gap-2.5 py-1 text-sm font-medium text-ink"
        >
          <span
            aria-hidden="true"
            className={`relative inline-block h-[18px] w-[32px] rounded-full border transition-colors duration-300 ease-out ${
              ready && reduced ? "border-accent bg-accent" : "border-ink/40 bg-transparent"
            }`}
          >
            <span
              className={`absolute top-[2px] h-[12px] w-[12px] rounded-full transition-[left,background-color] duration-300 ease-out ${
                ready && reduced ? "left-[16px] bg-white" : "left-[2px] bg-ink/60"
              }`}
            />
          </span>
          <span>{nav.toggle.label}</span>
        </button>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((v) => !v)}
          className="text-link py-1 text-sm font-medium text-ink md:hidden"
        >
          {open ? nav.closeLabel : nav.menuLabel}
        </button>

        {/* Section links */}
        <ul
          id={listId}
          className={`${
            open ? "flex" : "hidden"
          } absolute right-0 top-full w-56 flex-col gap-3 rounded-bl-lg bg-bg/95 px-6 py-5 shadow-[0_1px_0_0_var(--rule)] backdrop-blur-md md:static md:flex md:w-auto md:flex-row md:items-center md:gap-6 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-0`}
        >
          {nav.links.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => onLinkClick(e, link.href)}
                  aria-current={isActive ? "true" : undefined}
                  className={linkClass(isActive)}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <p role="status" aria-live="polite" className="sr-only">
        {announce}
      </p>
    </header>
  );
}
