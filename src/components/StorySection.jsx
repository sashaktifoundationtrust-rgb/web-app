import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, CheckCircle } from 'lucide-react';
import './StorySection.css';

gsap.registerPlugin(ScrollTrigger);

export default function StorySection({ storyData }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.story-text-wrap',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%'
          }
        }
      );
      gsap.fromTo(
        '.story-card-wrap',
        { opacity: 0, x: 40, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [storyData]);

  return (
    <section className="story-section" ref={sectionRef} id="ideas">
      <div className="container">
        <div className="story-grid">
          <div className="story-text-wrap">
            <span className="story-tag">{storyData.tag}</span>
            <h2 className="story-title">{storyData.title}</h2>
            <p className="story-body">{storyData.storyText}</p>

            <div className="key-points-list">
              {storyData.keyPoints.map((point, idx) => (
                <div key={idx} className="point-item">
                  <CheckCircle size={18} className="point-icon" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="story-card-wrap">
            <div className="founder-quote-card">
              <div className="quote-badge">
                <Heart size={16} /> Dedicated to Mothers
              </div>
              <blockquote className="founder-quote">
                "{storyData.quote}"
              </blockquote>
              <div className="founder-info">
                <img src="/images/m1.jpg" alt={storyData.founder} className="founder-avatar" />
                <div>
                  <h4 className="founder-name">{storyData.founder}</h4>
                  <span className="founder-role">{storyData.founderTitle}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
