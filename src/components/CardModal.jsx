import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, MapPin, Calendar, Heart, Share2 } from 'lucide-react';
import './CardModal.css';

export default function CardModal({ card, onClose }) {
  const backdropRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.2)' }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleClose = () => {
    gsap.to(contentRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 20,
      duration: 0.25,
      ease: 'power2.in'
    });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.25,
      onComplete: onClose
    });
  };

  return (
    <div className="card-modal-backdrop" ref={backdropRef} onClick={handleClose}>
      <div 
        className="card-modal-content" 
        ref={contentRef} 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={handleClose}>
          <X size={20} />
        </button>

        <div className="modal-grid">
          <div className="modal-image-col">
            <img src={card.image} alt={card.title} className="modal-img" />
          </div>

          <div className="modal-info-col">
            <span className="modal-badge">{card.category}</span>
            <h2 className="modal-title">{card.title}</h2>

            <div className="modal-meta">
              <span className="meta-item">
                <MapPin size={14} /> {card.location}
              </span>
              <span className="meta-item">
                <Calendar size={14} /> Active Program
              </span>
            </div>

            <p className="modal-body-text">{card.desc}</p>
            <p className="modal-body-text secondary">
              Through strategic partnerships, medical diagnostic outreach, and dedicated volunteer networks, this initiative brings sustainable change to lives across communities.
            </p>

            <div className="modal-actions">
              <button className="modal-primary-btn" onClick={handleClose}>
                <Heart size={16} /> Support Initiative
              </button>

              <button className="modal-secondary-btn" onClick={() => alert("Story link copied to clipboard!")}>
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
