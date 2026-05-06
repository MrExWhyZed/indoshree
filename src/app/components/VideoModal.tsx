"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

interface WorkItem {
  id: string;
  title: string;
  credit: string;
  videoSrc: string;
  imageSrc: string;
  link: string;
  bgColor: string;
}

interface VideoModalProps {
  isOpen: boolean;
  activeItem: WorkItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function VideoModal({ isOpen, activeItem, onClose, onNext, onPrev, isFirst, isLast }: VideoModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (isOpen) {
      gsap.to(overlay, {
        y: "0%",
        duration: 1.2, // Slower slide up
        ease: "power3.inOut",
        onComplete: () => {
          if (headerRef.current) {
            gsap.to(headerRef.current, { opacity: 1, duration: 0.5, ease: "power2.out" });
          }
        }
      });
      // Autoplay video
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    } else {
      if (headerRef.current) {
        gsap.to(headerRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" });
      }
      gsap.to(overlay, {
        y: "100%",
        duration: 1.2, // Slower slide down
        ease: "power3.inOut",
      });
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isOpen]); // Removed activeItem from here so slide animation doesn't re-trigger

  // Handle smooth crossfade when navigating between videos
  useEffect(() => {
    if (isOpen && videoRef.current) {
      gsap.fromTo(videoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2.5, ease: "power2.inOut" } // Smoother and slower transition
      );
      videoRef.current.play().catch(() => {});
    }
  }, [activeItem, isOpen]);

  return (
    <div ref={overlayRef} className="video-modal-overlay">
      {/* Cloned Header specifically for Modal - Animates in after slide up */}
      <header ref={headerRef} className="modal-header" style={{ opacity: 0 }}>
        <div className="header-left">
          <ul className="breadcrumb-menu" style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: '800', fontSize: '11px', letterSpacing: '0.05em', marginTop: '10px' }}>
            <li><span className="active" style={{ color: 'var(--color-black)' }}>KOLKATA</span></li>
            <li><span style={{ color: 'var(--color-black)', opacity: 0.9 }}>FEATURED</span></li>
          </ul>
        </div>

        <div className="modal-header-center">
          {activeItem?.title}
        </div>

        <div className="header-right">
          <Link href="/" className="logo-link" style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '-1px', display: 'flex', alignItems: 'center' }} onClick={onClose}>
            INDO<span style={{color: 'red', fontSize: '1.2em', transform: 'translateY(-2px)'}}>S</span>HREE
          </Link>
          <button className="hamburger" onClick={() => window.dispatchEvent(new Event('toggle-nav'))} aria-label="Toggle Menu">
            <div className="hamburger-lines">
              <div className="line top-line"></div>
              <div className="line bottom-line"></div>
            </div>
          </button>
        </div>
      </header>

      {/* Video Player Area */}
      <div className="modal-video-container">
        {activeItem && (
          <video 
            ref={videoRef}
            src={activeItem.videoSrc}
            poster={activeItem.imageSrc}
            preload="none"
            controls
            playsInline
            className="modal-video-player"
            style={{ opacity: 0 }} /* initial state for GSAP fade */
          />
        )}
        {activeItem && (
          <div className="modal-video-credit">
            {activeItem.credit}
          </div>
        )}
      </div>

      {/* Right Navigation */}
      <div className="modal-side-nav">
        <button onClick={onPrev} className={`nav-btn ${isFirst ? 'disabled' : ''}`} disabled={isFirst}>PREV</button>
        <button onClick={onClose} className="nav-btn nav-close-icon" aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <button onClick={onNext} className={`nav-btn ${isLast ? 'disabled' : ''}`} disabled={isLast}>NEXT</button>
      </div>
    </div>
  );
}
