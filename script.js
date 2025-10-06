/* script.js
   - Hero slider
   - Stats counters with re-animation on re-enter
   - Testimonials simple slider
   - Dark/light toggle
   - Small helpers for smooth scroll and buttons
*/

// --- DOM helpers
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

document.addEventListener('DOMContentLoaded', ()=> {
  // Theme toggle
  const themeToggle = $('#theme-toggle');
  const stored = localStorage.getItem('rbl-theme');
  if(stored === 'dark') document.body.classList.add('dark');
  updateThemeIcon();
  themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('rbl-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    updateThemeIcon();
  });
  function updateThemeIcon(){
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  }

  // Set year
  $('#year') && ($('#year').textContent = new Date().getFullYear());

  // HERO SLIDER
  const slides = $$('.hero-slide');
  const heroSlider = document.querySelector('.hero-slider');
  const dotsContainer = $('#hero-dots');
  let current = 0;
  slides.forEach((s, i)=>{
    const btn = document.createElement('button');
    btn.addEventListener('click', ()=> goTo(i));
    if(i===0) btn.classList.add('active');
    dotsContainer.appendChild(btn);
  });
  function goTo(i){
    current = i;
    const w = slides[0].clientWidth;
    heroSlider.style.transform = `translateX(-${i * 100}%)`;
    const allDots = Array.from(dotsContainer.children);
    allDots.forEach((d,ii)=> d.classList.toggle('active', ii===i));
  }
  let heroInterval = setInterval(()=> {
    goTo((current + 1) % slides.length);
  }, 6000);
  // Pause when hovered
  heroSlider.addEventListener('mouseenter', ()=> clearInterval(heroInterval));
  heroSlider.addEventListener('mouseleave', ()=> heroInterval = setInterval(()=> goTo((current + 1) % slides.length), 6000));

  // STATS COUNTERS (re-animate when entering viewport)
  const counters = $$('.stat-number');
  const counterOptions = {root:null, rootMargin:'0px', threshold:0.4};
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        animateCounter(entry.target);
      } else {
        // reset so it re-animates when re-entering
        entry.target.textContent = '0';
      }
    });
  }, counterOptions);
  counters.forEach(c => counterObserver.observe(c));
  function animateCounter(el){
    const target = +el.dataset.target;
    const duration = 1600;
    const startTime = performance.now();
    function step(now){
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuad
      const ease = 1 - (1 - progress) * (1 - progress);
      const val = Math.floor(ease * target);
      el.textContent = val < target ? val : (target + (target >= 1000 ? '+' : ''));
      if(progress < 1) requestAnimationFrame(step);
      else {
        // finalize
        el.textContent = (target >= 1000) ? (Math.floor(target).toLocaleString() + '+') : target;
      }
    }
    requestAnimationFrame(step);
  }

  // TESTIMONIALS SIMPLE SLIDER
  const testSlider = document.querySelector('.test-slider');
  const testSlides = $$('.test-slide');
  let testIndex = 0;
  function showTest(i){ 
    const width = testSlides[0].clientWidth + 20;
    testSlider.style.transform = `translateX(-${i * width}px)`;
  }
  $('#next-test')?.addEventListener('click', ()=> {
    testIndex = Math.min(testIndex + 1, testSlides.length - 1);
    showTest(testIndex);
  });
  $('#prev-test')?.addEventListener('click', ()=> {
    testIndex = Math.max(testIndex - 1, 0);
    showTest(testIndex);
  });
  // autoplay testimonials
  setInterval(()=> {
    testIndex = (testIndex + 1) % testSlides.length;
    showTest(testIndex);
  }, 6000);

  // BUY NOW buttons: placeholder behavior (open Razorpay later)
  $$('.btn-buy').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      const course = btn.dataset.buy || 'course';
      alert(`Buy Now clicked for ${course}.\nReplace this with your Razorpay checkout link in the 'href'.`);
    });
  });

  // Watch demo - open a sample modal (simple)
  $('#watch-demo')?.addEventListener('click', ()=> openDemo());
  $('#watch-demo-2')?.addEventListener('click', ()=> openDemo());
  function openDemo(){
    const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // replace with real demo
    window.open(url, '_blank', 'noopener');
  }

  // Smooth scroll for nav links
  $$('.nav-list a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // small: shrink header on scroll
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', ()=> {
    if(window.scrollY > 40) header.style.padding = '8px 0';
    else header.style.padding = '14px 0';
  });

  // Accessibility: keyboard nav for hero dots
  Array.from(dotsContainer.children).forEach((d,i)=> {
    d.tabIndex = 0;
    d.addEventListener('keydown', (ev)=> {
      if(ev.key === 'Enter' || ev.key === ' ') goTo(i);
    });
  });

  // Recalculate slider on resize to keep in place
  window.addEventListener('resize', ()=> showTest(testIndex));
});
