// GLOBAL DATA MATRICES SETUP (SERVERLESS ENGINE)
const corePlatformData = {
    currentPlatform: 'tiktok',
    activeTier: 'micro',
    
    // Base platform multipliers based on country profiles
    geoMultipliers: {
        Global: 1.0,
        India: 0.6,
        US: 2.8
    },
    
    // Niche variations mapping directly to monetization indexes
    nicheFactors: {
        tech: { ad: 1.8, shorts: 1.4, brand: 2.0 },
        finance: { ad: 2.5, shorts: 1.6, brand: 2.2 },
        gaming: { ad: 0.6, shorts: 0.7, brand: 0.8 },
        entertainment: { ad: 0.9, shorts: 1.0, brand: 1.1 },
        lifestyle: { ad: 1.2, shorts: 1.1, brand: 1.4 }
    },

    // Platform configurations
    youtube: { baseAdRPM: 3.5, baseShortsRPM: 0.05, brandDealBase: 450, color: '#ff3355' },
    tiktok: { baseAdRPM: 0.8, baseShortsRPM: 0.08, brandDealBase: 380, color: '#9d00ff' },
    facebook: { baseAdRPM: 1.2, baseShortsRPM: 0.04, brandDealBase: 320, color: '#0099ff' }
};

// INITIAL RUN TRIGGER
window.addEventListener('DOMContentLoaded', () => {
    switchPlatform('tiktok'); // Default application configuration state
    checkCookieConsent();
});

// THE DYNAMIC COLOR SWITCH ENGINE
function switchPlatform(platformName) {
    corePlatformData.currentPlatform = platformName;
    document.body.setAttribute('data-theme', platformName);
    
    // Dynamically update the dynamic theme colors in styles
    const activeColor = corePlatformData[platformName].color;
    document.documentElement.style.setProperty('--accent', activeColor);
    document.documentElement.style.setProperty('--accent-glow', activeColor + '40');
    
    // Loop through tabs utility UI
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.tab-btn.${platformName}`).classList.add('active');
    
    updateCalculations();
}

// QUICK BADGES IMPLEMENTATION PRESETS
function applyPreset(tier) {
    corePlatformData.activeTier = tier;
    document.querySelectorAll('.preset-badge').forEach(b => b.classList.remove('active'));
    
    const viewSlider = document.getElementById('slider-views');
    const shortsSlider = document.getElementById('slider-shorts');
    const dealsSlider = document.getElementById('slider-deals');

    if (tier === 'nano') {
        viewSlider.value = 85000; shortsSlider.value = 950000; dealsSlider.value = 1;
        event.target.classList.add('active');
    } else if (tier === 'micro') {
        viewSlider.value = 2500000; shortsSlider.value = 75000000; dealsSlider.value = 8;
        event.target.classList.add('active');
    } else if (tier === 'mega') {
        viewSlider.value = 42000000; shortsSlider.value = 410000000; dealsSlider.value = 22;
        event.target.classList.add('active');
    }
    updateCalculations();
}

// CORE MATHEMATICAL COMPUTATION ENGINE
function updateCalculations() {
    const views = parseFloat(document.getElementById('slider-views').value);
    const shorts = parseFloat(document.getElementById('slider-shorts').value);
    const deals = parseFloat(document.getElementById('slider-deals').value);
    
    const currentCurr = document.getElementById('currency-select').value;
    const geo = document.getElementById('country-select').value;
    const niche = document.getElementById('niche-select').value;
    
    // Sync numerical display tags above sliders
    document.getElementById('views-display').innerText = views.toLocaleString();
    document.getElementById('shorts-display').innerText = shorts.toLocaleString();
    document.getElementById('deals-display').innerText = `${deals} / month`;
    
    // Fetch calculation configurations
    const platform = corePlatformData.currentPlatform;
    const geoMultiplier = corePlatformData.geoMultipliers[geo];
    const nicheFactor = corePlatformData.nicheFactors[niche];
    const cfg = corePlatformData[platform];
    
    // CALCULATING SEGMENTS (REAL-TIME ALGORITHM CALCULATIONS)
    let adRevenue = (views / 1000) * cfg.baseAdRPM * geoMultiplier * nicheFactor.ad;
    let shortsRevenue = (shorts / 1000) * cfg.baseShortsRPM * geoMultiplier * nicheFactor.shorts;
    let brandRevenue = deals * cfg.brandDealBase * geoMultiplier * nicheFactor.brand * 1.5;
    let affiliateRevenue = (adRevenue + shortsRevenue) * 0.18; // Derived ratio representation
    
    let totalEarnings = adRevenue + shortsRevenue + brandRevenue + affiliateRevenue;
    
    // Setup potential dynamic ranges
    let lowBound = totalEarnings * 0.82;
    let highBound = totalEarnings * 1.35;
    
    // CURRENCY CONVERSION MULTIPLIER MECHANISM (USD BASE TO INR COMPLIANT DATA)
    let exchangeRate = 83.5;
    let outputSymbol = currentCurr === 'USD' ? '$' : '₹';
    let conversionFactor = currentCurr === 'USD' ? 1 : exchangeRate;
    
    // Formatting standard currency views structures
    const formatValue = (num) => {
        return outputSymbol + Math.round(num * conversionFactor).toLocaleString(currentCurr === 'INR' ? 'en-IN' : 'en-US');
    };
    
    // Update Master Top Blocks
    document.getElementById('total-range').innerText = `${formatValue(lowBound)} - ${formatValue(highBound)} / mo`;
    document.getElementById('alt-total-range').innerText = currentCurr === 'USD' ? 
        `≈ ₹${Math.round(lowBound * exchangeRate).toLocaleString('en-IN')} - ₹${Math.round(highBound * exchangeRate).toLocaleString('en-IN')}` : 
        `≈ $${Math.round(lowBound / exchangeRate).toLocaleString('en-US')} - $${Math.round(highBound / exchangeRate).toLocaleString('en-US')}`;
        
    // Inject inner table breakdown segments
    document.getElementById('breakdown-ad').innerText = formatValue(adRevenue);
    document.getElementById('breakdown-shorts').innerText = formatValue(shortsRevenue);
    document.getElementById('breakdown-brand').innerText = formatValue(brandRevenue);
    document.getElementById('breakdown-affiliate').innerText = formatValue(affiliateRevenue);
    document.getElementById('final-sum').innerText = formatValue(totalEarnings);
    
    // Range text allocations
    document.getElementById('range-ad').innerText = `${formatValue(adRevenue*0.85)} - ${formatValue(adRevenue*1.3)}`;
    document.getElementById('range-shorts').innerText = `${formatValue(shortsRevenue*0.75)} - ${formatValue(shortsRevenue*1.4)}`;
    document.getElementById('range-brand').innerText = `${formatValue(brandRevenue*0.8)} - ${formatValue(brandRevenue*1.2)}`;
    document.getElementById('range-affiliate').innerText = `${formatValue(affiliateRevenue*0.6)} - ${formatValue(affiliateRevenue*1.5)}`;
    document.getElementById('final-range').innerText = `${formatValue(totalEarnings*0.78)} - ${formatValue(totalEarnings*1.45)}`;
    
    // Adjust dynamic percentage shares
    let totalSumSafe = totalEarnings || 1; 
    document.getElementById('pct-ad').innerText = Math.round((adRevenue/totalSumSafe)*100) + '%';
    document.getElementById('pct-shorts').innerText = Math.round((shortsRevenue/totalSumSafe)*100) + '%';
    document.getElementById('pct-brand').innerText = Math.round((brandRevenue/totalSumSafe)*100) + '%';
    document.getElementById('pct-affiliate').innerText = Math.round((affiliateRevenue/totalSumSafe)*100) + '%';
    
    // Synchronize X-Factor widget components
    document.getElementById('goal-symbol').innerText = currentCurr === 'USD' ? '$' : '₹';
    calculateReverseGoal();
}

// THE REVERSE INTEGRATION GOAL CALCULATOR ENGINE
function calculateReverseGoal() {
    const targetInput = parseFloat(document.getElementById('target-amount').value) || 0;
    const currentCurr = document.getElementById('currency-select').value;
    const geo = document.getElementById('country-select').value;
    const niche = document.getElementById('niche-select').value;
    
    let exchangeRate = 83.5;
    // Standardize metric values to target USD base internal units
    let targetInUSD = currentCurr === 'USD' ? targetInput : targetInput / exchangeRate;
    
    const geoMultiplier = corePlatformData.geoMultipliers[geo];
    const nicheFactor = corePlatformData.nicheFactors[niche];
    
    // Calculate targeted projections using reverse division logic configurations
    const computeRequiredViews = (platformName, typeBase) => {
        let rpm = corePlatformData[platformName][typeBase] * geoMultiplier * nicheFactor.ad;
        if(rpm <= 0) return '0';
        let viewsNeeded = (targetInUSD / rpm) * 1000;
        
        if (viewsNeeded >= 1000000) return (viewsNeeded / 1000000).toFixed(1) + 'M';
        if (viewsNeeded >= 1000) return (viewsNeeded / 1000).toFixed(0) + 'K';
        return Math.round(viewsNeeded).toString();
    };

    document.getElementById('target-yt-views').innerText = computeRequiredViews('youtube', 'baseAdRPM');
    document.getElementById('target-tt-views').innerText = computeRequiredViews('tiktok', 'baseShortsRPM');
    document.getElementById('target-fb-views').innerText = computeRequiredViews('facebook', 'baseAdRPM');
}

// CRAWLER ACCORDION EXPANSION LOGIC
function toggleFaq(element) {
    const isOpen = element.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('open'));
    if (!isOpen) element.classList.add('open');
}

// COMPLIANCE DATA LAYERS (MODALS REPERTOIRE PACK)
const complianceDocs = {
    privacy: `<h2>Privacy Policy</h2><p>OmniCreator Planner operates completely client-side. We explicitly do not track, collect, capture, or cloud-sync any values inputted inside our analytical revenue evaluation matrices.</p><p>Your local cookies identifiers serve to secure user system presets configuration seamlessly without central profile logs creation across our servers.</p>`,
    terms: `<h2>Terms of Use</h2><p>All calculations presented via OmniCreator Planner serve strictly as statistical forecasting models calibrated against public creator benchmarks. Real earnings are subjected to independent platforms monetization cycles.</p><p>Commercial reverse engineering of our underlying modular scaling metrics parameters is strictly unauthorized under fair utility laws.</p>`,
    contact: `<h2>Contact</h2><p>Have inquiries regarding data frameworks adjustments, partnerships or dynamic brand integrations? Reach out directly to our administration support wing via electronic validation lines.</p><p>Email infrastructure protocols: support@omnicreatorplanner.com</p>`
};

function openModal(type) {
    document.getElementById('modal-content').innerHTML = complianceDocs[type];
    document.getElementById('modal-overlay').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
}

// COOKIE BANNER COMPLIANCE FLOW
function acceptCookies() {
    localStorage.setItem('omni_cookies_accepted', 'true');
    document.getElementById('cookie-bar').style.display = 'none';
}

function checkCookieConsent() {
    if (localStorage.getItem('omni_cookies_accepted') === 'true') {
        document.getElementById('cookie-bar').style.display = 'none';
    }
}
