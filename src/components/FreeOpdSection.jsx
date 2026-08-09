import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Stethoscope, Activity, Pill, Truck, Calendar } from 'lucide-react';
import './FreeOpdSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function FreeOpdSection({ data, onOpenRegister }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.opd-feature-card',
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [data]);

  const icons = [<Stethoscope size={24} />, <Activity size={24} />, <Pill size={24} />, <Truck size={24} />];

  return (
    <section className="free-opd-section" ref={sectionRef} id="opd">
      <div className="container">
        <div className="opd-header">
          <span className="opd-badge">{data.badge}</span>
          <h2 className="opd-title">{data.title}</h2>
          <p className="opd-subtitle">{data.subtitle}</p>
        </div>

        <div className="opd-features-grid">
          {data.features.map((feat, idx) => (
            <div key={idx} className="opd-feature-card">
              <div className="feature-icon-wrap">{icons[idx % icons.length]}</div>
              <h3 className="feature-title">{feat.title}</h3>
              <p className="feature-desc">{feat.desc}</p>
            </div>
          ))}
        </div>

        <div className="opd-action-block">
          <button className="opd-cta-btn" onClick={onOpenRegister}>
            <Calendar size={18} /> {data.ctaText}
          </button>
        </div>
      </div>
    </section>
  );
}
