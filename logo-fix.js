document.addEventListener('DOMContentLoaded',function(){
  setTimeout(function(){
    var logo=document.querySelector('.brand-logo-svg');
    if(!logo)return;
    logo.outerHTML='<img class="brand-logo-svg logo-static-final" src="logo.svg" alt="OmniCreator Planner logo">';
    var style=document.createElement('style');
    style.textContent='.logo-static-final,.brand-logo-svg{animation:none!important;transform:none!important;rotate:0deg!important}';
    document.head.appendChild(style);
  },600);
});
