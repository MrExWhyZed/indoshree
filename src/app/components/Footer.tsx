"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer container">
      <div className="footer-row-title">
        <div className="footer-left">
          <h2>Our Newsletter</h2>
        </div>
      </div>
      
      <div className="footer-row-input">
        <div className="footer-left">
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your Email?" />
            <button type="submit">→</button>
          </form>
        </div>
        <div className="footer-right">
          <div className="connect-block">
            <span className="connect-text">Let's Connect.</span> <Link href="/kolkata/contact" className="contact-link">Contact Us</Link>
          </div>
        </div>
      </div>
      
      <div className="footer-row-links">
        <div className="footer-left">
          <div className="footer-left-links">
            <ul className="social-links">
              <li><a href="#">FACEBOOK</a></li>
              <li><a href="#">TWITTER</a></li>
              <li><a href="#">LINKEDIN</a></li>
              <li><a href="#">INSTAGRAM</a></li>
            </ul>
            <ul className="legal-links">
              <li><Link href="/terms">Terms of Use</Link></li>
              <li><Link href="/privacy-us">Privacy Statement – USA</Link></li>
              <li><Link href="/privacy-eu">Privacy Statement – EU</Link></li>
              <li><Link href="/cookie">Cookie Policy</Link></li>
              <li className="copyright">© 2026 INDOSHREE. All Rights Reserved</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-right">
          <div className="footer-locations">
            <ul className="location-col">
              <li><Link href="/kolkata">LOS ANGELES</Link></li>
              <li><Link href="/mumbai">LONDON</Link></li>
              <li><Link href="/delhi">BRUSSELS</Link></li>
            </ul>
            <ul className="location-col">
              <li><Link href="/bangalore">AMSTERDAM</Link></li>
              <li><Link href="/chennai">PARIS</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
