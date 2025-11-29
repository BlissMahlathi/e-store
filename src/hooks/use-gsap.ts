"use client";

import { DependencyList, useLayoutEffect } from "react";
import gsap from "gsap";

/**
 * Runs a GSAP timeline in a layout-safe way (no SSR) and cleans up on unmount.
 */
export function useGsap(
  setup: (context: gsap.Context) => void,
  deps: DependencyList = [],
) {
  useLayoutEffect(() => {
    const ctx = gsap.context((context) => {
      setup(context);
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
