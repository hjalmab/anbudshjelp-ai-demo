import React, { useState } from 'react';

// --- LOGO ENDRING ---
// Vi bruker en direkte link til Google Drive bildet i stedet for lokal import
const logo = "https://drive.google.com/uc?export=view&id=1z_aj3yHWSBDwhUF4p6b4WEOmuyGV_jKL";

const styles = `
  :root {
    /* Brand Colors */
    --finndoff-teal: #008489;
    --finndoff-teal-light: #339DA1;
    --finndoff-teal-lighter: #99CED0;
    --finndoff-teal-lightest: #CCE6E7;
    --finndoff-dark: #0B2333;
    --finndoff-dark-light: #3C4F5C;
    --finndoff-gray: #6D7B85;
    --finndoff-gray-light: #9DA7AD;
    
    /* Status Colors (Strictly enforced) */
    --status-green: #69be5b;  /* OK */
    --status-yellow: #ffcb05; /* Warning */
    --status-red: #ec5b5b;    /* Missing */

    /* Backgrounds & Text */
    --bg-primary: #f5f7f8;
    --bg-white: #ffffff;
    --text-primary: #0B2333;
    --text-secondary: #6D7B85;
    --text-light: #9DA7AD;
    
    /* UI Utilities */
    --border: #e2e8f0;
    --shadow-sm: 0 1px 3px rgba(11, 35, 51, 0.08);
    --shadow-md: 0 4px 6px rgba(11, 35, 51, 0.1);
    --shadow-hover: 0 8px 16px rgba(0, 132, 137, 0.15);
    --radius-sm: 6px;
    --radius-md: 10px;
    --radius-lg: 16px;
    
    /* Layout Dimensions */
    --header-height: 70px;
    --sidebar-width: 280px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.6;
    overflow-x: hidden; /* Prevent horizontal scroll */
  }

  /* --- TOP HEADER --- */
  .top-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--header-height);
    background: var(--bg-white);
    border-bottom: 1px solid var(--border);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    box-shadow: var(--shadow-sm);
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 40px;
  }

  /* Logo Styling */
  .logo-container {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    height: 100%;
  }

  .logo-img {
    height: 32px;
    width: auto;
    display: block;
  }

  /* Top Navigation */
  .top-nav {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .top-nav-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-secondary);
    cursor: pointer;
    background: none;
    border: none;
    transition: color 0.2s;
  }

  .top-nav-item:hover {
    color: var(--finndoff-teal);
  }

  .top-nav-item svg {
    width: 12px;
    height: 12px;
    margin-top: 1px;
  }

  /* Header Right Actions */
  .header-right {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .header-link {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-secondary);
    text-decoration: none;
    cursor: pointer;
  }
  
  .header-link:hover {
    color: var(--finndoff-dark);
  }

  .btn-logout {
    padding: 8px 16px;
    background: #E5F2F2;
    color: var(--finndoff-teal);
    font-weight: 600;
    font-size: 14px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-logout:hover {
    background: var(--finndoff-teal-lightest);
  }

  /* --- SIDEBAR --- */
  .sidebar {
    background: var(--bg-primary);
    position: fixed;
    top: var(--header-height);
    left: 0;
    width: var(--sidebar-width);
    height: calc(100vh - var(--header-height));
    overflow-y: auto;
    border-right: 1px solid var(--border);
    z-index: 100;
    padding-top: 24px;
  }

  .sidebar-nav {
    padding: 0 16px 12px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .nav-card {
    background: var(--bg-white);
    border-radius: var(--radius-lg);
    padding: 12px;
    box-shadow: var(--shadow-sm);
  }

  .nav-section-title {
    font-size: 11px;
    font-weight: 700;
    color: var(--text-light);
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 8px 12px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: var(--radius-md);
    color: var(--text-secondary);
    transition: all 0.2s ease;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 2px;
    cursor: pointer;
    border: none;
    background: transparent;
    width: 100%;
    text-align: left;
  }

  .nav-item:hover {
    background: var(--finndoff-teal-lightest);
    color: var(--finndoff-teal);
  }

  .nav-item.active {
    background: var(--finndoff-teal);
    color: white;
  }

  .nav-item svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  /* --- MAIN CONTENT --- */
  .main-content {
    margin-left: var(--sidebar-width);
    margin-top: var(--header-height);
    padding: 32px 40px;
    width: auto;
    min-width: 0;
    padding-bottom: 120px; /* Extra padding for fixed footer in Go/No-Go */
  }

  /* Page header */
  .page-header {
    margin-bottom: 32px;
  }

  .page-title {
    font-family: 'Work Sans', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: var(--finndoff-dark);
    margin-bottom: 8px;
  }

  .page-description {
    font-size: 15px;
    color: var(--text-secondary);
    max-width: 800px;
    line-height: 1.5;
  }

  /* Buttons */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    border-radius: var(--radius-md);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    font-family: 'Roboto', sans-serif;
  }

  .btn svg {
    width: 16px;
    height: 16px;
  }

  .btn-primary {
    background: var(--finndoff-teal);
    color: white;
  }

  .btn-primary:hover {
    background: var(--finndoff-teal-light);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  .btn-secondary {
    background: var(--bg-white);
    color: var(--text-secondary);
    border: 1px solid var(--border);
  }

  .btn-secondary:hover {
    background: var(--bg-primary);
    border-color: var(--finndoff-teal-lightest);
    color: var(--finndoff-teal);
  }

  .btn-block {
    width: 100%;
    justify-content: center;
  }

  /* --- GO/NO-GO STYLES (NEW) --- */
  .go-no-go-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 24px;
    margin-bottom: 40px;
  }

  .criteria-card {
    background: var(--bg-white);
    border-radius: var(--radius-lg);
    padding: 24px;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border);
    transition: all 0.2s;
  }

  .criteria-card:focus-within {
    border-color: var(--finndoff-teal);
    box-shadow: var(--shadow-md);
  }

  .criteria-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .criteria-title {
    font-weight: 600;
    color: var(--finndoff-dark);
    font-size: 16px;
  }

  .criteria-score {
    background: var(--bg-primary);
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: 700;
    color: var(--finndoff-teal);
  }

  /* Custom Range Slider */
  .range-slider {
    -webkit-appearance: none;
    width: 100%;
    height: 8px;
    border-radius: 4px;
    background: var(--border);
    outline: none;
    margin-bottom: 16px;
    cursor: pointer;
  }

  .range-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--finndoff-teal);
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    transition: transform 0.1s;
  }

  .range-slider::-webkit-slider-thumb:hover {
    transform: scale(1.1);
  }

  /* Dynamic Text Feedback */
  .feedback-text {
    font-size: 14px;
    padding: 12px;
    background: var(--bg-primary);
    border-radius: var(--radius-md);
    color: var(--text-secondary);
    min-height: 60px;
    display: flex;
    align-items: center;
    border-left: 4px solid transparent;
  }

  .feedback-low { border-left-color: var(--status-red); color: var(--finndoff-dark); }
  .feedback-mid { border-left-color: var(--status-yellow); color: var(--finndoff-dark); }
  .feedback-high { border-left-color: var(--status-green); color: var(--finndoff-dark); }

  /* Summary Footer */
  .analysis-footer {
    position: fixed;
    bottom: 0;
    left: var(--sidebar-width);
    right: 0;
    background: var(--bg-white);
    padding: 16px 40px;
    border-top: 1px solid var(--border);
    box-shadow: 0 -4px 10px rgba(0,0,0,0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 900;
  }

  .score-summary {
    display: flex;
    gap: 32px;
  }

  .score-item h4 {
    font-size: 12px;
    text-transform: uppercase;
    color: var(--text-secondary);
    margin-bottom: 4px;
  }

  .score-value {
    font-size: 24px;
    font-weight: 800;
    color: var(--finndoff-dark);
  }

  .decision-box {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 8px 24px;
    border-radius: var(--radius-md);
    font-weight: 700;
    font-size: 18px;
  }

  .decision-go { background: #e6f4e4; color: var(--status-green); border: 1px solid var(--status-green); }
  .decision-nogo { background: #fde8e8; color: var(--status-red); border: 1px solid var(--status-red); }

  /* Readiness Banner & Other Components */
  .readiness-banner {
    border-radius: var(--radius-lg);
    padding: 20px 28px;
    margin-bottom: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    box-shadow: var(--shadow-md);
    position: relative;
    overflow: hidden;
  }

  .readiness-banner::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.1;
    background: url('data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h100v100H0z" fill="none"/%3E%3Cpath d="M50 0L100 50L50 100L0 50z" fill="%23fff"/%3E%3C/svg%3E') repeat;
  }

  .readiness-high { background: linear-gradient(135deg, var(--status-green) 0%, #5AAE4C 100%); }
  .readiness-medium { background: linear-gradient(135deg, var(--status-yellow) 0%, #F5B800 100%); }
  .readiness-low { background: linear-gradient(135deg, var(--status-red) 0%, #D64545 100%); }

  .readiness-content {
    display: flex;
    align-items: center;
    gap: 20px;
    position: relative;
    z-index: 1;
  }

  .readiness-icon-box {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    padding: 4px;
  }

  .readiness-icon {
    width: 48px;
    height: 48px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }

  .readiness-text h2 {
    font-family: 'Work Sans', sans-serif;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .readiness-text p {
    font-size: 14px;
    opacity: 0.95;
  }

  .readiness-score {
    position: relative;
    z-index: 1;
  }

  .score-circle {
    position: relative;
    width: 80px;
    height: 80px;
  }

  .score-circle svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }

  .score-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .score-number {
    font-family: 'Work Sans', sans-serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 1;
  }

  /* Filter Tabs */
  .doc-filter-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
    background: var(--bg-white);
    padding: 4px;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    width: fit-content;
  }

  .filter-tab {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: var(--radius-md);
    font-size: 13px;
    font-weight: 600;
    color: var(--text-secondary);
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .filter-tab:hover {
    background: var(--bg-primary);
    color: var(--finndoff-teal);
  }

  .filter-tab.active {
    background: var(--finndoff-teal);
    color: white;
  }

  .tab-badge {
    background: rgba(11, 35, 51, 0.1);
    padding: 1px 6px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 700;
  }

  .filter-tab.active .tab-badge {
    background: rgba(255, 255, 255, 0.25);
  }

  /* Document Category Section */
  .doc-category-section {
    margin-bottom: 32px;
  }

  .doc-category-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border);
  }

  .doc-category-title {
    font-family: 'Work Sans', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: var(--finndoff-dark);
    margin-bottom: 2px;
  }

  .doc-category-subtitle {
    font-size: 13px;
    color: var(--text-secondary);
  }

  /* Document Cards Grid */
  .doc-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
  }

  /* Document Card */
  .doc-card {
    background: var(--bg-white);
    border-radius: var(--radius-lg);
    padding: 16px;
    box-shadow: var(--shadow-sm);
    transition: all 0.3s ease;
    cursor: pointer;
    border: 2px solid transparent;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .doc-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-hover);
  }

  .doc-card.status-valid, .doc-card.status-won { border-color: var(--status-green); }
  .doc-card.status-expiring, .doc-card.status-pending { border-color: var(--status-yellow); }
  .doc-card.status-missing, .doc-card.status-lost { 
    border-color: var(--status-red); 
    background: linear-gradient(135deg, #fff 0%, #fffbfb 100%);
  }

  .doc-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }

  .doc-icon-large {
    font-size: 28px;
    line-height: 1;
  }

  .doc-status-badge {
    padding: 3px 8px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .badge-valid { background: var(--status-green); color: white; }
  .badge-expiring { background: var(--status-yellow); color: var(--finndoff-dark); }
  .badge-missing { background: var(--status-red); color: white; }

  .doc-card-body {
    margin-bottom: 12px;
    flex: 1;
  }

  .doc-card-title {
    font-family: 'Work Sans', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: var(--finndoff-dark);
    margin-bottom: 8px;
    line-height: 1.3;
  }

  .doc-meta-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .doc-meta-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: var(--text-secondary);
    line-height: 1.4;
  }

  .doc-meta-row svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    opacity: 0.7;
  }

  .doc-meta-row strong {
    color: var(--finndoff-dark);
    font-weight: 600;
  }

  .date-valid { color: var(--status-green); }
  .date-expiring { color: var(--status-yellow); }

  /* Upload Area */
  .doc-upload-area {
    background: linear-gradient(135deg, var(--bg-primary) 0%, #fff 100%);
    border: 2px dashed var(--border);
    border-radius: var(--radius-md);
    padding: 16px;
    text-align: center;
    transition: all 0.2s ease;
    margin-top: 8px;
  }

  .doc-upload-area:hover {
    border-color: var(--finndoff-teal);
    background: var(--finndoff-teal-lightest);
  }

  .doc-upload-area svg {
    width: 28px;
    height: 28px;
    color: var(--text-light);
    margin-bottom: 6px;
  }

  .doc-upload-area p {
    font-size: 12px;
    color: var(--text-secondary);
    margin-bottom: 2px;
    font-weight: 600;
  }

  /* Document Card Actions */
  .doc-card-actions {
    display: flex;
    gap: 8px;
    margin-top: auto;
  }

  .doc-card-actions .btn {
    flex: 1;
    justify-content: center;
    padding: 6px 8px;
    font-size: 12px;
  }

  /* Upload Overlay */
  .upload-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.95);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    z-index: 10;
  }

  .upload-spinner {
    width: 48px;
    height: 48px;
    border: 4px solid var(--finndoff-teal-lightest);
    border-top-color: var(--finndoff-teal);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .doc-card.uploading { pointer-events: none; }
`;

// --- TOP HEADER KOMPONENT ---
const TopHeader = () => {
  return (
    <header className="top-header">
      <div className="header-left">
        <div className="logo-container">
          {/* Logo sourced from Google Drive URL */}
          <img 
            src={logo} 
            alt="Finndoff Logo" 
            className="logo-img" 
          />
        </div>

        <nav className="top-nav">
          <button className="top-nav-item">
            Anbud
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <button className="top-nav-item">
            Markedsinnsikt
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <button className="top-nav-item">
            Følg oppdragsgivere
          </button>
          <button className="top-nav-item">
            Om oss
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"/></svg>
          </button>
        </nav>
      </div>

      <div className="header-right">
        <a href="#" className="header-link">Kontakt</a>
        <a href="#" className="header-link">Min profil</a>
        <button className="btn-logout">Logg ut</button>
      </div>
    </header>
  );
};

// Shared Sidebar Component
const Sidebar = ({ currentPage, onNavigate }) => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <div className="nav-card">
          <div className="nav-section-title">Anbudsverktøy</div>
          <button className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`} onClick={() => onNavigate('dashboard')}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            Hjem
          </button>
          <button className={`nav-item ${currentPage === 'go-no-go' ? 'active' : ''}`} onClick={() => onNavigate('go-no-go')}>
             <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Go / No-Go Analyse
          </button>
          <button className="nav-item" onClick={() => onNavigate('aktive-konkurranser')}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            Aktive konkurranser
          </button>
        </div>

        <div className="nav-card">
          <div className="nav-section-title">Arbeidsplass</div>
          <button className="nav-item" onClick={() => onNavigate('pagaende-tilbud')}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Pågående tilbud
          </button>
          <button className="nav-item" onClick={() => onNavigate('prosjektstyring')}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
            </svg>
            Prosjektstyring
          </button>
        </div>

        <div className="nav-card">
          <div className="nav-section-title">Anbudsbibliotek</div>
          <button className={`nav-item ${currentPage === 'dokumentbibliotek' ? 'active' : ''}`} onClick={() => onNavigate('dokumentbibliotek')}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
            </svg>
            Dokumenter
          </button>
          <button className={`nav-item ${currentPage === 'tilbudsbibliotek' ? 'active' : ''}`} onClick={() => onNavigate('tilbudsbibliotek')}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            Tilbudsmaler
          </button>
          <button className={`nav-item ${currentPage === 'nokkelressurser' ? 'active' : ''}`} onClick={() => onNavigate('nokkelressurser')}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            Nøkkelressurser
          </button>
        </div>
      </nav>
    </aside>
  );
};

// Reusable Document Card Component
const DocumentCard = ({ doc, onUpload }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = (e) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      if(onUpload) onUpload(doc.id);
    }, 2000);
  };

  return (
    <div className={`doc-card status-${doc.status} ${isUploading ? 'uploading' : ''}`}>
      <div className="doc-card-header">
        <div className="doc-icon-large">{doc.icon}</div>
        <div className={`doc-status-badge badge-${doc.status}`}>
          {doc.status === 'valid' && 'Gyldig'}
          {doc.status === 'expiring' && 'Oppdatering kreves'}
          {doc.status === 'missing' && 'Mangler'}
        </div>
      </div>
      
      <div className="doc-card-body">
        <h4 className="doc-card-title">{doc.name}</h4>
        
        {doc.status !== 'missing' && (
          <div className="doc-meta-list">
            {doc.expiryDate && (
              <div className="doc-meta-row">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span>Utløper: <strong className={`date-${doc.status}`}>{doc.expiryDate}</strong></span>
              </div>
            )}
            
            {doc.description && (
              <div className="doc-meta-row">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>{doc.description}</span>
              </div>
            )}

            {doc.client && (
              <div className="doc-meta-row">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
                <span>{doc.client} • {doc.period}</span>
              </div>
            )}

            {doc.value && (
              <div className="doc-meta-row">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>{doc.value}</span>
              </div>
            )}
             {doc.experience && (
              <div className="doc-meta-row">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Erfaring: <strong>{doc.experience}</strong></span>
              </div>
            )}
          </div>
        )}

        {doc.status === 'missing' && (
          <div className="doc-upload-area" onDrop={handleUpload} onDragOver={(e) => e.preventDefault()}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
            <p>{doc.uploadText || "Last opp dokumentasjon"}</p>
          </div>
        )}
      </div>

      <div className="doc-card-actions">
        {doc.status === 'missing' ? (
          <button className="btn btn-primary btn-block" onClick={handleUpload}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
            </svg>
            Last opp
          </button>
        ) : (
          <>
            <button className="btn btn-secondary">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              Vis
            </button>
            <button className="btn btn-primary">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
              </svg>
              Oppdater
            </button>
          </>
        )}
      </div>

      {isUploading && (
        <div className="upload-overlay">
          <div className="upload-spinner"></div>
          <p>Laster...</p>
        </div>
      )}
    </div>
  );
};

// --- GO / NO-GO PAGE (NEW) ---
const GoNoGoPage = () => {
  // Initial state: Alle sliderne starter på 3 (Nøytral)
  const [scores, setScores] = useState({
    1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 
    6: 3, 7: 3, 8: 3, 9: 3, 10: 3
  });

  const handleSliderChange = (id, val) => {
    setScores(prev => ({ ...prev, [id]: parseInt(val) }));
  };

  // Data basert på Mercell Go/No-Go Matrise PDF
  const criteria = [
    {
      id: 1,
      title: "1. Relasjon til oppdragsgiver",
      low: "Ukjent eller tilnærmet ukjent",
      mid: "Kjenner noe, men ikke godt nok",
      high: "Velutviklet og positivt forhold til oppdragsgiver"
    },
    {
      id: 2,
      title: "2. Kjennskap til oppdraget",
      low: "Konkurransen er helt ukjent for oss",
      mid: "Har ventet på konkurransen, noe kjennskap",
      high: "Kjenner oppdraget og behovene godt"
    },
    {
      id: 3,
      title: "3. Konkurransesituasjon",
      low: "Konkurrentene er foretrukket",
      mid: "Konkurransen er åpen uten spesiell favoritt",
      high: "Vi har et klart konkurransefortrinn"
    },
    {
      id: 4,
      title: "4. Kvalifikasjoner og erfaring",
      low: "Bare såvidt kvalifisert, liten erfaring",
      mid: "Godt kvalifisert, likt som konkurrentene",
      high: "Svært godt kvalifisert med lang erfaring"
    },
    {
      id: 5,
      title: "5. Kapasitet og tilgjengelighet",
      low: "Mye å gjøre, stor avstand",
      mid: "Har litt kapasitet, mulig å utføre",
      high: "God ledig tid og god tilgjengelighet"
    },
    {
      id: 6,
      title: "6. Lønnsomhet",
      low: "Risiko for underskudd / lav margin",
      mid: "Innenfor, oppdraget er lønnsomt",
      high: "Svært lønnsomt, godt over budsjett"
    },
    {
      id: 7,
      title: "7. Prisensitivitet",
      low: "Laveste pris vinner (Prisjakt)",
      mid: "Balansert pris og kvalitet",
      high: "Kvalitet/ytelse vektes høyere enn pris"
    },
    {
      id: 8,
      title: "8. Tilbudskostnad (ROI)",
      low: "Høye kostnader vs. vinnersjanse",
      mid: "Middels kostnader og sjanser",
      high: "Høy ROI, kostnadseffektiv prosess"
    },
    {
      id: 9,
      title: "9. Strategisk match",
      low: "Utenfor vårt markedssegment",
      mid: "Passer greit i fokusområdet",
      high: "Kjernevirksomhet vi skal vokse i"
    },
    {
      id: 10,
      title: "10. Vinnersjanser (Totalvurdering)",
      low: "Lav (0-30%)",
      mid: "Middels (30-60%)",
      high: "Høy (60-90%)"
    }
  ];

  // Kalkuleringer
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const averageScore = (totalScore / 10).toFixed(1);
  const isGo = averageScore >= 4; // Grenseverdi fra PDF

  const getFeedbackClass = (val) => {
    if (val <= 2) return 'feedback-low';
    if (val <= 4) return 'feedback-mid';
    return 'feedback-high';
  };

  const getFeedbackText = (c, val) => {
    if (val <= 2) return c.low;
    if (val <= 4) return c.mid;
    return c.high;
  };

  return (
    <main className="main-content">
      <div className="page-header">
        <h1 className="page-title">🚦 Go / No-Go Analyse</h1>
        <p className="page-description">
          Vurder om dere bør bruke tid på dette anbudet. Flytt sliderne basert på de 10 kriteriene.
          En gjennomsnittscore på <strong>4 eller mer</strong> anbefales for å gå videre.
        </p>
      </div>

      <div className="go-no-go-grid">
        {criteria.map((c) => (
          <div key={c.id} className="criteria-card">
            <div className="criteria-header">
              <span className="criteria-title">{c.title}</span>
              <span className="criteria-score">{scores[c.id]}/6</span>
            </div>
            
            <input 
              type="range" 
              min="1" 
              max="6" 
              value={scores[c.id]} 
              onChange={(e) => handleSliderChange(c.id, e.target.value)}
              className="range-slider"
            />
            
            <div className={`feedback-text ${getFeedbackClass(scores[c.id])}`}>
              {getFeedbackText(c, scores[c.id])}
            </div>
          </div>
        ))}
      </div>

      <div className="analysis-footer">
        <div className="score-summary">
          <div className="score-item">
            <h4>Total Score</h4>
            <div className="score-value">{totalScore} / 60</div>
          </div>
          <div className="score-item">
            <h4>Snittscore</h4>
            <div className="score-value">{averageScore}</div>
          </div>
        </div>

        <div className={`decision-box ${isGo ? 'decision-go' : 'decision-nogo'}`}>
          {isGo ? (
            <>
              <span>🟢</span> ANBEFALING: HOPP (GO)
            </>
          ) : (
            <>
              <span>🔴</span> ANBEFALING: DROPP (NO-GO)
            </>
          )}
        </div>

        <div style={{display: 'flex', gap: '12px'}}>
            <button className="btn btn-secondary">Nullstill</button>
            <button className="btn btn-primary">Lagre analyse</button>
        </div>
      </div>
    </main>
  );
};

// --- DOKUMENTBIBLIOTEK PAGE ---
const DokumentbibliotekPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const documentData = {
    required: [
      { id: 1, name: 'Firmaattest', icon: '📄', status: 'valid', expiryDate: '17. nov 2025', description: 'Maks 3 mnd gammel', category: 'required' },
      { id: 2, name: 'Skatteattest', icon: '⚠️', status: 'expiring', expiryDate: '22. jan 2026', description: 'Maks 6 mnd gammel', category: 'required' },
      { id: 3, name: 'HMS-erklæring', icon: '❌', status: 'missing', description: 'Påkrevd for de fleste anbud', uploadText: "Signer og last opp", category: 'required' },
      { id: 4, name: 'MVA-attest', icon: '📄', status: 'valid', expiryDate: '01. mar 2026', description: 'Maks 6 mnd gammel', category: 'required' },
      { id: 5, name: 'StartBANK', icon: '⚠️', status: 'expiring', expiryDate: '07. feb 2026', description: 'Maks 3 mnd gammel', category: 'required' },
      { id: 6, name: 'ESPD (Egenerklæring)', icon: '📄', status: 'valid', expiryDate: '10. mar 2026', description: 'Standard skjema', category: 'required' }
    ],
    certifications: [
      { id: 7, name: 'ISO 9001:2015', icon: '🎓', status: 'valid', expiryDate: '15. sep 2026', description: 'Kvalitetsstyring', category: 'certifications' },
      { id: 8, name: 'ISO 14001', icon: '❌', status: 'missing', description: 'Miljøstyring', category: 'certifications' },
      { id: 9, name: 'ISO 45001', icon: '🎓', status: 'valid', expiryDate: '22. jun 2026', description: 'Arbeidsmiljø', category: 'certifications' }
    ]
  };

  const allDocs = [...documentData.required, ...documentData.certifications];
  const validDocs = allDocs.filter(d => d.status === 'valid').length;
  const totalDocs = allDocs.length;
  const readinessScore = Math.round((validDocs / totalDocs) * 100);

  return (
    <main className="main-content">
      <div className="page-header">
        <h1 className="page-title">📚 Dokumentbibliotek</h1>
        <p className="page-description">
          Formalia og sertifiseringer som kreves for å delta i offentlige anbud. 
          Sørg for at disse alltid er oppdaterte for å unngå avvisning.
        </p>
      </div>

      <div className={`readiness-banner readiness-${readinessScore >= 80 ? 'high' : readinessScore >= 60 ? 'medium' : 'low'}`}>
        <div className="readiness-content">
          <div className="readiness-icon-box">
            <div className="readiness-icon">{readinessScore >= 80 ? '✅' : '⚠️'}</div>
          </div>
          <div className="readiness-text">
            <h2>{readinessScore >= 80 ? 'Dokumentasjon i orden!' : 'Noen dokumenter mangler'}</h2>
            <p>{validDocs} av {totalDocs} formelle dokumenter er gyldige.</p>
          </div>
        </div>
        <div className="readiness-score">
          <div className="score-circle">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8"/>
              <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="8" strokeDasharray={`${readinessScore * 2.827} 283`} strokeLinecap="round" transform="rotate(-90 50 50)"/>
            </svg>
            <div className="score-text">
              <div className="score-number">{readinessScore}%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="doc-filter-tabs">
        <button className={`filter-tab ${selectedCategory === 'all' ? 'active' : ''}`} onClick={() => setSelectedCategory('all')}>
          Alle dokumenter <span className="tab-badge">{totalDocs}</span>
        </button>
        <button className={`filter-tab ${selectedCategory === 'required' ? 'active' : ''}`} onClick={() => setSelectedCategory('required')}>
          📋 Påkrevde <span className="tab-badge">{documentData.required.length}</span>
        </button>
        <button className={`filter-tab ${selectedCategory === 'certifications' ? 'active' : ''}`} onClick={() => setSelectedCategory('certifications')}>
          🏆 Sertifiseringer <span className="tab-badge">{documentData.certifications.length}</span>
        </button>
      </div>

      <div className="doc-cards-grid">
        {selectedCategory === 'all' || selectedCategory === 'required' ? documentData.required.map(doc => <DocumentCard key={doc.id} doc={doc} />) : null}
        {selectedCategory === 'all' || selectedCategory === 'certifications' ? documentData.certifications.map(doc => <DocumentCard key={doc.id} doc={doc} />) : null}
      </div>
    </main>
  );
};

// --- NØKKELRESSURSER PAGE ---
const NokkelressurserPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const resourceData = {
    people: [
      { id: 101, name: 'Ola Nordmann', icon: '👷‍♂️', status: 'valid', description: 'Prosjektleder', experience: '12 år', expiryDate: 'Oppdatert CV: Jan 2026' },
      { id: 102, name: 'Kari Danser', icon: '👩‍💼', status: 'valid', description: 'Anleggsleder', experience: '8 år', expiryDate: 'Oppdatert CV: Des 2025' },
      { id: 103, name: 'Per Hansen', icon: '👨‍🔧', status: 'missing', description: 'Bas / Formann', uploadText: "Last opp CV", experience: '20 år' },
      { id: 104, name: 'Lise Berg', icon: '👩‍💻', status: 'expiring', description: 'Kvalitetsleder', experience: '5 år', expiryDate: 'CV fra 2023 (Bør oppdateres)' }
    ],
    projects: [
      { id: 201, name: 'Vegvedlikehold E39', icon: '🛣️', status: 'valid', client: 'Statens vegvesen', period: '2023-2025', value: '14,5 MNOK', description: 'Totalentreprise vei' },
      { id: 202, name: 'Asfaltering FV 710', icon: '🚜', status: 'valid', client: 'Innlandet fylkeskommune', period: '2022', value: '8,2 MNOK', description: 'Rammeavtale asfalt' },
      { id: 203, name: 'Parkdrift Oslo Sør', icon: '🌳', status: 'missing', description: 'Samle dokumentasjon', uploadText: "Last opp prosjektbeskrivelse" }
    ]
  };

  const allResources = [...resourceData.people, ...resourceData.projects];
  const validResources = allResources.filter(r => r.status === 'valid').length;
  const totalResources = allResources.length;
  const competenceScore = Math.round((validResources / totalResources) * 100);

  return (
    <main className="main-content">
      <div className="page-header">
        <h1 className="page-title">👥 Nøkkelressurser & Kompetanse</h1>
        <p className="page-description">
          Oversikt over bedriftens kvalifikasjoner. Her administrerer du CV-er for nøkkelpersoner og referanseprosjekter som beviser at dere kan utføre jobben.
        </p>
      </div>

      <div className={`readiness-banner readiness-${competenceScore >= 70 ? 'high' : 'medium'}`}>
         <div className="readiness-content">
          <div className="readiness-icon-box">
            <div className="readiness-icon">{competenceScore >= 70 ? '💪' : '📉'}</div>
          </div>
          <div className="readiness-text">
            <h2>{competenceScore >= 70 ? 'Høy gjennomføringsevne' : 'Oppdatering av ressurser anbefales'}</h2>
            <p>{validResources} av {totalResources} ressurser er dokumentert klare for anbud.</p>
          </div>
        </div>
        <div className="readiness-score">
           <div className="score-circle">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8"/>
              <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="8" strokeDasharray={`${competenceScore * 2.827} 283`} strokeLinecap="round" transform="rotate(-90 50 50)"/>
            </svg>
            <div className="score-text">
              <div className="score-number">{competenceScore}%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="doc-filter-tabs">
        <button className={`filter-tab ${selectedCategory === 'all' ? 'active' : ''}`} onClick={() => setSelectedCategory('all')}>
          Alle ressurser
        </button>
        <button className={`filter-tab ${selectedCategory === 'people' ? 'active' : ''}`} onClick={() => setSelectedCategory('people')}>
          👷‍♂️ Nøkkelpersoner (CV) <span className="tab-badge">{resourceData.people.length}</span>
        </button>
        <button className={`filter-tab ${selectedCategory === 'projects' ? 'active' : ''}`} onClick={() => setSelectedCategory('projects')}>
          ⭐ Referanseprosjekter <span className="tab-badge">{resourceData.projects.length}</span>
        </button>
      </div>

      {(selectedCategory === 'all' || selectedCategory === 'people') && (
        <section className="doc-category-section">
          <div className="doc-category-header">
             <div>
              <h3 className="doc-category-title">Nøkkelpersoner</h3>
              <p className="doc-category-subtitle">CV-er og kompetansebevis for teamet</p>
            </div>
            <button className="btn btn-secondary">Legg til person</button>
          </div>
          <div className="doc-cards-grid">
            {resourceData.people.map(doc => <DocumentCard key={doc.id} doc={doc} />)}
          </div>
        </section>
      )}

      {(selectedCategory === 'all' || selectedCategory === 'projects') && (
        <section className="doc-category-section">
          <div className="doc-category-header">
             <div>
              <h3 className="doc-category-title">Referanseprosjekter</h3>
              <p className="doc-category-subtitle">Bevis på tidligere leveranser (siste 3-5 år)</p>
            </div>
            <button className="btn btn-secondary">Legg til prosjekt</button>
          </div>
          <div className="doc-cards-grid">
            {resourceData.projects.map(doc => <DocumentCard key={doc.id} doc={doc} />)}
          </div>
        </section>
      )}
    </main>
  );
};

// --- TILBUDSBIBLIOTEK PAGE ---
const TilbudsbibliotekPage = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');

  const proposals = [
    {
      id: 301,
      title: 'Rammeavtale - Graving og massetransport',
      buyer: 'Ulstein Kommune',
      doffinId: '2025-118361',
      status: 'won',
      submittedDate: '10. des 2025',
      value: '7,5 MNOK',
      score: '98/100',
      description: 'Rammeavtale for maskintjenester og transport.'
    },
    {
      id: 302,
      title: 'Tunnel vedlikehold 2026-2028 Nordland',
      buyer: 'Nordland Fylkeskommune',
      doffinId: '2025-120858',
      status: 'lost',
      submittedDate: '15. jan 2026',
      value: '60 MNOK',
      score: '85/100',
      description: 'Elektro og byggteknisk vedlikehold.',
      feedback: 'Pris vektet høyere enn forventet.'
    },
    {
      id: 303,
      title: 'E10 Evenes flyplasskryss',
      buyer: 'Statens vegvesen',
      doffinId: '2026-100006',
      status: 'pending',
      submittedDate: '02. feb 2026',
      value: 'Estimat ikke angitt',
      score: '-',
      description: 'Ny utforming av kryssområde E10.'
    }
  ];

  const filteredProposals = selectedStatus === 'all' 
    ? proposals 
    : proposals.filter(p => p.status === selectedStatus);

  // Helper for status badge styling
  const getStatusBadge = (status) => {
    switch(status) {
      case 'won': return { label: 'VUNNET', color: 'var(--status-green)', bg: 'rgba(105, 190, 91, 0.1)' };
      case 'lost': return { label: 'TAPT', color: 'var(--status-red)', bg: 'rgba(236, 91, 91, 0.1)' };
      case 'pending': return { label: 'AVVENTER', color: 'var(--status-yellow)', bg: 'rgba(255, 203, 5, 0.1)' };
      default: return { label: 'UKJENT', color: 'gray', bg: 'lightgray' };
    }
  };

  return (
    <main className="main-content">
      <div className="page-header">
        <h1 className="page-title">💼 Tilbudsbibliotek</h1>
        <p className="page-description">
          Arkiv over alle innleverte tilbud. Bruk historikken til å analysere hvorfor dere vinner eller taper, og gjenbruk gode formuleringer fra tidligere besvarelser.
        </p>
      </div>

      <div className="doc-filter-tabs">
        <button className={`filter-tab ${selectedStatus === 'all' ? 'active' : ''}`} onClick={() => setSelectedStatus('all')}>
          Alle tilbud <span className="tab-badge">{proposals.length}</span>
        </button>
        <button className={`filter-tab ${selectedStatus === 'won' ? 'active' : ''}`} onClick={() => setSelectedStatus('won')}>
          🏆 Vunnet <span className="tab-badge">{proposals.filter(p=>p.status==='won').length}</span>
        </button>
        <button className={`filter-tab ${selectedStatus === 'pending' ? 'active' : ''}`} onClick={() => setSelectedStatus('pending')}>
          ⏳ Avventer svar <span className="tab-badge">{proposals.filter(p=>p.status==='pending').length}</span>
        </button>
        <button className={`filter-tab ${selectedStatus === 'lost' ? 'active' : ''}`} onClick={() => setSelectedStatus('lost')}>
          ❌ Tapt <span className="tab-badge">{proposals.filter(p=>p.status==='lost').length}</span>
        </button>
      </div>

      <div className="doc-cards-grid">
        {filteredProposals.map(prop => {
          const badge = getStatusBadge(prop.status);
          return (
            <div key={prop.id} className="doc-card" style={{ borderLeft: `4px solid ${badge.color}` }}>
              <div className="doc-card-header">
                <div style={{ fontWeight: 'bold', fontSize: '12px', color: 'var(--finndoff-teal)' }}>
                  {prop.doffinId}
                </div>
                <div style={{ 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  fontSize: '10px', 
                  fontWeight: '700', 
                  color: badge.color, 
                  backgroundColor: badge.bg 
                }}>
                  {badge.label}
                </div>
              </div>

              <div className="doc-card-body">
                <h4 className="doc-card-title">{prop.title}</h4>
                <div className="doc-category-subtitle" style={{ marginBottom: '12px' }}>{prop.buyer}</div>

                <div className="doc-meta-list">
                  <div className="doc-meta-row">
                    <span>Levert: <strong>{prop.submittedDate}</strong></span>
                  </div>
                  <div className="doc-meta-row">
                    <span>Verdi: <strong>{prop.value}</strong></span>
                  </div>
                   {prop.status !== 'pending' && (
                    <div className="doc-meta-row">
                      <span>Score: <strong>{prop.score}</strong></span>
                    </div>
                  )}
                  {prop.feedback && (
                    <div className="doc-meta-row" style={{ marginTop: '4px', fontStyle: 'italic', color: 'var(--status-red)' }}>
                      "{prop.feedback}"
                    </div>
                  )}
                </div>
              </div>

              <div className="doc-card-actions">
                <button className="btn btn-secondary">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  Se tilbud
                </button>
                <button className="btn btn-secondary">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/>
                  </svg>
                  Kopier
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

// Placeholder Component
const PlaceholderPage = ({ title, description, icon }) => (
  <main className="main-content">
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '48px' }}>
      <div style={{ fontSize: '64px', marginBottom: '24px' }}>{icon}</div>
      <h1 style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '32px', fontWeight: 700, color: 'var(--finndoff-dark)', marginBottom: '16px' }}>{title}</h1>
      <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '600px' }}>{description}</p>
    </div>
  </main>
);

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('dokumentbibliotek');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <PlaceholderPage title="Hjem" description="Oversikt over anbud" icon="🏠" />;
      case 'aktive-konkurranser': return <PlaceholderPage title="Aktive konkurranser" description="Konkurranser i markedet" icon="📋" />;
      case 'pagaende-tilbud': return <PlaceholderPage title="Pågående tilbud" description="Tilbud under arbeid" icon="📝" />;
      case 'prosjektstyring': return <PlaceholderPage title="Prosjektstyring" description="Oppgaver og fremdrift" icon="🎯" />;
      case 'dokumentbibliotek': return <DokumentbibliotekPage />;
      case 'nokkelressurser': return <NokkelressurserPage />;
      case 'tilbudsbibliotek': return <TilbudsbibliotekPage />;
      case 'go-no-go': return <GoNoGoPage />; // HER: Laster den nye siden
      default: return <DokumentbibliotekPage />;
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app-layout">
        {/* New Top Header */}
        <TopHeader />
        
        {/* Sidebar and Content pushed down by Header */}
        <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
        {renderPage()}
      </div>
    </>
  );
};

export default App;