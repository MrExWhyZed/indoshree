"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NavigationOverlay from "./NavigationOverlay";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    const handleToggleNav = () => {
      setIsNavOpen(prev => !prev);
    };
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("toggle-nav", handleToggleNav);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("toggle-nav", handleToggleNav);
    };
  }, []);

  return (
    <>
      <header className={`header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="header-left">
          <ul className="breadcrumb-menu">
            <li><Link href="/" className="active">Kolkata</Link></li>
            <li><Link href="/mumbai">Mumbai</Link></li>
            <li><Link href="/delhi">Delhi</Link></li>
            <li><Link href="/bangalore">Bangalore</Link></li>
            <li><Link href="/chennai">Chennai</Link></li>
          </ul>
        </div>

        <div className="header-right">
          <Link href="/" className="logo-link" style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '-1px', display: 'flex', alignItems: 'center' }}>
            INDO<span style={{color: 'red', fontSize: '1.2em', transform: 'translateY(-2px)'}}>S</span>HREE
          </Link>

          <button 
            className={`hamburger ${isNavOpen ? 'is-open' : ''}`}
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-label="Toggle Menu"
          >
            <div className="hamburger-lines">
              <div className="line top-line"></div>
              <div className="line bottom-line"></div>
            </div>
          </button>
        </div>
      </header>

      <NavigationOverlay isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </>
  );
}
