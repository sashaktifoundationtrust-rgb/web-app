import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ImpactStats.css';

gsap.registerPlugin(ScrollTrigger);

export default function ImpactStats({ impactData }) {
  const sectionRef = useRef(null);
  const statsContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const statBoxes = statsContainerRef.current.querySelectorAll('.stat-box');

      statBoxes.forEach((box) => {
        const numEl = box.querySelector('.stat-number');
        const targetVal = parseInt(box.dataset.value, 10);
        const obj = { val: 0 };

        gsap.to(obj, {
          val: targetVal,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: box,
            start: 'top 85%'
          },
          onUpdate: () => {
            if (numEl) {
              numEl.innerText = Math.floor(obj.val).toLocaleString();
            }
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [impactData]);

  return (
    <section className="impact-section" ref={sectionRef}>
      <div className="container">
        <div className="impact-header">
          <h2 className="impact-title">{impactData.title}</h2>
          <p className="impact-subtitle">{impactData.subtitle}</p>
        </div>

        <div className="stats-grid" ref={statsContainerRef}>
          {impactData.stats.map((stat, idx) => (
            <div key={idx} className="stat-box" data-value={stat.value}>
              <div className="stat-value-wrap">
                <span className="stat-number">0</span>
                <span className="stat-suffix">{stat.suffix}</span>
              </div>
              <h4 className="stat-label">{stat.label}</h4>
              <p className="stat-sub">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
