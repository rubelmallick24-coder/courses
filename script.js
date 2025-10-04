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
    if(elementTop < windowHeight - 50) {
      el.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== Testimonial Slider =====
const slider = document.querySelector('.testimonial-slider');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let index = 0;

const totalSlides = slider.children.length;

const updateSlider = () => {
  slider.style.transform = `translateX(-${index * 100}%)`;
};

prevBtn.addEventListener('click', () => {
  index = index === 0 ? totalSlides - 1 : index - 1;
  updateSlider();
});

nextBtn.addEventListener('click', () => {
  index = index === totalSlides - 1 ? 0 : index + 1;
  updateSlider();
});
