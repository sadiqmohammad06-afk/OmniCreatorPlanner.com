// THE ULTIMATE DATA SPECIFICATIONS MATRIX POOL
const omniEngineConfig = {
    state: {
        platform: 'tiktok',
        theme: 'dark',
        currency: 'USD',
        country: 'Global',
        niche: 'Technology',
        tier: 'micro'
    },
    
    // Exact requested math multipliers mapping
    rpmBounds: {
        youtube: { low: 2.00, high: 6.00 },
        tiktok: { low: 0.20, high: 1.20 },
        facebook: { low: 0.30, high: 0.80 }
    },
    
    countries: {
        UnitedStates: 1.6, UnitedKingdom: 1.4, Canada: 1.35, Australia: 1.3,
        UAE: 1.2, India: 0.55, Pakistan: 0.4, Bangladesh: 0.35, Global: 1.0
    },
    
    niches: {
        Finance: 1.5, Technology: 1.3, Education: 1.2, Business: 1.25,
        Gaming: 0.9, Entertainment: 1.0, Lifestyle: 0.95, Beauty: 1.05,
        Fitness: 1.0, Travel: 0.95
    }
};

// INITIALIZATION LOGIC FOR COMPLIANT PRESETS
document.addEventListener('DOMContentLoaded', () => {
    loadSavedSettingsFromLocalStorage();
    mountGlobalSelectorsToDesktopHeader();
    setPlatformContext(omniEngineConfig.state.platform);
    checkCookieConsentState();
});

// DESKTOP SYSTEM FILTER GENERATOR NODE MOUNT
function mountGlobalSelectorsToDesktopHeader() {
    const mountNode = document.getElementById('desktop-selectors-mount');
    if(!mountNode) return;
    
    mountNode.innerHTML = `
        <select class="inline-form-selector-pills select-currency-node" onchange="syncGlobalSelects(this, 'currency')">
            <option value="USD">USD ($)</option><option value="INR">INR (₹)</option>
        </select>
        <select class="inline-form-selector-pills select-country-node" onchange="syncGlobalSelects(this, 'country')">
            <option value="Global">Global Market</option><option value="India">India</option>
            <option value="US">United States</option><option value="UK">United Kingdom</option>
            <option value="Canada">Canada</option><option value="Australia">Australia</option>
            <option value="UAE">UAE</option><option value="Pakistan">Pakistan</option>
            <option value="Bangladesh">Bangladesh</option>
        </select>
        <select class="inline-form-selector-pills select-niche-node" onchange="syncGlobalSelects(this, 'niche')">
            <option value="Technology">Technology</option><option value="Finance">Finance</option>
            <option value="Education">Education</option><option value="Business">Business</option>
            <option value="Gaming">Gaming</option><option value="Entertainment">Entertainment</option>
            <option value="Lifestyle">Lifestyle</option><option value="Beauty">Beauty</option>
            <option value="Fitness">Fitness</option><option value="Travel">Travel</option>
        </select>
    `;
}

// SYNCHRONIZATION POOL STRATEGY (KEEPS DESKTOP AND MOBILE SELECTORS PARALLEL)
function syncGlobalSelects(element, type) {
    const val = element.value;
    omniEngineConfig.state[type] = val;
    
    // Set all identical nodes across viewport layouts
    document.querySelectorAll(`.select-${type}-node`).forEach(node => {
        node.value = val;
    });
    
    runExecutionCalculations();
}

// REACTIVE THEME CORE STATE CONTEXT
function setPlatformContext(targetPlatform) {
    omniEngineConfig.state.platform = targetPlatform;
    document.body.setAttribute('data-platform', targetPlatform);
    
    document.querySelectorAll('.platform-tab-card').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`.${targetPlatform-tab}`).classList.add('active');
    
    runExecutionCalculations();
}

// THE PRESET PILL HANDLER IMPLEMENTATION
function triggerPresetAllocation(tierLevel, clickedButton) {
    omniEngineConfig.state.tier = tierLevel;
    document.querySelectorAll('.preset-pill-btn').forEach(b => b.classList.remove('active'));
    if(clickedButton) clickedButton.classList.add('active');
    
    const viewsNode = document.getElementById('input-range-views');
    const shortsNode = document.getElementById('input-range-shorts');
    const dealsNode = document.getElementById('input-range-deals');
    
    if (tierLevel === 'nano') {
        viewsNode.value = 50000; shortsNode.value = 500000; dealsNode.value = 1;
    } else if (tierLevel === 'micro') {
        viewsNode.value = 2500000; shortsNode.value = 75000000; dealsNode.value = 8;
    } else if (tierLevel === 'mega') {
        viewsNode.value = 40000000; shortsNode.value = 450000000; dealsNode.value = 25;
    }
    
    runExecutionCalculations();
}

// MAIN ESTIMATION MATH ENGINE CORE
function runExecutionCalculations() {
    const views = parseFloat(document.getElementById('input-range-views').value);
    const shorts = parseFloat(document.getElementById('input-range-shorts').value);
    const deals = parseFloat(document.getElementById('input-range-deals').value);
    
    // Sync inner numeric counter tags above parameters
    document.getElementById('lbl-counter-views').innerText = views.toLocaleString();
    document.getElementById('lbl-counter-shorts').innerText = shorts.toLocaleString();
    document.getElementById('lbl-counter-deals').innerText = `${deals} / month`;
    
    const state = omniEngineConfig.state;
    
    // Normalized dynamic keys mapping
    let countryKey = state.country === 'US' ? 'UnitedStates' : state.country === 'UK' ? 'UnitedKingdom' : state.country;
    let countryMultiplier = omniEngineConfig.countries[countryKey] || 1.0;
    let nicheMultiplier = omniEngineConfig.niches[state.niche] || 1.0;
    let activeBounds = omniEngineConfig.rpmBounds[state.platform];
    
    // COMPUTE RANGES PILLARS
    let lowAdBase = (views / 1000) * activeBounds.low * countryMultiplier * nicheMultiplier;
    let highAdBase = (views / 1000) * activeBounds.high * countryMultiplier * nicheMultiplier;
    
    let lowShortsBase = (shorts / 1000) * (activeBounds.low * 0.05) * countryMultiplier * nicheMultiplier;
    let highShortsBase = (shorts / 1000) * (activeBounds.high * 0.15) * countryMultiplier * nicheMultiplier;
    
    // Tiered Sponsorship multipliers
    let tierSponsorMultiplier = state.tier === 'nano' ? 150 : state.tier === 'micro' ? 600 : 3500;
    let lowSponsorship = deals * tierSponsorMultiplier * countryMultiplier * nicheMultiplier * 0.8;
    let highSponsorship = deals * tierSponsorMultiplier * countryMultiplier * nicheMultiplier * 1.3;
    
    let lowAffiliate = (lowAdBase + lowShortsBase) * 0.12;
    let highAffiliate = (highAdBase + highShortsBase) * 0.18;
    
    let cumulativeLow = lowAdBase + lowShortsBase + lowSponsorship + lowAffiliate;
    let cumulativeHigh = highAdBase + highShortsBase + highSponsorship + highAffiliate;
    
    // CONVERSION DISPERSION CONSTANTS
    let fxRate = 83.5;
    
    const printFormattedRange = (lowVal, highVal, modeCurr) => {
        let sym = modeCurr === 'USD' ? '$' : '₹';
        let mult = modeCurr === 'USD' ? 1 : fxRate;
        let localeCode = modeCurr === 'INR' ? 'en-IN' : 'en-US';
        return `${sym}${Math.round(lowVal * mult).toLocaleString(localeCode)} - ${sym}${Math.round(highVal * mult).toLocaleString(localeCode)}`;
    };
    
    // Update Hero Blocks Display
    document.getElementById('payout-range-display-usd').innerText = `${printFormattedRange(cumulativeLow, cumulativeHigh, state.currency)} / mo`;
    document.getElementById('payout-range-display-inr').innerText = state.currency === 'USD' ? 
        `≈ ${printFormattedRange(cumulativeLow, cumulativeHigh, 'INR')}` : `≈ ${printFormattedRange(cumulativeLow, cumulativeHigh, 'USD')}`;
        
    // MANAGE DATA STRUCTURAL DISPLAY LAYOUT GENERATION ROWS
    const dataStack = [
        { title: 'Platform Ad Revenue', sub: 'Long-form content monetization parameters', l: lowAdBase, h: highAdBase, p: 35 },
        { title: 'Shorts / Reels Rewards', sub: 'Short-form monetization reward loops', l: lowShortsBase, h: highShortsBase, p: 20 },
        { title: 'Brand Sponsorships', sub: 'Estimated direct campaign distributions', l: lowSponsorship, h: highSponsorship, p: 35 },
        { title: 'Affiliate & Other Income', sub: 'Incremental cross-network referral matrix', l: lowAffiliate, h: highAffiliate, p: 10 }
    ];
    
    // DESKTOP TABLE INJECTION STATE
    let tableHTML = '';
    dataStack.forEach(row => {
        tableHTML += `
            <tr>
                <td><div class="table-source-cell-layout"><strong>${row.title}</strong><small>${row.sub}</small></div></td>
                <td>${printFormattedRange(row.l, row.h, state.currency).split(' - ')[0]}</td>
                <td>${row.p}%</td>
                <td><span class="table-range-span-text">${printFormattedRange(row.l, row.h, state.currency)}</span></td>
            </tr>
        `;
    });
    tableHTML += `
        <tr class="table-total-row-highlight">
            <td>Total Estimated Earnings</td>
            <td>${printFormattedRange(cumulativeLow, cumulativeHigh, state.currency).split(' - ')[0]}</td>
            <td>100%</td>
            <td>${printFormattedRange(cumulativeLow, cumulativeHigh, state.currency)}</td>
        </tr>
    `;
    document.getElementById('table-body-breakdown-rows').innerHTML = tableHTML;
    
    // MOBILE CARDS STACK BINDING
    let mobileCardsHTML = '';
    dataStack.forEach(row => {
        mobileCardsHTML += `
            <div class="responsive-breakdown-card-node">
                <div class="resp-card-left-meta">
                    <strong>${row.title}</strong>
                    <small>${row.p}% Targeted Share Allocation</small>
                </div>
                <div class="resp-card-right-metrics">
                    <span class="resp-card-val">${printFormattedRange(row.l, row.h, state.currency).split(' - ')[0]}</span>
                    <span class="resp-card-range">${printFormattedRange(row.l, row.h, state.currency)}</span>
                </div>
            </div>
        `;
    });
    document.getElementById('mobile-cards-breakdown-mount').innerHTML = mobileCardsHTML;
    
    executeReverseGoalPlannerMath();
    renderPlatformComparisonMatrixHub();
}

// REVERSE GOAL GENERATION BLOCK MATH
function executeReverseGoalPlannerMath() {
    const targetInput = parseFloat(document.getElementById('input-numeric-goal').value) || 0;
    const state = omniEngineConfig.state;
    
    let usdTargetValue = state.currency === 'USD' ? targetInput : targetInput / 83.5;
    let countryKey = state.country === 'US' ? 'UnitedStates' : state.country === 'UK' ? 'UnitedKingdom' : state.country;
    let cMult = omniEngineConfig.countries[countryKey] || 1.0;
    let nMult = omniEngineConfig.niches[state.niche] || 1.0;
    
    const computeViewsRequiredMetric = (platformKey, rpmValueType) => {
        let actualRPM = omniEngineConfig.rpmBounds[platformKey][rpmValueType] * cMult * nMult;
        if(actualRPM <= 0) return '0';
        let viewCountResult = (usdTargetValue / actualRPM) * 1000;
        
        if(viewCountResult >= 1000000) return (viewCountResult / 1000000).toFixed(1) + 'M';
        if(viewCountResult >= 1000) return (viewCountResult / 1000).toFixed(0) + 'K';
        return Math.round(viewCountResult).toLocaleString();
    };

    document.getElementById('lbl-goal-yt-views').innerText = computeViewsRequiredMetric('youtube', 'low');
    document.getElementById('lbl-goal-tt-views').innerText = computeViewsRequiredMetric('tiktok', 'low');
    document.getElementById('lbl-goal-fb-views').innerText = computeViewsRequiredMetric('facebook', 'low');
    document.getElementById('lbl-goal-currency-indicator').innerText = state.currency === 'USD' ? '$' : '₹';
}

// SECTION 5 MATRIX GENERATOR ENGINE
function renderPlatformComparisonMatrixHub() {
    const mountNode = document.getElementById('comparison-layout-mount-node');
    if(!mountNode) return;
    
    mountNode.innerHTML = `
        <div class="desktop-only-table-wrapper">
            <table class="seo-table-layout-node">
                <thead>
                    <tr><th>Platform</th><th>RPM Range</th><th>Est. Revenue / 1M Views</th><th>Best For</th></tr>
                </thead>
                <tbody>
                    <tr><td><strong>YouTube</strong></td><td>$2.00 - $6.00</td><td>$2,000 - $6,000</td><td>Long-form content, high RPM niches</td></tr>
                    <tr><td><strong>TikTok</strong></td><td>$0.20 - $1.20</td><td>$200 - $1,200</td><td>Short-form virality, mass reach</td></tr>
                    <tr><td><strong>Facebook</strong></td><td>$0.30 - $0.80</td><td>$300 - $800</td><td>Community building, loyal audience</td></tr>
                </tbody>
            </table>
        </div>
        <div class="mobile-only-breakdown-cards-stack">
            <div class="responsive-breakdown-card-node" style="flex-direction:column; align-items:flex-start; gap:6px;">
                <strong>YouTube Core Parameters</strong>
                <span style="font-size:12px; color:var(--text-muted);">RPM Range: $2.00 - $6.00 | 1M Base: $2,000 - $6,000</span>
                <small style="color:var(--text-primary);">Best For: Long-form content, high RPM niches</small>
            </div>
            <div class="responsive-breakdown-card-node" style="flex-direction:column; align-items:flex-start; gap:6px;">
                <strong>TikTok Core Parameters</strong>
                <span style="font-size:12px; color:var(--text-muted);">RPM Range: $0.20 - $1.20 | 1M Base: $200 - $1,200</span>
                <small style="color:var(--text-primary);">Best For: Short-form virality, mass reach</small>
            </div>
            <div class="responsive-breakdown-card-node" style="flex-direction:column; align-items:flex-start; gap:6px;">
                <strong>Facebook Core Parameters</strong>
                <span style="font-size:12px; color:var(--text-muted);">RPM Range: $0.30 - $0.80 | 1M Base: $300 - $800</span>
                <small style="color:var(--text-primary);">Best For: Community building, loyal audience</small>
            </div>
        </div>
    `;
}

// GLOBAL MODE CONTROLLER (DARK / LIGHT TOGGLE PRESERVED ENGINE)
function toggleGlobalThemeMode() {
    const currentTheme = omniEngineConfig.state.theme;
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    omniEngineConfig.state.theme = targetTheme;
    document.body.setAttribute('data-theme', targetTheme);
    localStorage.setItem('omni_theme_mode_preference', targetTheme);
    
    document.getElementById('theme-switcher-btn').innerText = targetTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
}

function loadSavedSettingsFromLocalStorage() {
    const savedTheme = localStorage.getItem('omni_theme_mode_preference') || 'dark';
    omniEngineConfig.state.theme = savedTheme;
    document.body.setAttribute('data-theme', savedTheme);
    document.getElementById('theme-switcher-btn').innerText = savedTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
}

// SEMANTIC INTERACTIVE ACCORDIONS TOGGLER
function toggleAccordionState(element) {
    const currentState = element.classList.contains('open');
    document.querySelectorAll('.accordion-node-item').forEach(item => item.classList.remove('open'));
    if(!currentState) element.classList.add('open');
}

// MODAL WINDOW CONTROL REPERTOIRE PACK
const policyRegistryCopyBlocks = {
    about: `<h3>About OmniCreator Planner</h3><p>This is a custom built demonstration estimation panel configured to track statistical metrics bounds utilizing browser-based computational models logic layers.</p>`,
    privacy: `<h3>Privacy Policy Framework</h3><p>OmniCreator Planner operates entirely client-side. We explicitly do not monitor, capture or transfer data parameters to central database configurations. Local states reside completely inside active storage objects parameters securely.</p>`,
    terms: `<h3>Terms of Use Protocol</h3><p>Forecasting arrays presented inside this layout system rely entirely on standard mathematical representations from public benchmarks models. Actual returns fluctuate based on direct platform cycles variables.</p>`,
    disclaimer: `<h3>Disclaimer Note</h3><p>This application functions exclusively as an estimation toolkit mapping public benchmarks trends. We explicitly hold no connection, partnership, backing or affiliation arrays with YouTube, TikTok, Facebook or Meta Platforms Inc.</p>`
};

function openLegalPolicyModal(docId) {
    const injector = document.getElementById('modal-content-injector');
    if(!injector) return;
    
    injector.innerHTML = policyRegistryCopyBlocks[docId] || `<h3>Notification</h3><p>Operational validation pipelines active.</p>`;
    document.getElementById('global-policy-modal-mount').style.display = 'flex';
}

function closeLegalPolicyModal() {
    document.getElementById('global-policy-modal-mount').style.display = 'none';
}

// COMPLIANCE GDPR COOKIE BAR PREFERENCES COOK BOOK
function acceptCookieConsent() {
    localStorage.setItem('omni_cookie_banner_approved', 'true');
    closeCookieBar();
}

function closeCookieBar() {
    document.getElementById('cookie-consent-bar').style.display = 'none';
}

function checkCookieConsentState() {
    if(localStorage.getItem('omni_cookie_banner_approved') === 'true') {
        closeCookieBar();
    }
}
