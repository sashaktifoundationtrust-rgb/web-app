import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import './GallerySection.css';

export default function GallerySection({ galleryData, onSelectPhoto }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const galleryGridRef = useRef(null);

  const filteredItems = galleryData.items.filter((item) => {
    if (activeFilter === "All" || activeFilter === "सभी") return true;
    return item.category.toLowerCase().includes(activeFilter.toLowerCase()) || 
           activeFilter.toLowerCase().includes(item.category.toLowerCase());
  });

  useEffect(() => {
    if (galleryGridRef.current) {
      const items = galleryGridRef.current.querySelectorAll('.gallery-card');
      gsap.fromTo(
        items,
        { opacity: 0, scale: 0.94, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
      );
    }
  }, [activeFilter, galleryData]);

  return (
    <section className="gallery-section" id="work">
      <div className="container">
        <div className="gallery-header">
          <div>
            <h2 className="gallery-title">{galleryData.title}</h2>
            <p className="gallery-subtitle">{galleryData.subtitle}</p>
          </div>

          <div className="filter-pills">
            {galleryData.filters.map((filter, idx) => (
              <button
                key={idx}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="gallery-grid" ref={galleryGridRef}>
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="gallery-card"
              onClick={() => onSelectPhoto({
                id: item.id,
                title: item.title,
                category: item.category,
                image: item.image,
                desc: `Detailed documentation for ${item.title}. Program conducted by SaShakti Foundation field representatives in ${item.year}.`,
                location: `Regional Hub (${item.year})`
              })}
            >
              <div className="gallery-img-wrap">
                <img src={item.image} alt={item.title} className="gallery-img" />
                <span className="gallery-year">{item.year}</span>
              </div>
              <div className="gallery-info">
                <span className="gallery-cat">{item.category}</span>
                <h4 className="gallery-item-title">{item.title}</h4>
                <span className="gallery-link">
                  View <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
