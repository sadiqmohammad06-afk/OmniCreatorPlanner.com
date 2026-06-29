const omniEngineConfig = {
  state: {
    platform: 'youtube',
    theme: 'dark',
    currency: 'USD',
    country: 'India',
    niche: 'Technology',
    tier: 'micro'
  },
  rpmBounds: {
    youtube: { low: 2.00, high: 6.00 },
    tiktok: { low: 0.20, high: 1.20 },
    facebook: { low: 0.30, high: 0.80 }
  },
  shortsBounds: {
    youtube: { low: 0.03, high: 0.12 },
    tiktok: { low: 0.20, high: 1.20 },
    facebook: { low: 0.05, high: 0.25 }
  },
  countries: {
    US: 1.6,
    UK: 1.4,
    Canada: 1.35,
    Australia: 1.3,
    UAE: 1.2,
    India: 0.55,
    Pakistan: 0.4,
    Bangladesh: 0.35,
    Global: 1.0
  },
  niches: {
    Finance: 1.5,
    Technology: 1.3,
    Education: 1.2,
    Business: 1.25,
    Gaming: 0.9,
    Entertainment: 1.0,
    Lifestyle: 0.95,
    Beauty: 1.05,
    Fitness: 1.0,
    Travel: 0.95
  },
  sponsorBase: {
    nano: 120,
    micro: 450,
    mega: 1800
  }
};

document.addEventListener('DOMContentLoaded', () => {
  loadSavedSettingsFromLocalStorage();
  mountGlobalSelectorsToDesktopHeader();
  syncAllSelectorValues();
  setPlatformContext(omniEngineConfig.state.platform);
  checkCookieConsentState();
});

function mountGlobalSelectorsToDesktopHeader() {
  const mountNode = document.getElementById('desktop-selectors-mount');
  if (!mountNode) return;
  mountNode.innerHTML = `
    <select class="inline-form-selector-pills select-currency-node" onchange="syncGlobalSelects(this, 'currency')">
      <option value="USD">USD ($)</option><option value="INR">INR (₹)</option>
    </select>
    <select class="inline-form-selector-pills select-country-node" onchange="syncGlobalSelects(this, 'country')">
      <option value="India">🇮🇳 India</option><option value="Global">Global Market</option><option value="US">United States</option><option value="UK">United Kingdom</option><option value="Canada">Canada</option><option value="Australia">Australia</option><option value="UAE">UAE</option><option value="Pakistan">Pakistan</option><option value="Bangladesh">Bangladesh</option>
    </select>
    <select class="inline-form-selector-pills select-niche-node" onchange="syncGlobalSelects(this, 'niche')">
      <option value="Technology">Niche: Tech</option><option value="Finance">Finance</option><option value="Education">Education</option><option value="Business">Business</option><option value="Gaming">Gaming</option><option value="Entertainment">Entertainment</option><option value="Lifestyle">Lifestyle</option><option value="Beauty">Beauty</option><option value="Fitness">Fitness</option><option value="Travel">Travel</option>
    </select>
  `;
}

function syncAllSelectorValues() {
  document.querySelectorAll('.select-currency-node').forEach(node => node.value = omniEngineConfig.state.currency);
  document.querySelectorAll('.select-country-node').forEach(node => node.value = omniEngineConfig.state.country);
  document.querySelectorAll('.select-niche-node').forEach(node => node.value = omniEngineConfig.state.niche);
}

function syncGlobalSelects(element, type) {
  omniEngineConfig.state[type] = element.value;
  document.querySelectorAll(`.select-${type}-node`).forEach(node => node.value = element.value);
  runExecutionCalculations();
}

function setPlatformContext(targetPlatform) {
  if (!omniEngineConfig.rpmBounds[targetPlatform]) return;
  omniEngineConfig.state.platform = targetPlatform;
  document.body.setAttribute('data-platform', targetPlatform);
  document.querySelectorAll('.platform-tab-card').forEach(tab => tab.classList.remove('active'));
  const activeTab = document.querySelector(`.${targetPlatform}-tab`);
  if (activeTab) activeTab.classList.add('active');
  runExecutionCalculations();
}

function triggerPresetAllocation(tierLevel, clickedButton) {
  omniEngineConfig.state.tier = tierLevel;
  document.querySelectorAll('.preset-pill-btn').forEach(b => b.classList.remove('active'));
  if (clickedButton) clickedButton.classList.add('active');
  const viewsNode = document.getElementById('input-range-views');
  const shortsNode = document.getElementById('input-range-shorts');
  const dealsNode = document.getElementById('input-range-deals');
  if (tierLevel === 'nano') {
    viewsNode.value = 85000;
    shortsNode.value = 950000;
    dealsNode.value = 1;
  } else if (tierLevel === 'micro') {
    viewsNode.value = 2500000;
    shortsNode.value = 75000000;
    dealsNode.value = 8;
  } else {
    viewsNode.value = 42000000;
    shortsNode.value = 410000000;
    dealsNode.value = 22;
  }
  runExecutionCalculations();
}

function formatMoney(value, currency) {
  const fx = 83.5;
  const symbol = currency === 'INR' ? '₹' : '$';
  const multiplier = currency === 'INR' ? fx : 1;
  const locale = currency === 'INR' ? 'en-IN' : 'en-US';
  return symbol + Math.round(value * multiplier).toLocaleString(locale);
}

function formatRange(low, high, currency) {
  return `${formatMoney(low, currency)} - ${formatMoney(high, currency)}`;
}

function formatCompact(value) {
  if (value >= 1000000000) return (value / 1000000000).toFixed(1) + 'B';
  if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
  if (value >= 1000) return Math.round(value / 1000) + 'K';
  return Math.round(value).toString();
}

function getCurrentInputs() {
  return {
    views: parseFloat(document.getElementById('input-range-views').value) || 0,
    shorts: parseFloat(document.getElementById('input-range-shorts').value) || 0,
    deals: parseFloat(document.getElementById('input-range-deals').value) || 0,
    state: omniEngineConfig.state
  };
}

function calculateRows() {
  const { views, shorts, deals, state } = getCurrentInputs();
  const countryMultiplier = omniEngineConfig.countries[state.country] || 1;
  const nicheMultiplier = omniEngineConfig.niches[state.niche] || 1;
  const rpm = omniEngineConfig.rpmBounds[state.platform];
  const shortRpm = omniEngineConfig.shortsBounds[state.platform];
  const sponsorBase = omniEngineConfig.sponsorBase[state.tier] || 450;
  const adLow = (views / 1000) * rpm.low * countryMultiplier * nicheMultiplier;
  const adHigh = (views / 1000) * rpm.high * countryMultiplier * nicheMultiplier;
  const shortsLow = (shorts / 1000) * shortRpm.low * countryMultiplier * nicheMultiplier;
  const shortsHigh = (shorts / 1000) * shortRpm.high * countryMultiplier * nicheMultiplier;
  const sponsorLow = deals * sponsorBase * countryMultiplier * nicheMultiplier * 0.75;
  const sponsorHigh = deals * sponsorBase * countryMultiplier * nicheMultiplier * 1.45;
  const affiliateLow = (adLow + shortsLow) * 0.05;
  const affiliateHigh = (adHigh + shortsHigh) * 0.18;
  return [
    { title: 'Platform Ad Revenue', sub: 'Long-form content monetization', low: adLow, high: adHigh },
    { title: 'Shorts / Reels Rewards', sub: 'Short-form performance payouts', low: shortsLow, high: shortsHigh },
    { title: 'Brand Sponsorships', sub: 'Paid partnerships & integrations', low: sponsorLow, high: sponsorHigh },
    { title: 'Affiliate & Other Income', sub: 'Affiliate, memberships, merch, etc.', low: affiliateLow, high: affiliateHigh }
  ];
}

function runExecutionCalculations() {
  const { views, shorts, deals, state } = getCurrentInputs();
  document.getElementById('lbl-counter-views').innerText = views.toLocaleString('en-US');
  document.getElementById('lbl-counter-shorts').innerText = shorts.toLocaleString('en-US');
  document.getElementById('lbl-counter-deals').innerText = `${deals} / month`;
  const rows = calculateRows();
  const totalLow = rows.reduce((sum, row) => sum + row.low, 0);
  const totalHigh = rows.reduce((sum, row) => sum + row.high, 0);
  const totalMid = (totalLow + totalHigh) / 2 || 1;
  document.getElementById('payout-range-display-usd').innerText = `${formatRange(totalLow, totalHigh, state.currency)} / mo`;
  document.getElementById('payout-range-display-inr').innerText = state.currency === 'USD' ? `≈ ${formatRange(totalLow, totalHigh, 'INR')}` : `≈ ${formatRange(totalLow, totalHigh, 'USD')}`;
  let tableHTML = '';
  let mobileHTML = '';
  rows.forEach(row => {
    const mid = (row.low + row.high) / 2;
    const pct = Math.round((mid / totalMid) * 100);
    tableHTML += `<tr><td><div class="table-source-cell-layout"><strong>${row.title}</strong><small>${row.sub}</small></div></td><td>${formatMoney(mid, state.currency)}</td><td>${pct}%</td><td><span class="table-range-span-text">${formatRange(row.low, row.high, state.currency)}</span></td></tr>`;
    mobileHTML += `<div class="responsive-breakdown-card-node"><div class="resp-card-left-meta"><strong>${row.title}</strong><small>${row.sub}</small></div><div class="resp-card-right-metrics"><span class="resp-card-val">${formatMoney(mid, state.currency)}</span><span class="resp-card-range">${formatRange(row.low, row.high, state.currency)}</span></div></div>`;
  });
  tableHTML += `<tr class="table-total-row-highlight"><td>Total Estimated Earnings</td><td>${formatMoney(totalMid, state.currency)}</td><td>100%</td><td>${formatRange(totalLow, totalHigh, state.currency)}</td></tr>`;
  mobileHTML += `<div class="responsive-breakdown-card-node total-card"><div class="resp-card-left-meta"><strong>Total Estimated Earnings</strong><small>Potential monthly range</small></div><div class="resp-card-right-metrics"><span class="resp-card-val">${formatMoney(totalMid, state.currency)}</span><span class="resp-card-range">${formatRange(totalLow, totalHigh, state.currency)}</span></div></div>`;
  document.getElementById('table-body-breakdown-rows').innerHTML = tableHTML;
  document.getElementById('mobile-cards-breakdown-mount').innerHTML = mobileHTML;
  executeReverseGoalPlannerMath();
  renderPlatformComparisonMatrixHub();
}

function executeReverseGoalPlannerMath() {
  const targetInput = parseFloat(document.getElementById('input-numeric-goal').value) || 0;
  const state = omniEngineConfig.state;
  const targetUsd = state.currency === 'USD' ? targetInput : targetInput / 83.5;
  const countryMultiplier = omniEngineConfig.countries[state.country] || 1;
  const nicheMultiplier = omniEngineConfig.niches[state.niche] || 1;
  function requiredViews(platform, mode) {
    const rpm = (omniEngineConfig.rpmBounds[platform][mode] || 1) * countryMultiplier * nicheMultiplier;
    return formatCompact((targetUsd / rpm) * 1000);
  }
  document.getElementById('lbl-goal-yt-views').innerText = requiredViews('youtube', 'high');
  document.getElementById('lbl-goal-tt-views').innerText = requiredViews('tiktok', 'high');
  document.getElementById('lbl-goal-fb-views').innerText = requiredViews('facebook', 'high');
  document.getElementById('lbl-goal-currency-indicator').innerText = state.currency === 'USD' ? '$' : '₹';
}

function renderPlatformComparisonMatrixHub() {
  const mountNode = document.getElementById('comparison-layout-mount-node');
  if (!mountNode) return;
  mountNode.innerHTML = `<div class="desktop-only-table-wrapper"><table class="seo-table-layout-node"><thead><tr><th>Platform</th><th>RPM Range</th><th>Est. Revenue / 1M Views</th><th>Best For</th></tr></thead><tbody><tr><td><strong>YouTube</strong></td><td>$2.00 - $6.00</td><td>$2,000 - $6,000</td><td>Long-form content, high RPM niches</td></tr><tr><td><strong>TikTok</strong></td><td>$0.20 - $1.20</td><td>$200 - $1,200</td><td>Short-form virality, mass reach</td></tr><tr><td><strong>Facebook</strong></td><td>$0.30 - $0.80</td><td>$300 - $800</td><td>Community building, loyal audience</td></tr></tbody></table></div><div class="mobile-only-breakdown-cards-stack compare-cards"><div class="responsive-breakdown-card-node"><strong>YouTube</strong><small>$2.00 - $6.00 RPM · Best for long-form content</small></div><div class="responsive-breakdown-card-node"><strong>TikTok</strong><small>$0.20 - $1.20 RPM · Best for short-form reach</small></div><div class="responsive-breakdown-card-node"><strong>Facebook</strong><small>$0.30 - $0.80 RPM · Best for loyal audience</small></div></div>`;
}

function toggleGlobalThemeMode() {
  const next = omniEngineConfig.state.theme === 'dark' ? 'light' : 'dark';
  omniEngineConfig.state.theme = next;
  document.body.setAttribute('data-theme', next);
  localStorage.setItem('omni_theme_mode_preference', next);
  const btn = document.getElementById('theme-switcher-btn');
  if (btn) btn.innerText = next === 'dark' ? '☀️ Light' : '🌙 Dark';
}

function loadSavedSettingsFromLocalStorage() {
  const savedTheme = localStorage.getItem('omni_theme_mode_preference') || 'dark';
  omniEngineConfig.state.theme = savedTheme;
  document.body.setAttribute('data-theme', savedTheme);
  const btn = document.getElementById('theme-switcher-btn');
  if (btn) btn.innerText = savedTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
}

function toggleAccordionState(element) {
  const currentState = element.classList.contains('open');
  document.querySelectorAll('.accordion-node-item').forEach(item => item.classList.remove('open'));
  if (!currentState) element.classList.add('open');
}

const policyRegistryCopyBlocks = {
  about: `<h3>About OmniCreator Planner</h3><p>OmniCreator Planner is an educational creator earnings estimator. It helps creators, agencies and brands plan possible income using selected inputs, public benchmark ranges and transparent assumptions.</p><p>It is not an official calculator from YouTube, TikTok, Facebook or Meta.</p>`,
  privacy: `<h3>Privacy Policy</h3><p>For this demo, calculations run in your browser. We do not require login or account creation for basic estimates.</p><p>We use local storage only to remember theme and cookie choice. Calculator inputs are not sent to a server in this demo.</p>`,
  terms: `<h3>Terms of Use</h3><p>OmniCreator Planner provides educational estimates only. Numbers shown are planning ranges and not guaranteed earnings.</p><p>Actual income may vary because of audience location, engagement, watch time, monetization status, platform policy and brand negotiations.</p>`,
  disclaimer: `<h3>Disclaimer</h3><p>Estimates are based on public benchmarks and selected inputs. Actual earnings may vary.</p><p>OmniCreator Planner is not affiliated with YouTube, TikTok, Facebook or Meta. All trademarks belong to their respective owners.</p>`,
  contact: `<h3>Contact</h3><p>For support, corrections or business inquiries, contact support@omnicreatorplanner.com.</p>`
};

function openLegalPolicyModal(docId) {
  const injector = document.getElementById('modal-content-injector');
  if (!injector) return;
  injector.innerHTML = policyRegistryCopyBlocks[docId] || policyRegistryCopyBlocks.disclaimer;
  document.getElementById('global-policy-modal-mount').style.display = 'flex';
}

function closeLegalPolicyModal() {
  document.getElementById('global-policy-modal-mount').style.display = 'none';
}

function acceptCookieConsent() {
  localStorage.setItem('omni_cookie_banner_approved', 'true');
  closeCookieBar();
}

function closeCookieBar() {
  const bar = document.getElementById('cookie-consent-bar');
  if (bar) bar.style.display = 'none';
}

function checkCookieConsentState() {
  if (localStorage.getItem('omni_cookie_banner_approved') === 'true') closeCookieBar();
}