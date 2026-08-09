import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, Maximize2, ArrowUpRight } from 'lucide-react';
import CardModal from './CardModal';
import './HeroAim.css';

export default function HeroAim({ aimData }) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsWrapRef = useRef(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // GSAP Animations on initial render & slide changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header text entrance
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }
      );

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power3.out' }
      );

      // Cards staggered entrance
      if (cardsWrapRef.current) {
        const cards = cardsWrapRef.current.querySelectorAll('.aim-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.15,
            delay: 0.35,
            ease: 'power3.out'
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [aimData]);

  // Card Hover GSAP 3D Magnetic Effect
  const handleMouseMove = (e, cardEl) => {
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(cardEl, {
      rotateY: (x / rect.width) * 12,
      rotateX: (-y / rect.height) * 12,
      scale: 1.02,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = (cardEl) => {
    if (!cardEl) return;
    gsap.to(cardEl, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % (aimData.cards.length - 2));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + (aimData.cards.length - 2)) % (aimData.cards.length - 2));
  };

  return (
    <section className="hero-aim-section" ref={containerRef}>
      <div className="container">
        {/* Main Aim Headline matching screenshot */}
        <div className="aim-header">
          <h1 className="aim-title" ref={titleRef}>
            {aimData.title}
          </h1>
          <p className="aim-subtitle" ref={subtitleRef}>
            {aimData.description}
          </p>
        </div>

        {/* Rounded Cards Carousel / Showcase matching screenshot */}
        <div className="cards-slider-container">
          <div
            className="cards-grid"
            ref={cardsWrapRef}
            style={{
              transform: `translateX(-${activeSlide * 340}px)`,
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {aimData.cards.map((card) => (
              <div
                key={card.id}
                className="aim-card"
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                onClick={() => setSelectedCard(card)}
              >
                <div className="card-image-wrap">
                  <img src={card.image} alt={card.title} className="card-img" />
                  <div className="card-overlay">
                    <button className="expand-btn" title="View details">
                      <Maximize2 size={18} />
                    </button>
                    <span className="card-category-badge">{card.category}</span>
                  </div>
                </div>

                <div className="card-content">
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-desc">{card.desc}</p>
                  <div className="card-footer">
                    <span className="card-location">{card.location}</span>
                    <span className="learn-more">
                      Read Story <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <div className="carousel-controls">
            <button className="ctrl-btn" onClick={prevSlide} aria-label="Previous">
              <ChevronLeft size={20} />
            </button>
            <div className="indicator-dots">
              {Array.from({ length: Math.max(1, aimData.cards.length - 2) }).map((_, idx) => (
                <span
                  key={idx}
                  className={`dot ${activeSlide === idx ? 'active' : ''}`}
                  onClick={() => setActiveSlide(idx)}
                />
              ))}
            </div>
            <button className="ctrl-btn" onClick={nextSlide} aria-label="Next">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedCard && (
        <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}
    </section>
  );
}
