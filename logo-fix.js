document.addEventListener('DOMContentLoaded',function(){
  var logo=document.querySelector('.brand-logo-svg');
  if(!logo)return;
  logo.outerHTML='<svg class="brand-logo-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="OmniCreator Planner logo"><defs><linearGradient id="ocCleanGradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#22d3ee"/><stop offset="55%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#f43f5e"/></linearGradient></defs><rect x="10" y="10" width="80" height="80" rx="20" fill="#08111f" stroke="url(#ocCleanGradient)" stroke-width="4"/><text x="50" y="47" text-anchor="middle" font-size="31" font-weight="900" font-family="Arial, Helvetica, sans-serif" fill="#ffffff">OC</text><path d="M28 67h13v-13h10v-10h10v-10h11" fill="none" stroke="url(#ocCleanGradient)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="74" cy="34" r="4" fill="#22d3ee"/></svg>';
});
