import React, { useState } from 'react';

// --- LOGO ENDRING ---
// Bruk thumbnail-linken som fungerer for embedding.
// "sz=w2000" setter bredden til 2000px (du kan justere dette tallet eller fjerne det for standard).
const logo = "https://drive.google.com/thumbnail?id=1z_aj3yHWSBDwhUF4p6b4WEOmuyGV_jKL&sz=w2000";

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

  /* --- PROJECT CARD STYLES --- */
  .project-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 24px;
  }

  .project-card {
    background: var(--bg-white);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  .project-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
  }

  .project-card-image {
    position: relative;
    width: 100%;
    height: 160px;
    overflow: hidden;
  }

  .project-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .project-status-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .project-status-badge.vunnet { background: var(--status-green); color: white; }
  .project-status-badge.tapt { background: var(--status-red); color: white; }
  .project-status-badge.pågående { background: var(--status-yellow); color: var(--finndoff-dark); }
  .project-status-badge.avventer { background: var(--finndoff-teal); color: white; }

  .project-star-btn {
    position: absolute;
    top: 12px;
    left: 12px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }

  .project-star-btn:hover {
    background: white;
    transform: scale(1.1);
  }

  .project-star-btn svg {
    width: 20px;
    height: 20px;
    transition: all 0.2s;
  }

  .project-star-btn.starred svg {
    fill: #f59e0b;
    color: #f59e0b;
  }

  .project-star-btn:not(.starred) svg {
    fill: none;
    color: var(--text-secondary);
  }

  .project-card-content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .project-card-header {
    margin-bottom: 12px;
  }

  .project-card-title {
    font-family: 'Work Sans', sans-serif;
    font-size: 17px;
    font-weight: 600;
    color: var(--finndoff-dark);
    margin-bottom: 4px;
    line-height: 1.3;
  }

  .project-card-client {
    font-size: 13px;
    color: var(--text-secondary);
  }

  .project-category-badge {
    display: inline-block;
    padding: 3px 10px;
    background: var(--bg-primary);
    border-radius: 12px;
    font-size: 11px;
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: 16px;
  }

  .project-metrics {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    padding-top: 16px;
    border-top: 1px solid var(--border);
    margin-top: auto;
  }

  .project-metric {
    text-align: center;
  }

  .project-metric-icon {
    font-size: 16px;
    margin-bottom: 4px;
  }

  .project-metric-value {
    font-size: 13px;
    font-weight: 600;
    color: var(--finndoff-dark);
  }

  .project-metric-label {
    font-size: 10px;
    color: var(--text-light);
    text-transform: uppercase;
  }

  .reference-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: var(--bg-white);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all 0.2s;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-secondary);
  }

  .reference-toggle:hover {
    border-color: var(--finndoff-teal);
  }

  .reference-toggle.active {
    background: #fef3c7;
    border-color: #f59e0b;
    color: #b45309;
  }

  .reference-toggle svg {
    width: 18px;
    height: 18px;
  }

  .filter-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }

  /* --- SIDEBAR TOGGLE & MOBILE STYLES --- */
  .menu-toggle-btn {
    display: none;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: var(--radius-md);
    color: var(--text-secondary);
    transition: all 0.2s;
  }

  .menu-toggle-btn:hover {
    background: var(--bg-primary);
    color: var(--finndoff-teal);
  }

  .menu-toggle-btn svg {
    width: 24px;
    height: 24px;
  }

  .sidebar-overlay {
    display: none;
    position: fixed;
    top: var(--header-height);
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(11, 35, 51, 0.5);
    z-index: 99;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .sidebar-overlay.visible {
    opacity: 1;
  }

  /* Desktop: sidebar can be collapsed */
  .sidebar.collapsed {
    transform: translateX(-100%);
  }

  .main-content.sidebar-collapsed {
    margin-left: 0;
  }

  .analysis-footer.sidebar-collapsed {
    left: 0;
  }

  /* Mobile styles */
  @media (max-width: 768px) {
    .menu-toggle-btn {
      display: flex;
    }

    .sidebar {
      transform: translateX(-100%);
      transition: transform 0.3s ease;
    }

    .sidebar.mobile-open {
      transform: translateX(0);
    }

    .sidebar-overlay {
      display: block;
    }

    .main-content {
      margin-left: 0;
    }

    .main-content.sidebar-collapsed {
      margin-left: 0;
    }

    .analysis-footer {
      left: 0;
    }

    .top-nav {
      display: none;
    }

    .header-right .header-link {
      display: none;
    }

    .page-title {
      font-size: 22px;
    }

    .project-cards-grid {
      grid-template-columns: 1fr;
    }

    .doc-cards-grid {
      grid-template-columns: 1fr;
    }

    .go-no-go-grid {
      grid-template-columns: 1fr;
    }

    .doc-filter-tabs {
      flex-wrap: wrap;
    }

    .filter-row {
      flex-direction: column;
      align-items: stretch;
    }

    .page-header {
      margin-bottom: 16px;
    }

    .page-description {
      display: none;
    }

    .main-content {
      padding: 16px;
      padding-bottom: 100px;
    }

    .project-cards-grid,
    .doc-cards-grid {
      gap: 12px;
    }

    .project-card-content {
      padding: 14px;
    }

    .project-metrics {
      gap: 8px;
      padding-top: 12px;
    }

    .readiness-banner {
      padding: 14px 18px;
      margin-bottom: 20px;
    }

    .doc-filter-tabs {
      padding: 3px;
      margin-bottom: 16px;
    }

    .filter-tab {
      padding: 6px 10px;
      font-size: 12px;
    }

    .reference-toggle {
      padding: 6px 12px;
      font-size: 12px;
    }

    .nav-card {
      padding: 8px;
      margin-bottom: 8px;
    }

    .tender-header-card {
      padding: 20px;
    }

    .tender-title {
      font-size: 20px;
    }

    .tender-meta-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .qualification-grid {
      gap: 10px;
    }

    .qual-item {
      padding: 14px 16px;
    }

    .qual-title {
      font-size: 13px;
    }

    .match-summary {
      padding: 20px;
      flex-direction: column;
      text-align: center;
      gap: 16px;
    }
  }

  /* --- TENDER QUALIFICATION STYLES --- */
  .tender-header-card {
    background: linear-gradient(135deg, var(--finndoff-teal) 0%, #006a6e 100%);
    border-radius: var(--radius-lg);
    padding: 28px;
    color: white;
    margin-bottom: 24px;
    position: relative;
    overflow: hidden;
  }

  .tender-header-card::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 300px;
    height: 300px;
    background: rgba(255,255,255,0.05);
    border-radius: 50%;
  }

  .tender-badge {
    display: inline-block;
    background: rgba(255,255,255,0.2);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 12px;
  }

  .tender-title {
    font-family: 'Work Sans', sans-serif;
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 8px;
    position: relative;
  }

  .tender-client {
    font-size: 15px;
    opacity: 0.9;
    margin-bottom: 20px;
  }

  .tender-meta-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    position: relative;
  }

  .tender-meta-item {
    background: rgba(255,255,255,0.1);
    border-radius: var(--radius-md);
    padding: 12px;
    text-align: center;
  }

  .tender-meta-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    opacity: 0.8;
    margin-bottom: 4px;
  }

  .tender-meta-value {
    font-size: 14px;
    font-weight: 600;
  }

  .section-title {
    font-family: 'Work Sans', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: var(--finndoff-dark);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .section-title-icon {
    width: 24px;
    height: 24px;
  }

  .qualification-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
  }

  .qual-item {
    background: var(--bg-white);
    border-radius: var(--radius-md);
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    box-shadow: var(--shadow-sm);
    border-left: 4px solid var(--status-green);
  }

  .qual-item.warning {
    border-left-color: var(--status-yellow);
  }

  .qual-content {
    flex: 1;
  }

  .qual-title {
    font-weight: 600;
    color: var(--finndoff-dark);
    font-size: 14px;
    margin-bottom: 2px;
  }

  .qual-desc {
    font-size: 12px;
    color: var(--text-secondary);
  }

  .qual-status {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
  }

  .qual-status.fulfilled {
    background: rgba(105, 190, 91, 0.1);
    color: var(--status-green);
  }

  .qual-status.pending {
    background: rgba(255, 203, 5, 0.15);
    color: #b45309;
  }

  .qual-status-icon {
    width: 16px;
    height: 16px;
  }

  .match-summary {
    background: linear-gradient(135deg, #e6f4e4 0%, #d4edda 100%);
    border: 2px solid var(--status-green);
    border-radius: var(--radius-lg);
    padding: 24px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .match-text h3 {
    font-family: 'Work Sans', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #155724;
    margin-bottom: 4px;
  }

  .match-text p {
    font-size: 14px;
    color: #155724;
    opacity: 0.85;
  }

  .match-score {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .match-percentage {
    font-family: 'Work Sans', sans-serif;
    font-size: 42px;
    font-weight: 800;
    color: var(--status-green);
  }

  .match-action .btn {
    padding: 12px 24px;
    font-size: 14px;
  }
`;

// --- TOP HEADER KOMPONENT ---
const TopHeader = ({ onMenuToggle, isSidebarOpen }) => {
  return (
    <header className="top-header">
      <div className="header-left">
        <button className="menu-toggle-btn" onClick={onMenuToggle} aria-label="Toggle menu">
          {isSidebarOpen ? (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <img src="https://drive.google.com/thumbnail?id=1hzKGqPw1C9UzcystndmzV8P0qEZZNWjn&sz=w100" alt="Menu" style={{width: '24px', height: '24px'}} />
          )}
        </button>

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
const Sidebar = ({ currentPage, onNavigate, isOpen, onClose }) => {
  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
      />
      <aside className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
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
            Firmadokumenter
          </button>
          <button className={`nav-item ${currentPage === 'tilbudsbibliotek' ? 'active' : ''}`} onClick={() => onNavigate('tilbudsbibliotek')}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            Prosjektbibliotek
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
    </>
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

// --- GO / NO-GO PAGE (Tender Qualification View) ---
const GoNoGoPage = () => {
  const qualifications = [
    { id: 1, title: "Skatteattest", desc: "Gyldig attest, maks 6 mnd gammel", fulfilled: true },
    { id: 2, title: "Firmaattest", desc: "Lovlig etablert foretak", fulfilled: true },
    { id: 3, title: "Kredittrating A", desc: "Økonomisk kapasitet bekreftet", fulfilled: true },
    { id: 4, title: "Referanseprosjekter", desc: "7 relevante prosjekter siste 5 år", fulfilled: true },
    { id: 5, title: "HMS-system", desc: "Internkontrollforskriften oppfylt", fulfilled: true },
    { id: 6, title: "Forsikringer", desc: "Alle nødvendige forsikringer på plass", fulfilled: true },
    { id: 7, title: "Lærlingordning", desc: "Aktiv lærlingordning i bedriften", fulfilled: true },
    { id: 8, title: "Lønns- og arbeidsvilkår", desc: "Egenerklæring signert", fulfilled: true },
  ];

  const fulfilledCount = qualifications.filter(q => q.fulfilled).length;
  const matchPercentage = Math.round((fulfilledCount / qualifications.length) * 100);

  return (
    <main className="main-content">
      {/* Tender Header */}
      <div className="tender-header-card">
        <div style={{position: 'absolute', top: '20px', right: '20px', fontSize: '48px'}}>🟢</div>
        <span className="tender-badge">Rammeavtale</span>
        <h1 className="tender-title">Graving og massetransport</h1>
        <p className="tender-client">Ulstein Kommune</p>

        <div className="tender-meta-grid">
          <div className="tender-meta-item">
            <div className="tender-meta-label">Verdi</div>
            <div className="tender-meta-value">7,5 MNOK</div>
          </div>
          <div className="tender-meta-item">
            <div className="tender-meta-label">Varighet</div>
            <div className="tender-meta-value">2 år</div>
          </div>
          <div className="tender-meta-item">
            <div className="tender-meta-label">Frist</div>
            <div className="tender-meta-value">19. jan 2026</div>
          </div>
          <div className="tender-meta-item">
            <div className="tender-meta-label">Tilbydere</div>
            <div className="tender-meta-value">~5 forventet</div>
          </div>
        </div>
      </div>

      {/* Qualification Section */}
      <h2 className="section-title">
        <svg className="section-title-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        Kvalifikasjonskrav
      </h2>

      <div className="qualification-grid">
        {qualifications.map(qual => (
          <div key={qual.id} className={`qual-item ${qual.fulfilled ? '' : 'warning'}`}>
            <div className="qual-content">
              <div className="qual-title">{qual.title}</div>
              <div className="qual-desc">{qual.desc}</div>
            </div>
            <div className={`qual-status ${qual.fulfilled ? 'fulfilled' : 'pending'}`}>
              {qual.fulfilled ? (
                <>
                  <svg className="qual-status-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  Oppfylt
                </>
              ) : (
                <>
                  <svg className="qual-status-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Mangler
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Match Summary */}
      <div className="match-summary">
        <div className="match-text">
          <h3>Kvalifisert for dette anbudet</h3>
          <p>Alle krav er oppfylt. Klar til å levere tilbud.</p>
        </div>
        <div className="match-score">
          <div className="match-percentage">{matchPercentage}%</div>
          <div className="match-action">
            <button className="btn btn-primary">Start tilbudsarbeid</button>
          </div>
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
        <h1 className="page-title"><img src="https://drive.google.com/thumbnail?id=1Bbh-BE7GgLTgl_3GYaY9DmOZeH37-vyr&sz=w100" alt="" style={{height: '28px', marginRight: '8px', verticalAlign: 'middle'}} /> Firmadokumenter</h1>
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

// --- PROJECT CARD COMPONENT ---
const ProjectCard = ({ project, onToggleReference }) => {
  return (
    <div className="project-card">
      <div className="project-card-image">
        <img src={project.imageUrl} alt={project.title} />
        <button
          className={`project-star-btn ${project.isReference ? 'starred' : ''}`}
          onClick={() => onToggleReference(project.id)}
          title={project.isReference ? 'Fjern fra referanseprosjekter' : 'Legg til som referanseprosjekt'}
        >
          <img
            src={project.isReference
              ? "https://drive.google.com/thumbnail?id=1LF1Z1gARUASzNGt5KSSC9DL974nYCSTY&sz=w100"
              : "https://drive.google.com/thumbnail?id=1tMY3xWLxYmwnOCQbGN_Ws_BXeGY53Ff1&sz=w100"
            }
            alt={project.isReference ? 'Referanseprosjekt' : 'Ikke referanseprosjekt'}
            style={{width: '20px', height: '20px'}}
          />
        </button>
        <span className={`project-status-badge ${project.status.toLowerCase()}`}>
          {project.status}
        </span>
      </div>

      <div className="project-card-content">
        <div className="project-card-header">
          <h4 className="project-card-title">{project.title}</h4>
          <p className="project-card-client">{project.client}</p>
        </div>

        <span className="project-category-badge">{project.category}</span>

        <div className="project-metrics">
          <div className="project-metric">
            <div className="project-metric-icon">
              <img src="https://drive.google.com/thumbnail?id=1ahd4VRJ1eDdRipBWqfgnjF_JwaSo-ZMP&sz=w100" alt="" style={{width: '18px', height: '18px'}} />
            </div>
            <div className="project-metric-value">{project.value}</div>
            <div className="project-metric-label">Verdi</div>
          </div>
          <div className="project-metric">
            <div className="project-metric-icon">
              <img src="https://drive.google.com/thumbnail?id=1A7-vr7S7g3xXtE4tKvhokrAEqYvVo7MD&sz=w100" alt="" style={{width: '18px', height: '18px'}} />
            </div>
            <div className="project-metric-value">{project.period}</div>
            <div className="project-metric-label">Periode</div>
          </div>
          <div className="project-metric">
            <div className="project-metric-icon">
              <img src="https://drive.google.com/thumbnail?id=1DhBba2Mb5rxsilbqx026Mx1qWpmz1qBn&sz=w100" alt="" style={{width: '18px', height: '18px'}} />
            </div>
            <div className="project-metric-value">{project.location}</div>
            <div className="project-metric-label">Sted</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PROSJEKTBIBLIOTEK PAGE ---
const TilbudsbibliotekPage = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [showReferencesOnly, setShowReferencesOnly] = useState(false);

  const [projects, setProjects] = useState([
    {
      id: "1",
      title: "VVA Rødbergveien",
      client: "Harstad Kommune",
      value: "50 MNOK",
      period: "2018–2020",
      location: "Harstad",
      status: "Vunnet",
      category: "Vei/VA",
      isReference: true,
      imageUrl: "https://drive.google.com/thumbnail?id=1w_m40djhgnC0hG958mvLX6AdoAjvfl4x&sz=w800"
    },
    {
      id: "2",
      title: "Riving Radarstasjon (Gompen)",
      client: "Forsvarsbygg",
      value: "30 MNOK",
      period: "2008–2010",
      location: "Sørreisa",
      status: "Vunnet",
      category: "Riving",
      isReference: true,
      imageUrl: "https://drive.google.com/thumbnail?id=15SUyArBnX-WP0GI1hm6Y3pwYt4z1ZU_3&sz=w800"
    },
    {
      id: "3",
      title: "PS-Mustaparta II",
      client: "Harstad Kommune",
      value: "49 MNOK",
      period: "2023–2024",
      location: "Harstad",
      status: "Vunnet",
      category: "VA",
      isReference: true,
      imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2670&auto=format&fit=crop"
    },
    {
      id: "4",
      title: "Miljøopprydding Banak Flystasjon",
      client: "Forsvarsbygg",
      value: "14 MNOK",
      period: "2008–2010",
      location: "Lakselv",
      status: "Vunnet",
      category: "Miljøsanering",
      isReference: true,
      imageUrl: "https://images.unsplash.com/photo-1599691653303-34e2c0571b76?q=80&w=2670&auto=format&fit=crop"
    },
    {
      id: "5",
      title: "VA Bergselvdammen - Langsletta",
      client: "Harstad Kommune",
      value: "41 MNOK",
      period: "2019–2021",
      location: "Harstad",
      status: "Vunnet",
      category: "VA",
      isReference: true,
      imageUrl: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2669&auto=format&fit=crop"
    },
    {
      id: "6",
      title: "Masseforflytning Ramsund",
      client: "Forsvarsbygg",
      value: "30 MNOK",
      period: "2013",
      location: "Ramsund",
      status: "Vunnet",
      category: "Miljø/Grunn",
      isReference: true,
      imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2670&auto=format&fit=crop"
    },
    {
      id: "7",
      title: "Trafikkpark Blåbærhaugen",
      client: "Harstad Kommune",
      value: "9 MNOK",
      period: "2022–2023",
      location: "Harstad",
      status: "Vunnet",
      category: "Park/Anlegg",
      isReference: true,
      imageUrl: "https://images.unsplash.com/photo-1558435186-d31d102353a9?q=80&w=2670&auto=format&fit=crop"
    },
    {
      id: "8",
      title: "VA Ytre Kjelhus",
      client: "Harstad Kommune",
      value: "40 MNOK",
      period: "2025–",
      location: "Harstad",
      status: "Pågående",
      category: "VA",
      isReference: false,
      imageUrl: "https://images.unsplash.com/photo-1590644365607-1c5a2e97a39e?q=80&w=2670&auto=format&fit=crop"
    },
    {
      id: "9",
      title: "Tunnel vedlikehold Nordland",
      client: "Nordland Fylkeskommune",
      value: "60 MNOK",
      period: "2026",
      location: "Nordland",
      status: "Tapt",
      category: "Vei/Tunnel",
      isReference: false,
      imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2669&auto=format&fit=crop"
    }
  ]);

  const toggleReference = (id) => {
    setProjects(prev => prev.map(p =>
      p.id === id ? { ...p, isReference: !p.isReference } : p
    ));
  };

  // Filter logic
  const filteredProjects = projects.filter(p => {
    const statusMatch = statusFilter === 'all' || p.status === statusFilter;
    const referenceMatch = !showReferencesOnly || p.isReference;
    return statusMatch && referenceMatch;
  });

  const referenceCount = projects.filter(p => p.isReference).length;

  return (
    <main className="main-content">
      <div className="page-header">
        <h1 className="page-title"><img src="https://drive.google.com/thumbnail?id=1-rzQiW5Ewmi_2jvGZfKsU5rNP8GmQu90&sz=w100" alt="" style={{height: '28px', marginRight: '8px', verticalAlign: 'middle'}} /> Prosjektbibliotek</h1>
        <p className="page-description">
          Oversikt over alle prosjekter og anbud. Merk dine beste prosjekter med stjerne for å bruke dem som referanseprosjekter i fremtidige tilbud.
        </p>
      </div>

      <div className="filter-row">
        <div className="doc-filter-tabs">
          <button className={`filter-tab ${statusFilter === 'all' ? 'active' : ''}`} onClick={() => setStatusFilter('all')}>
            Alle <span className="tab-badge">{projects.length}</span>
          </button>
          <button className={`filter-tab ${statusFilter === 'Vunnet' ? 'active' : ''}`} onClick={() => setStatusFilter('Vunnet')}>
            Vunnet <span className="tab-badge">{projects.filter(p => p.status === 'Vunnet').length}</span>
          </button>
          <button className={`filter-tab ${statusFilter === 'Pågående' ? 'active' : ''}`} onClick={() => setStatusFilter('Pågående')}>
            Pågående <span className="tab-badge">{projects.filter(p => p.status === 'Pågående').length}</span>
          </button>
          <button className={`filter-tab ${statusFilter === 'Tapt' ? 'active' : ''}`} onClick={() => setStatusFilter('Tapt')}>
            Tapt <span className="tab-badge">{projects.filter(p => p.status === 'Tapt').length}</span>
          </button>
        </div>

        <button
          className={`reference-toggle ${showReferencesOnly ? 'active' : ''}`}
          onClick={() => setShowReferencesOnly(!showReferencesOnly)}
        >
          <svg viewBox="0 0 24 24" fill={showReferencesOnly ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          Kun referanseprosjekter ({referenceCount})
        </button>
      </div>

      <div className="project-cards-grid">
        {filteredProjects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onToggleReference={toggleReference}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
          <p>Ingen prosjekter matcher filteret.</p>
        </div>
      )}
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
  const [currentPage, setCurrentPage] = useState('tilbudsbibliotek');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    // Close sidebar on mobile after navigation
    setIsSidebarOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <PlaceholderPage title="Hjem" description="Oversikt over anbud" icon="🏠" />;
      case 'aktive-konkurranser': return <PlaceholderPage title="Aktive konkurranser" description="Konkurranser i markedet" icon="📋" />;
      case 'pagaende-tilbud': return <PlaceholderPage title="Pågående tilbud" description="Tilbud under arbeid" icon="📝" />;
      case 'prosjektstyring': return <PlaceholderPage title="Prosjektstyring" description="Oppgaver og fremdrift" icon="🎯" />;
      case 'dokumentbibliotek': return <DokumentbibliotekPage />;
      case 'nokkelressurser': return <NokkelressurserPage />;
      case 'tilbudsbibliotek': return <TilbudsbibliotekPage />;
      case 'go-no-go': return <GoNoGoPage />;
      default: return <DokumentbibliotekPage />;
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app-layout">
        <TopHeader onMenuToggle={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <Sidebar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />
        {renderPage()}
      </div>
    </>
  );
};

export default App;