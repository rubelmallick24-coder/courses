// ===== Mobile Menu Toggle =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('nav-active');
});

// ===== Scroll Reveal =====
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 50) {
      el.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== Testimonial Slider =====
const slider = document.querySelector('.testimonial-slider');
const slides = document.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentIndex = 0;

const showSlide = index => {
  if(index < 0) index = slides.length - 1;
  if(index >= slides.length) index = 0;
  slider.style.transform = `translateX(-${index * 100}%)`;
  currentIndex = index;
};

prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));

// Auto Slide (optional)
setInterval(() => showSlide(currentIndex + 1), 8000);
