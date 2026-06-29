/* THE PLATFORM ACCENT & DESIGN VARIABLE DICTIONARY MAP */
:root {
    --bg-gradient-start: #05070d;
    --bg-gradient-end: #07090e;
    --card-surface: #0d1424;
    --card-surface-raised: #121b2d;
    --border-stroke: #22304d;
    --text-primary: #f7fbff;
    --text-muted: #8fa0bd;
    --earning-green: #00dc82;
    
    /* Dynamic Theme Token Accents (Tiktok Purple Base Default) */
    --platform-accent: #9d4edd;
    --platform-glow: rgba(157, 78, 221, 0.25);
    
    --yt-red: #ff3355;
    --tt-purple: #9d4edd;
    --fb-blue: #1d9bf0;
}

/* LIGHT MODE COMPLIANT COLOR MATRIX */
body[data-theme="light"] {
    --bg-gradient-start: #f4f7ff;
    --bg-gradient-end: #ffffff;
    --card-surface: #ffffff;
    --card-surface-raised: #f4f7ff;
    --border-stroke: #dce5f5;
    --text-primary: #0e1729;
    --text-muted: #65738b;
    --earning-green: #00aa60;
}

/* DYNAMIC PLATFORM THEMING VARIANTS MAPS */
body[data-platform="youtube"] { --platform-accent: var(--yt-red); --platform-glow: rgba(255, 51, 85, 0.25); }
body[data-platform="tiktok"] { --platform-accent: var(--tt-purple); --platform-glow: rgba(157, 78, 221, 0.25); }
body[data-platform="facebook"] { --platform-accent: var(--fb-blue); --platform-glow: rgba(29, 155, 240, 0.25); }

* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: linear-gradient(135deg, var(--bg-gradient-start), var(--bg-gradient-end)); color: var(--text-primary); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; min-height: 100vh; padding: 0 10px; overflow-x: hidden; }

.app-wrapper { max-width: 1240px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; padding: 20px 0; }

/* HEADER BRAND ARCHITECTURE */
.app-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-stroke); padding-bottom: 16px; flex-wrap: wrap; gap: 15px; }
.header-left { display: flex; align-items: center; }
.brand-container { display: flex; align-items: center; gap: 12px; }
.brand-logo-svg { width: 44px; height: 44px; animation: orbitRotation 20s linear infinite; }
@keyframes orbitRotation { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.brand-text { display: flex; flex-direction: column; }
.main-title { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
.sub-title { font-size: 11px; color: var(--text-muted); font-weight: 500; }

.header-center { display: flex; align-items: center; }
.status-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(0, 220, 130, 0.06); border: 1px solid rgba(0, 220, 130, 0.15); border-radius: 30px; padding: 6px 12px; color: var(--earning-green); font-size: 11px; font-weight: 600; }
.status-pulse-dot { width: 6px; height: 6px; background: var(--earning-green); border-radius: 50%; box-shadow: 0 0 8px var(--earning-green); animation: statusPulseAnimation 1.5s infinite; }
@keyframes statusPulseAnimation { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }

.header-right { display: flex; align-items: center; gap: 15px; }
.theme-toggle-btn { background: var(--card-surface); border: 1px solid var(--border-stroke); color: var(--text-primary); padding: 8px 16px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; transition: all 0.2s; }
.theme-toggle-btn:hover { border-color: var(--platform-accent); }

/* INLINE DESKTOP FILTER CONTROLS GRID */
.header-desktop-selectors { display: flex; gap: 10px; }
.inline-form-selector-pills { background: var(--card-surface); color: var(--text-primary); border: 1px solid var(--border-stroke); padding: 8px 14px; border-radius: 8px; font-size: 13px; font-weight: 600; outline: none; cursor: pointer; }
.inline-form-selector-pills:focus { border-color: var(--platform-accent); }

/* TABS SELECTION STRATAGEM */
.platform-tabs-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.platform-tab-card { background: var(--card-surface); border: 1px solid var(--border-stroke); padding: 18px; border-radius: 12px; color: var(--text-muted); font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.25s ease; display: flex; align-items: center; justify-content: center; gap: 10px; border-top: 3px solid var(--border-stroke); }
.platform-indicator-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.platform-indicator-dot.yt { background: var(--yt-red); }
.platform-indicator-dot.tt { background: var(--tt-purple); }
.platform-indicator-dot.fb { background: var(--fb-blue); }

.platform-tab-card.active { color: var(--text-primary); border-top-color: var(--platform-accent); border-color: var(--border-stroke); background: rgba(255,255,255,0.01); box-shadow: 0 4px 20px var(--platform-glow); }

/* CORE DASHBOARD STRUCTURAL LAYOUT SPLIT */
.main-layout-split-grid { display: grid; grid-template-columns: 4.8fr 7.2fr; gap: 24px; align-items: start; }
.glass-dashboard-card { background: var(--card-surface); border: 1px solid var(--border-stroke); border-radius: 16px; padding: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.15); }
.card-section-heading { font-size: 16px; font-weight: 700; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.5px; }

/* CONFIGURATION LABELS & PRESETS */
.mobile-inline-filters-box { display: none; } /* Injected configurations mapping */
.badge-presets-container { margin-bottom: 24px; }
.preset-label-tag { font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700; letter-spacing: 0.5px; display: block; margin-bottom: 10px; }
.badge-flex-row { display: flex; gap: 10px; }
.preset-pill-btn { background: var(--card-surface-raised); border: 1px solid var(--border-stroke); color: var(--text-primary); padding: 8px 14px; border-radius: 8px; font-size: 12.5px; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 6px; }
.preset-pill-btn.active { border-color: var(--platform-accent); background: var(--platform-glow); box-shadow: 0 0 10px var(--platform-glow); }

/* SLIDER PARAMETERS RENDER */
.slider-element-wrapper { margin-bottom: 24px; }
.slider-header-labels { display: flex; justify-content: space-between; font-size: 13px; font-weight: 500; color: var(--text-muted); }
.slider-live-value-counter { font-weight: 700; color: var(--text-primary); }
input[type="range"].native-theme-slider { width: 100%; height: 6px; background: var(--card-surface-raised); border-radius: 6px; appearance: none; margin: 12px 0 6px; outline: none; }
input[type="range"].native-theme-slider::-webkit-slider-thumb { appearance: none; width: 16px; height: 16px; border-radius: 50%; background: #ffffff; border: 2px solid var(--platform-accent); box-shadow: 0 0 8px var(--platform-accent); cursor: pointer; transition: transform 0.1s; }
.slider-marker-bounds-row { display: flex; justify-content: space-between; font-size: 10px; color: var(--text-muted); font-weight: 600; }

/* HERO PAYOUT INTERFACE CONTAINER */
.results-panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.badge-year-tag { background: var(--card-surface-raised); color: var(--text-muted); font-size: 11px; font-weight: 700; padding: 4px 8px; border-radius: 4px; }
.earnings-hero-payout-box { background: rgba(0, 220, 130, 0.02); border: 1px dashed rgba(0, 220, 130, 0.15); border-radius: 12px; padding: 28px; text-align: center; margin-bottom: 24px; }
.payout-range-primary { font-size: 36px; font-weight: 800; color: var(--earning-green); letter-spacing: -0.5px; }
.payout-range-alternate { font-size: 14px; color: var(--text-muted); margin-top: 6px; font-weight: 500; }

/* MATRIX TABLE DISPLAY PARAMETERS */
.desktop-only-table-wrapper { width: 100%; overflow-x: auto; margin-bottom: 20px; }
.breakdown-matrix-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; }
.breakdown-matrix-table th { color: var(--text-muted); font-weight: 600; padding: 12px; border-bottom: 1px solid var(--border-stroke); text-transform: uppercase; font-size: 10px; letter-spacing: 0.5px; }
.breakdown-matrix-table td { padding: 14px 12px; border-bottom: 1px solid rgba(34, 48, 77, 0.4); color: var(--text-primary); }
.table-source-cell-layout { display: flex; align-items: center; gap: 10px; }
.table-source-cell-layout strong { display: block; color: var(--text-primary); font-weight: 600; }
.table-source-cell-layout small { color: var(--text-muted); font-size: 11px; }
.table-total-row-highlight { font-weight: 700; font-size: 14px; background: rgba(255,255,255,0.01); }
.table-total-row-highlight td { border-bottom: none; border-top: 1px solid var(--border-stroke); padding-top: 18px; }
.table-total-row-highlight td:nth-child(2) { color: var(--earning-green); }

/* MOBILE INTERFACE MATRIX CARDS STACK */
.mobile-only-breakdown-cards-stack { display: none; flex-direction: column; gap: 10px; margin-bottom: 20px; }
.responsive-breakdown-card-node { background: var(--card-surface-raised); border: 1px solid var(--border-stroke); border-radius: 10px; padding: 15px; display: flex; justify-content: space-between; align-items: center; }
.resp-card-left-meta strong { display: block; font-size: 13.5px; color: var(--text-primary); }
.resp-card-left-meta small { font-size: 11px; color: var(--text-muted); display: block; margin-top: 2px; }
.resp-card-right-metrics { text-align: right; }
.resp-card-val { font-size: 14px; font-weight: 700; color: var(--text-primary); }
.resp-card-range { font-size: 11.5px; color: var(--earning-green); font-weight: 600; display: block; margin-top: 2px; }

.safe-compliance-disclaimer-label { font-size: 11.5px; color: var(--text-muted); line-height: 1.5; text-align: center; }

/* GOAL PLANNER COMPONENT SPLIT VIEW */
.goal-planner-panel-card { margin-top: 24px; }
.goal-planner-container-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-stroke); padding-bottom: 12px; margin-bottom: 20px; }
.goal-subheading-note { font-size: 11.5px; color: var(--text-muted); font-weight: 600; }
.goal-planner-split-flex-wrapper { display: grid; grid-template-columns: 4.2fr 7.8fr; gap: 24px; align-items: center; }
.goal-input-label-tag { font-size: 12px; color: var(--text-muted); font-weight: 600; display: block; }
.goal-input-relative-field { position: relative; display: flex; align-items: center; margin: 10px 0; }
.goal-currency-symbol-marker { position: absolute; left: 14px; font-weight: 700; color: var(--platform-accent); }
.goal-native-numeric-input { width: 100%; background: var(--card-surface-raised); border: 1px solid var(--border-stroke); color: var(--text-primary); font-size: 20px; font-weight: 700; padding: 10px 10px 10px 32px; border-radius: 8px; outline: none; }
.goal-native-numeric-input:focus { border-color: var(--platform-accent); }
.goal-status-indicator-block { display: flex; flex-direction: column; gap: 2px; }
.status-marker-emerald { font-size: 12px; color: var(--earning-green); font-weight: 700; }
.status-desc-text { font-size: 11px; color: var(--text-muted); }

.goal-right-metrics-display-stack { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.goal-platform-output-row { background: var(--card-surface-raised); border: 1px solid var(--border-stroke); border-radius: 10px; padding: 14px 10px; text-align: center; }
.goal-platform-name { font-size: 11px; color: var(--text-muted); font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 4px; }
.goal-computed-value { font-size: 20px; font-weight: 800; color: var(--text-primary); letter-spacing: -0.5px; }
.goal-unit-subtext { font-size: 10px; color: var(--text-muted); display: block; margin-top: 2px; }

/* LOWER SEGMENTS DATASPLIT SYSTEM */
.lower-data-split-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.seo-table-layout-node { width: 100%; border-collapse: collapse; font-size: 12.5px; text-align: left; }
.seo-table-layout-node th { padding: 10px; color: var(--text-muted); font-weight: 600; border-bottom: 1px solid var(--border-stroke); }
.seo-table-layout-node td { padding: 12px 10px; border-bottom: 1px solid rgba(34,48,77,0.25); color: var(--text-primary); }
.benefits-clean-list-layer { list-style: none; }
.benefits-clean-list-layer li { font-size: 13px; color: var(--text-muted); margin-bottom: 12px; position: relative; padding-left: 18px; line-height: 1.5; }
.benefits-clean-list-layer li::before { content: "✓"; position: absolute; left: 0; color: var(--earning-green); font-weight: 700; }

/* INTERACTIVE SEMANTIC ACCORDIONS PACK */
.accordion-layout-vertical-stack { display: flex; flex-direction: column; gap: 10px; }
.accordion-node-item { background: var(--card-surface); border: 1px solid var(--border-stroke); border-radius: 8px; padding: 16px; cursor: pointer; transition: border-color 0.2s; }
.accordion-node-item:hover { border-color: rgba(34,48,77,0.8); }
.accordion-question-row { font-weight: 600; font-size: 14px; display: flex; justify-content: space-between; align-items: center; color: var(--text-primary); }
.toggle-sign-icon { color: var(--platform-accent); font-weight: 700; }
.accordion-answer-content-block { display: none; margin-top: 12px; font-size: 13px; color: var(--text-muted); line-height: 1.6; border-top: 1px solid var(--border-stroke); padding-top: 10px; }
.accordion-node-item.open .accordion-answer-content-block { display: block; }

/* MODALS LAYOUT FRAMEWORKS */
.modal-dialog-blur-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(3, 5, 10, 0.85); backdrop-filter: blur(8px); display: none; align-items: center; justify-content: center; z-index: 9999; padding: 20px; }
.modal-body-container { background: var(--card-surface); border: 1px solid var(--border-stroke); width: 100%; max-width: 600px; border-radius: 12px; padding: 30px; position: relative; max-height: 85vh; overflow-y: auto; }
.modal-close-trigger-btn { position: absolute; top: 15px; right: 20px; background: none; border: none; color: var(--text-muted); font-size: 18px; cursor: pointer; }
.modal-dynamic-content-area h3 { font-size: 18px; margin-bottom: 12px; border-bottom: 1px solid var(--border-stroke); padding-bottom: 8px; }
.modal-dynamic-content-area p { font-size: 13px; color: var(--text-muted); line-height: 1.6; margin-bottom: 12px; }

/* COMPLIANCE SYSTEM COOKIE FOOTPRINT */
.cookie-bar { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: var(--card-surface-raised); border: 1px solid var(--border-stroke); border-radius: 12px; padding: 16px 24px; width: 92%; max-width: 850px; display: flex; justify-content: space-between; align-items: center; gap: 20px; z-index: 99999; box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
.cookie-text { font-size: 12px; color: var(--text-muted); line-height: 1.5; }
.cookie-actions { display: flex; gap: 10px; flex-shrink: 0; }
.cookie-btn { border: none; padding: 8px 16px; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer; transition: opacity 0.2s; }
.cookie-btn.primary { background: var(--platform-accent); color: #ffffff; }
.cookie-btn.secondary { background: transparent; border: 1px solid var(--border-stroke); color: var(--text-primary); }
.cookie-btn:hover { opacity: 0.9; }

/* APP FOOTER PARAMS */
.app-system-footer { text-align: center; border-top: 1px solid var(--border-stroke); padding-top: 24px; margin-top: 24px; display: flex; flex-direction: column; gap: 12px; }
.footer-legal-disclaimer-paragraph { font-size: 11px; color: var(--text-muted); max-width: 900px; margin: 0 auto; line-height: 1.6; text-align: justify; }
.footer-nav-links-row { display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; }
.footer-nav-links-row a { color: var(--text-muted); text-decoration: none; font-size: 12px; font-weight: 600; }
.footer-nav-links-row a:hover { color: var(--text-primary); }
.footer-copyright-tag-label { font-size: 11px; color: var(--text-muted); opacity: 0.7; }

/* THE CRITICAL DEVICE AUDIT BREAKPOINTS RESPONSIVENESS */
@media (max-width: 950px) {
    .main-layout-split-grid { grid-template-columns: 1fr; }
    .lower-data-split-grid { grid-template-columns: 1fr; }
    .goal-planner-split-flex-wrapper { grid-template-columns: 1fr; gap: 20px; }
    
    /* Mobile-first Restructuring Shifts */
    .header-desktop-selectors { display: none; }
    .mobile-inline-filters-box { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px; border-bottom: 1px solid var(--border-stroke); padding-bottom: 15px; }
    .form-select-row-element label { font-size: 10px; text-transform: uppercase; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 4px; }
    .form-select-row-element .form-native-dropdown { width: 100%; background: var(--card-surface-raised); color: #fff; border: 1px solid var(--border-stroke); padding: 8px; border-radius: 6px; font-size: 12px; outline: none; }
    
    .desktop-only-table-wrapper { display: none; }
    .mobile-only-breakdown-cards-stack { display: flex; }
    
    /* Layout Flow Strict Order enforcement via Flexbox utilities on parents */
    .main-layout-split-grid { display: flex; flex-direction: column; }
    .section-configure { order: 1; }
    .section-results { order: 2; }
}

@media (max-width: 600px) {
    .app-header { flex-direction: column; align-items: center; text-align: center; }
    .header-center { width: 100%; justify-content: center; }
    .mobile-inline-filters-box { grid-template-columns: 1fr; gap: 12px; }
    .goal-results-grid { grid-template-columns: 1fr; }
    .goal-right-metrics-display-stack { grid-template-columns: 1fr; }
    .cookie-bar { flex-direction: column; text-align: center; }
}
