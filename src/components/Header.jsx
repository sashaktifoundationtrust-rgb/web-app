import React, { useState } from 'react';
import { Search, ChevronDown, Moon, Sun, Globe } from 'lucide-react';
import './Header.css';

export default function Header({ 
  content, 
  currentLang, 
  onLangChange, 
  onOpenSearch, 
  onOpenDonate,
  theme,
  onToggleTheme 
}) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <header className="site-header">
      {/* Primary Navigation Bar */}
      <div className="header-top container">
        <div className="brand-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="logo-main">{content.brand}</span>
          <span className="logo-sub">{content.subBrand}</span>
        </div>

        <nav className="main-nav">
          <ul className="nav-list">
            {content.nav.map((item) => (
              <li 
                key={item.id} 
                className="nav-item"
                onMouseEnter={() => setActiveDropdown(item.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="nav-link">
                  {item.label} <ChevronDown className={`caret ${activeDropdown === item.id ? 'active' : ''}`} size={14} />
                </button>

                {activeDropdown === item.id && (
                  <div className="dropdown-menu">
                    {item.items.map((sub, idx) => (
                      <a key={idx} href={`#${item.id}`} className="dropdown-item">
                        <span className="dropdown-title">{sub.title}</span>
                        <span className="dropdown-desc">{sub.desc}</span>
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <button className="search-btn" onClick={onOpenSearch}>
            <span>{content.searchLabel}</span>
            <Search size={16} />
          </button>

          <button className="theme-toggle-btn" onClick={onToggleTheme} title="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button className="donate-header-btn" onClick={onOpenDonate}>
            {content.donateBtn}
          </button>
        </div>
      </div>

      {/* Sub-bar Language Selector matching screenshot exact style */}
      <div className="header-sub-bar container">
        <div className="lang-bar">
          <span className="available-label">{content.availableIn}</span>
          <div className="lang-options">
            {content.languages.map((lang) => (
              <button
                key={lang.id}
                className={`lang-btn ${currentLang === lang.id ? 'active' : ''}`}
                onClick={() => onLangChange(lang.id)}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
