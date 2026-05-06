"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface NewsItem {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  imageSrc: string;
  link: string;
  imagePosition: "left" | "right";
}

const newsItems: NewsItem[] = [
  {
    id: "love-language",
    date: "03 26 2026",
    title: "Love Langauge Premieres at SXSW",
    excerpt: "We are thrilled to see our film 'Love Language' premiere at SXSW. Produced by Caviar, directed by Joey Power and featuring Chloë Grace Moretz, Anthony Ramos, Manny Jacinto, Isabel May and Billie Lourd, the film is a rom-com about a woman who begins writing wedding vows for others while navigating a complicated love story...",
    imageSrc: "https://api.caviar.tv/wp-content/uploads/2026/03/love-language-359427-1.jpg",
    link: "/news/los-angeles/love-langauge-premieres-at-sxsw/",
    imagePosition: "left",
  },
  {
    id: "dead-end",
    date: "01 19 2026",
    title: "Variety Names Dead End (Dood Spoor) One of the Best International Series of the Year",
    excerpt: "We are incredibly excited to share that Dead End (Dood Spoor), produced by Caviar, has been selected by Variety as one of the ten best international TV shows of the year. In a moment when streaming platforms have firmly established themselves as the driving force of the global television landscape, Variety's international team chose to...",
    imageSrc: "https://api.caviar.tv/wp-content/uploads/2026/01/Best-Intl-TV.jpg",
    link: "/news/los-angeles/dood-spoor-seleceted-by-variety/",
    imagePosition: "right",
  }
];

export default function NewsGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blocks = gsap.utils.toArray<HTMLElement>(".block-news-item");
    
    blocks.forEach((block) => {
      gsap.fromTo(
        block,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
          },
        }
      );
      
      const img = block.querySelector(".media-image");
      if (img) {
        gsap.to(img, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: block,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="grid-news container">
      {newsItems.map((item) => (
        <div key={item.id} className="block-news-item reveal-up">
          <Link href={item.link} className="block-news-link prlx">
            <div className="line line-top"></div>
            
            <div className={`news-columns ${item.imagePosition === "right" ? "reverse" : ""}`}>
              <div className="news-column-image">
                <div className="media-frame">
                  <div className="sizer" style={{ paddingBottom: "60%" }}>
                    <img src={item.imageSrc} alt={item.title} className="media-image" />
                  </div>
                </div>
              </div>
              
              <div className="news-column-text">
                <div className="news-meta">
                  <time>{item.date}</time>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                </div>
              </div>
            </div>
            
            <div className="line line-bottom"></div>
          </Link>
        </div>
      ))}
    </div>
  );
}
