"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, registerGsap } from "@/lib/gsap";
import { useMotion } from "@/lib/motion";

type Props = {
  src: string;
  alt: string;
  /** Intrinsic aspect ratio, width / height. Reserves space so nothing shifts. */
  aspect?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Compositional image: slightly desaturated, revealed with a clip-path wipe
 * from the bottom (1.1s, once), then drifting at a different rate than the
 * page (yPercent −15 → +15, scrubbed). The inner frame is 130% tall so the
 * drift never exposes the container edges. Corners: 4px.
 */
export default function ParallaxImage({
  src,
  alt,
  aspect = 3 / 2,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority = false,
  className = "",
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const clip = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const { reduced, ready } = useMotion();

  useGSAP(
    () => {
      registerGsap();
      const el = root.current;
      const c = clip.current;
      const i = inner.current;
      if (!el || !c || !i || !ready) return;

      if (reduced) {
        gsap.set(c, { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(i, { yPercent: 0 });
        return;
      }

      gsap.fromTo(
        c,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        },
      );
      gsap.fromTo(
        i,
        { yPercent: -11.5 },
        {
          yPercent: 11.5, // ±11.5% of a 130%-tall frame ≈ ±15% of the visible box
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: root, dependencies: [reduced, ready], revertOnUpdate: true },
  );

  return (
    <div
      ref={root}
      className={`relative w-full overflow-hidden rounded-[4px] bg-ink/5 ${className}`}
      style={{ aspectRatio: `${aspect}` }}
    >
      <div ref={clip} className="absolute inset-0" style={{ clipPath: "inset(0% 0% 0% 0%)" }}>
        <div ref={inner} className="img-treat absolute inset-x-0 -top-[15%] h-[130%]">
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
        </div>
      </div>
    </div>
  );
}
