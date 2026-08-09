import React, { useState, useEffect } from 'react';
import CampaignBanner from './components/CampaignBanner';
import Header from './components/Header';
import HeroAim from './components/HeroAim';
import FreeOpdSection from './components/FreeOpdSection';
import StorySection from './components/StorySection';
import ImpactStats from './components/ImpactStats';
import GallerySection from './components/GallerySection';
import TeamSection from './components/TeamSection';
import SearchModal from './components/SearchModal';
import DonateModal from './components/DonateModal';
import CardModal from './components/CardModal';
import Footer from './components/Footer';
import { contentData } from './data/content';
import './App.css';

export default function App() {
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('light');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const content = contentData[lang];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleOpenOpdRegister = () => {
    setSelectedPhoto({
      id: 999,
      title: "Free OPD Checkup & Diagnostic Testing Registration",
      category: "Free Health Camp",
      image: "/images/1.jpg",
      desc: "Register for free doctor consultations, blood tests, anemia screenings, and preventive healthcare for women & families across SaShakti Foundation health centers.",
      location: "Free Regional Health Centers"
    });
  };

  return (
    <div className="app-main-wrapper">
      {/* Top Free OPD Campaign Banner */}
      <CampaignBanner
        data={content.topAnnouncement}
        onOpenOpdModal={handleOpenOpdRegister}
      />

      {/* Top Sticky Header */}
      <Header
        content={content}
        currentLang={lang}
        onLangChange={setLang}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenDonate={() => setIsDonateOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Body */}
      <main className="app-content">
        {/* Free OPDs & Women's Diagnostic Health Testing Section */}
        <FreeOpdSection
          data={content.freeOpdSection}
          onOpenRegister={handleOpenOpdRegister}
        />

        {/* OUR AIM Hero Section matching screenshot layout */}
        <HeroAim aimData={content.aimSection} />

        {/* Founder's Inspiration Story & Determination */}
        <StorySection storyData={content.storySection} />

        {/* Impact Counters & Statistics */}
        <ImpactStats impactData={content.impactSection} />

        {/* Featured Initiatives Gallery */}
        <GallerySection
          galleryData={content.gallerySection}
          onSelectPhoto={(photo) => setSelectedPhoto(photo)}
        />

        {/* Leadership & Quotes Section */}
        <TeamSection teamData={content.teamSection} />
      </main>

      {/* Footer */}
      <Footer footerData={content.footer} brand={content.brand} />

      {/* Modals & Overlays */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        content={content}
        onSelectResult={(item) => setSelectedPhoto(item)}
      />

      <DonateModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
        content={content}
      />

      {selectedPhoto && (
        <CardModal
          card={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </div>
  );
}
