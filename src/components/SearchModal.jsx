import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Search, X, ArrowRight } from 'lucide-react';
import './SearchModal.css';

export default function SearchModal({ isOpen, onClose, content, onSelectResult }) {
  const [query, setQuery] = useState('');
  const overlayRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }
      );
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const allItems = [
    ...content.aimSection.cards.map((c) => ({ ...c, type: 'Aim & Initiative' })),
    ...content.gallerySection.items.map((g) => ({ ...g, desc: g.title, type: 'Gallery Initiative' })),
    ...content.teamSection.members.map((m) => ({ title: m.name, desc: m.quote, image: m.image, category: m.role, type: 'Team' }))
  ];

  const results = query.trim() === '' ? [] : allItems.filter((item) => {
    const q = query.toLowerCase();
    return (
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.desc && item.desc.toLowerCase().includes(q)) ||
      (item.category && item.category.toLowerCase().includes(q))
    );
  });

  return (
    <div className="search-overlay" ref={overlayRef}>
      <div className="search-container container">
        <div className="search-top-bar">
          <div className="search-input-wrap">
            <Search size={24} className="search-icon" />
            <input
              ref={inputRef}
              type="text"
              className="search-input"
              placeholder={content.searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button className="clear-btn" onClick={() => setQuery('')}>
                <X size={18} />
              </button>
            )}
          </div>

          <button className="close-search-btn" onClick={onClose}>
            Esc <X size={18} />
          </button>
        </div>

        <div className="search-results">
          {query.trim() === '' ? (
            <div className="search-suggestions">
              <span className="suggestion-title">Popular searches:</span>
              <div className="suggestion-tags">
                {["Mission Education", "Healthcare Camps", "Girl Priority", "Ashish Singh", "Relief Drive"].map((tag, idx) => (
                  <button key={idx} className="tag-btn" onClick={() => setQuery(tag)}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="results-list">
              <span className="results-count">{results.length} result(s) found</span>
              {results.map((item, idx) => (
                <div 
                  key={idx} 
                  className="result-item"
                  onClick={() => {
                    onClose();
                    if (item.image && onSelectResult) {
                      onSelectResult(item);
                    }
                  }}
                >
                  {item.image && <img src={item.image} alt={item.title} className="result-img" />}
                  <div className="result-info">
                    <span className="result-type">{item.type || item.category}</span>
                    <h4 className="result-title">{item.title}</h4>
                    <p className="result-desc">{item.desc}</p>
                  </div>
                  <ArrowRight size={18} className="result-arrow" />
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No results found for "{query}". Try searching for education, healthcare, or team members.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
