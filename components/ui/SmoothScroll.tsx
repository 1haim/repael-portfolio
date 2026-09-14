"use client";

import { useEffect } from "react";
import { initLenis } from "@/lib/lenis";

/** Mounts Lenis smooth scroll for the whole page. Renders nothing. */
export default function SmoothScroll() {
  useEffect(() => initLenis(), []);
  return null;
}
