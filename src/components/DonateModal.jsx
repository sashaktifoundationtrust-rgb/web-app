import React, { useState } from 'react';
import { X, Heart, ShieldCheck, ExternalLink } from 'lucide-react';
import './DonateModal.css';

export default function DonateModal({ isOpen, onClose, content }) {
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');

  if (!isOpen) return null;

  const amounts = [500, 1000, 2500, 5000, 10000];

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;
    
    // Redirect to official SaShakti Foundation Razorpay page with selected amount parameter
    const razorpayUrl = `https://rzp.io/l/UTEvw3Vh`;
    window.open(razorpayUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="donate-backdrop" onClick={onClose}>
      <div className="donate-drawer" onClick={(e) => e.stopPropagation()}>
        <button className="close-drawer-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <form className="donate-form" onSubmit={handleDonateSubmit}>
          <div className="donate-header">
            <Heart className="donate-heart-icon" size={36} />
            <h2>{content.donateBtn}</h2>
            <p>Your contribution directly supports Mission Education for girls and free rural healthcare drives.</p>
          </div>

          <div className="amount-selection-block">
            <label className="amount-label">Select Contribution Amount</label>
            <div className="amount-grid">
              {amounts.map((amt) => (
                <button
                  type="button"
                  key={amt}
                  className={`amount-btn ${selectedAmount === amt && !customAmount ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedAmount(amt);
                    setCustomAmount('');
                  }}
                >
                  ₹{amt.toLocaleString()}
                </button>
              ))}
            </div>

            <div className="custom-amount-wrap">
              <span className="currency-prefix">₹</span>
              <input
                type="number"
                className="custom-amount-input"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(0);
                }}
              />
            </div>
          </div>

          <div className="trust-badge-card">
            <ShieldCheck size={20} className="shield-icon" />
            <div>
              <strong>80G Tax Exemption Eligible</strong>
              <p>All donations to SaShakti Foundation Trust are tax-exempt under Section 80G of Income Tax Act.</p>
            </div>
          </div>

          <div className="payment-provider">
            <span>Secured by</span>
            <img src="/images/razorpay.png" alt="Razorpay" className="razorpay-logo" />
          </div>

          <button type="submit" className="submit-donation-btn">
            Proceed to Secure Payment <ExternalLink size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
