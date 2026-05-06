"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroller({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Keep GSAP ScrollTrigger in sync with Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Sync GSAP ticker with Lenis requestAnimationFrame
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // GSAP passes time in seconds, Lenis needs ms
    });

    // GSAP should not lag behind Lenis
    gsap.ticker.lagSmoothing(0);

    // Global Reveal Animation System
    // We target anything with the .reveal-up class
    const revealElements = gsap.utils.toArray<HTMLElement>('.reveal-up');
    
    revealElements.forEach((el) => {
      gsap.fromTo(el, 
        { 
          y: 60, 
          opacity: 0 
        }, 
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%", // trigger when the top of the element hits 85% down the viewport
            toggleActions: "play none none reverse", // play on enter, reverse on leave
          }
        }
      );
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
}
