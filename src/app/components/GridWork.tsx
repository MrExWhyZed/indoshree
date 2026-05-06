"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoModal from "./VideoModal";

gsap.registerPlugin(ScrollTrigger);

interface WorkItem {
  id: string;
  title: string;
  credit: string;
  videoSrc: string;
  imageSrc: string;
  link: string;
  bgColor: string;
}

const workItems: WorkItem[] = [
  {
    id: "jordan",
    title: "Jordan – The Trial of Luka Dončić",
    credit: "By – Jody Hill",
    videoSrc: "https://player.vimeo.com/progressive_redirect/playback/1078075663/rendition/720p/file.mp4?loc=external&log_user=0&signature=110f217f491f9e35131f0c761f720ac63b6adeccc29197ee1278dc338def161c",
    imageSrc: "https://api.caviar.tv/wp-content/uploads/2025/04/Jordan_Loop_Thumbnail.jpg",
    link: "/los-angeles/featured/jordan-trial-of-luka/",
    bgColor: "#1b2427",
  },
  {
    id: "skipthedishes",
    title: "Skip The Dishes – Writer's Room",
    credit: "By – Seth Rogen and Evan Goldberg",
    videoSrc: "https://player.vimeo.com/progressive_redirect/download/1125971628/rendition/1080p/new_skip_trim%20%281080p%29.mp4?loc=external&signature=b4da40f96ff1374db0076b006be8567c8eb8d2f24967b9bd96818f253e89ceff",
    imageSrc: "https://api.caviar.tv/wp-content/uploads/2025/10/Seth-Skip.jpg",
    link: "/los-angeles/featured/nike-hoop-improvement-2/",
    bgColor: "#816449",
  },
  {
    id: "hp",
    title: "HP – New Printer Scene",
    credit: "By – Neal Brennan",
    videoSrc: "https://player.vimeo.com/progressive_redirect/playback/1154082336/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=a05d741ca0197b2942e999b805b73a279cb1858f6f590ac023fac0150bc395e3",
    imageSrc: "https://api.caviar.tv/wp-content/uploads/2026/01/HP_Thumbnail.jpg",
    link: "/los-angeles/featured/hp-new-printer-scene-2/",
    bgColor: "#44403e",
  },
  {
    id: "nike",
    title: "Nike – Hoop Improvement",
    credit: "By – Guy de la Palme",
    videoSrc: "https://player.vimeo.com/progressive_redirect/playback/1078075663/rendition/720p/file.mp4?loc=external&log_user=0&signature=110f217f491f9e35131f0c761f720ac63b6adeccc29197ee1278dc338def161c",
    imageSrc: "https://api.caviar.tv/wp-content/uploads/2025/04/Jordan_Loop_Thumbnail.jpg",
    link: "/los-angeles/featured/nike-hoop-improvement/",
    bgColor: "#1b2427",
  },
  {
    id: "royal",
    title: "Royal Kingdom – Dedicated To The Game",
    credit: "By – Ramy Youssef",
    videoSrc: "https://player.vimeo.com/progressive_redirect/download/1125971628/rendition/1080p/new_skip_trim%20%281080p%29.mp4?loc=external&signature=b4da40f96ff1374db0076b006be8567c8eb8d2f24967b9bd96818f253e89ceff",
    imageSrc: "https://api.caviar.tv/wp-content/uploads/2025/10/Seth-Skip.jpg",
    link: "/los-angeles/featured/royal-kingdom/",
    bgColor: "#816449",
  },
  {
    id: "rebel",
    title: "Rebel – Official Trailer",
    credit: "By – Adil el Arbi and Bilall Fallah",
    videoSrc: "https://player.vimeo.com/progressive_redirect/playback/1154082336/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=a05d741ca0197b2942e999b805b73a279cb1858f6f590ac023fac0150bc395e3",
    imageSrc: "https://api.caviar.tv/wp-content/uploads/2026/01/HP_Thumbnail.jpg",
    link: "/los-angeles/featured/rebel/",
    bgColor: "#44403e",
  },
  {
    id: "warpony",
    title: "War Pony – Official Trailer",
    credit: "By – Riley Keough and Gina Gammell",
    videoSrc: "https://player.vimeo.com/progressive_redirect/playback/1078075663/rendition/720p/file.mp4?loc=external&log_user=0&signature=110f217f491f9e35131f0c761f720ac63b6adeccc29197ee1278dc338def161c",
    imageSrc: "https://api.caviar.tv/wp-content/uploads/2025/04/Jordan_Loop_Thumbnail.jpg",
    link: "/los-angeles/featured/war-pony/",
    bgColor: "#1b2427",
  },
  {
    id: "pault",
    title: "Paul T. Goldman – Official Trailer",
    credit: "By – Jason Woliner",
    videoSrc: "https://player.vimeo.com/progressive_redirect/download/1125971628/rendition/1080p/new_skip_trim%20%281080p%29.mp4?loc=external&signature=b4da40f96ff1374db0076b006be8567c8eb8d2f24967b9bd96818f253e89ceff",
    imageSrc: "https://api.caviar.tv/wp-content/uploads/2025/10/Seth-Skip.jpg",
    link: "/los-angeles/featured/paul-t-goldman/",
    bgColor: "#816449",
  },
  {
    id: "soundofmetal",
    title: "Sound of Metal – Official Trailer",
    credit: "By – Darius Marder",
    videoSrc: "https://player.vimeo.com/progressive_redirect/playback/1078075663/rendition/720p/file.mp4?loc=external&log_user=0&signature=110f217f491f9e35131f0c761f720ac63b6adeccc29197ee1278dc338def161c",
    imageSrc: "https://api.caviar.tv/wp-content/uploads/2025/04/Jordan_Loop_Thumbnail.jpg",
    link: "/los-angeles/featured/sound-of-metal/",
    bgColor: "#1b2427",
  }
];

type LayoutBlock = 
  | { type: 'hero-left', item: WorkItem }
  | { type: 'hero-right', item: WorkItem }
  | { type: 'split', items: [WorkItem, WorkItem], marginLeft: string, itemWidth: string }
  | { type: 'split-full', items: [WorkItem, WorkItem] }
  | { type: 'text', content: React.ReactNode, marginLeft: string, maxWidth: string };

const layoutData: LayoutBlock[] = [
  { type: 'hero-left', item: workItems[0] }, // Jordan
  { type: 'split', items: [workItems[1], workItems[2]], marginLeft: '15%', itemWidth: '42.5%' }, // Skip & HP
  { type: 'text', 
    content: "Caviar is an independent film studio based in Los Angeles, London, Brussels, Paris and Amsterdam. Our film Sound of Metal won two Academy Awards in 2021 and was nominated for Best Picture. Our most recent film, War Pony, won the Caméra d’Or at the Cannes Film Festival.",
    marginLeft: '12%',
    maxWidth: '65%'
  },
  { type: 'hero-left', item: workItems[3] }, // Nike
  { type: 'split', items: [workItems[4], workItems[5]], marginLeft: '15%', itemWidth: '42.5%' }, // Royal & Rebel
  { type: 'split-full', items: [workItems[6], workItems[7]] }, // War Pony & Paul T
  { type: 'hero-right', item: workItems[8] }, // Sound of Metal
];

export default function GridWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);

  const handleOpenModal = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setActiveVideoIndex(index);
  };

  const handleCloseModal = () => setActiveVideoIndex(null);
  
  const handleNextVideo = () => {
    if (activeVideoIndex !== null && activeVideoIndex < workItems.length - 1) {
      setActiveVideoIndex(activeVideoIndex + 1);
    }
  };

  const handlePrevVideo = () => {
    if (activeVideoIndex !== null && activeVideoIndex > 0) {
      setActiveVideoIndex(activeVideoIndex - 1);
    }
  };

  useEffect(() => {
    const blocks = gsap.utils.toArray<HTMLElement>(".reveal-up");
    
    blocks.forEach((block) => {
      const prlxWrapper = block.querySelector(".parallax-wrapper");
      if (prlxWrapper) {
        gsap.to(prlxWrapper, {
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

  const WorkItemBlock = ({ item, isHero }: { item: WorkItem, isHero: boolean }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const itemIndex = workItems.findIndex(w => w.id === item.id);
    
    useEffect(() => {
      if (isHero && videoRef.current) {
        videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
      }
    }, [isHero]);

    return (
      <div className="block-work reveal-up">
        <a 
          href={item.link} 
          className="block-work-link prlx"
          onClick={(e) => handleOpenModal(e, itemIndex)}
          onMouseEnter={() => {
            if (!isHero && videoRef.current) videoRef.current.play().catch(() => {});
          }}
          onMouseLeave={() => {
            if (!isHero && videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
            }
          }}
        >
          <div className="media-frame" style={{ backgroundColor: item.bgColor }}>
            <div className="sizer">
              <div className="parallax-wrapper">
                <img src={item.imageSrc} alt={item.title} className="media-image" />
                <video 
                  ref={videoRef}
                  src={item.videoSrc}
                  poster={item.imageSrc}
                  preload="none"
                  loop 
                  playsInline 
                  muted 
                  className={`media-video ${isHero ? 'hero-video' : ''}`}
                />
              </div>
            </div>
          </div>
          <div className="meta">
            <div className="title">{item.title}</div>
            <div className="credit">{item.credit}</div>
          </div>
        </a>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="grid-work">
      {layoutData.map((block, index) => {
        if (block.type === 'hero-left') {
          return (
            <div key={`hero-left-${index}`} className="layout-row">
              <div className="layout-hero-left">
                <WorkItemBlock item={block.item} isHero={true} />
              </div>
            </div>
          );
        }
        if (block.type === 'hero-right') {
          return (
            <div key={`hero-right-${index}`} className="layout-row">
              <div className="layout-hero-right">
                <WorkItemBlock item={block.item} isHero={true} />
              </div>
            </div>
          );
        }
        if (block.type === 'split-full') {
          return (
            <div key={`split-full-${index}`} className="layout-row layout-split-full">
              <div className="layout-split-item" style={{ width: '50%' }}>
                <WorkItemBlock item={block.items[0]} isHero={false} />
              </div>
              <div className="layout-split-item" style={{ width: '50%' }}>
                <WorkItemBlock item={block.items[1]} isHero={false} />
              </div>
            </div>
          );
        }
        if (block.type === 'split') {
          return (
            <div key={`split-${index}`} className="layout-row layout-split" style={{ marginLeft: block.marginLeft }}>
              <div className="layout-split-item" style={{ width: block.itemWidth }}>
                <WorkItemBlock item={block.items[0]} isHero={false} />
              </div>
              <div className="layout-split-item" style={{ width: block.itemWidth }}>
                <WorkItemBlock item={block.items[1]} isHero={false} />
              </div>
            </div>
          );
        }
        if (block.type === 'text') {
          return (
            <div key={`text-${index}`} className="layout-row reveal-up">
              <div className="layout-text" style={{ marginLeft: block.marginLeft, maxWidth: block.maxWidth }}>
                {block.content}
              </div>
            </div>
          );
        }
      })}
      
      <VideoModal 
        isOpen={activeVideoIndex !== null}
        activeItem={activeVideoIndex !== null ? workItems[activeVideoIndex] : null}
        onClose={handleCloseModal}
        onNext={handleNextVideo}
        onPrev={handlePrevVideo}
        isFirst={activeVideoIndex === 0}
        isLast={activeVideoIndex === workItems.length - 1}
      />
    </div>
  );
}
