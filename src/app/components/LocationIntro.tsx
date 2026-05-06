"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LocationIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<SVGGElement>(null);
  const textRef = useRef<SVGTextElement>(null);

  useGSAP(() => {
    // Pin the section and expand the mask on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%",
        scrub: 1,
        pin: true,
      },
    });

    // We animate the mask to grow massive, revealing the background video fully
    tl.to(maskRef.current, {
      scale: 50,
      ease: "power2.inOut",
    });

    // Fade out the text as it zooms
    tl.to(textRef.current, {
      opacity: 0,
      duration: 0.2,
    }, "<");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="location-intro-container">
      <div className="location-video-bg">
        <video 
          src="https://player.vimeo.com/progressive_redirect/playback/1078075663/rendition/720p/file.mp4?loc=external&log_user=0&signature=110f217f491f9e35131f0c761f720ac63b6adeccc29197ee1278dc338def161c" 
          autoPlay 
          muted 
          loop 
          playsInline
        />
      </div>
      
      <div className="location-mask-layer">
        <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="textMask">
              <rect width="100%" height="100%" fill="white" />
              <g ref={maskRef} style={{ transformOrigin: "center" }}>
                <text 
                  x="50%" 
                  y="50%" 
                  fill="black" 
                  textAnchor="middle" 
                  dominantBaseline="middle"
                  fontFamily="var(--font-secondary)"
                  fontSize="8vw"
                  fontWeight="normal"
                  ref={textRef}
                >
                  Los Angeles
                </text>
              </g>
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="var(--color-body)" mask="url(#textMask)" />
        </svg>
      </div>
    </div>
  );
}
