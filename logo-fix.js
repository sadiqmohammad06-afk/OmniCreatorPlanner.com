document.addEventListener('DOMContentLoaded',function(){
  setTimeout(function(){
    var logo=document.querySelector('.brand-logo-svg');
    if(!logo)return;
    logo.outerHTML='<img class="brand-logo-svg" src="logo.svg" alt="OmniCreator Planner logo">';
  },300);
});
