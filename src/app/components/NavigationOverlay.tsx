"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavigationOverlay({ isOpen, onClose }: NavigationOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const menuItems = menuListRef.current?.children;

    if (!overlay || !menuItems) return;

    if (isOpen) {
      // Open animation
      gsap.to(overlay, {
        y: "0%",
        duration: 0.8,
        ease: "power3.inOut",
      });

      gsap.fromTo(
        menuItems,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.4,
        }
      );
    } else {
      // Close animation
      gsap.to(overlay, {
        y: "-100%",
        duration: 0.8,
        ease: "power3.inOut",
        delay: 0.2, // slight delay so items can fade out
      });

      gsap.to(menuItems, {
        y: -30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <div ref={overlayRef} className="navigation-overlay">
      <div className="nav-content">
        <button className="nav-close-btn" onClick={onClose} aria-label="Close Menu">
          <div className="line"></div>
          <div className="line"></div>
        </button>
        <ul ref={menuListRef} className="nav-links">
          <li><Link href="/kolkata/directors" onClick={onClose}>Directors</Link></li>
          <li><Link href="/kolkata/films" onClick={onClose}>Films</Link></li>
          <li><Link href="/kolkata/tv-series" onClick={onClose}>TV Series</Link></li>
          <li><Link href="/kolkata/about" onClick={onClose}>About</Link></li>
          <li><Link href="/news/kolkata" onClick={onClose}>News</Link></li>
          <li><Link href="/kolkata/contact" onClick={onClose}>Contact</Link></li>
        </ul>
        <div className="nav-social">
          <a href="https://www.facebook.com/CAVIARTV/" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://twitter.com/CaviarTV" target="_blank" rel="noreferrer">Twitter</a>
          <a href="https://www.linkedin.com/company/caviar/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://instagram.com/caviar.tv" target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </div>
    </div>
  );
}
