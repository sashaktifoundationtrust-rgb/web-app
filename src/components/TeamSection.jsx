import React from 'react';
import { Quote } from 'lucide-react';
import './TeamSection.css';

export default function TeamSection({ teamData }) {
  return (
    <section className="team-section" id="about">
      <div className="container">
        <div className="team-header">
          <h2 className="team-title">{teamData.title}</h2>
          <p className="team-subtitle">{teamData.subtitle}</p>
        </div>

        <div className="team-grid">
          {teamData.members.map((member, idx) => (
            <div key={idx} className="team-card">
              <div className="team-avatar-wrap">
                <img src={member.image} alt={member.name} className="team-avatar" />
              </div>
              <div className="team-details">
                <h3 className="team-name">{member.name}</h3>
                <span className="team-role">{member.role}</span>
                
                <div className="quote-box">
                  <Quote size={20} className="quote-icon" />
                  <p className="quote-text">"{member.quote}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
