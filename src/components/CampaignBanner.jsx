import React from 'react';
import { Stethoscope, ArrowRight } from 'lucide-react';
import './CampaignBanner.css';

export default function CampaignBanner({ data, onOpenOpdModal }) {
  if (!data) return null;

  return (
    <div className="top-campaign-banner">
      <div className="container banner-inner">
        <div className="banner-left">
          <span className="banner-badge">
            <Stethoscope size={14} /> {data.badge}
          </span>
          <span className="banner-text">{data.text}</span>
        </div>

        <button className="banner-action-btn" onClick={onOpenOpdModal}>
          <span>{data.action}</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
