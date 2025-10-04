// ===== Menu Toggle =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('nav-active');
});

// ===== Scroll Reveal =====
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
  for (let i = 0; i < revealElements.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = revealElements[i].getBoundingClientRect().top;
    const revealPoint = 150;

    if (elementTop < windowHeight - revealPoint) {
      revealElements[i].classList.add('active');
    } else {
      revealElements[i].classList.remove('active');
    }
  }
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== Testimonials Slider =====
const testimonialSlider = document.querySelector('.testimonial-slider');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentIndex = 0;

function showSlide(index) {
  if (index < 0) currentIndex = testimonialCards.length - 1;
  else if (index >= testimonialCards.length) currentIndex = 0;
  else currentIndex = index;

  testimonialSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

prevBtn.addEventListener('click', () => {
  showSlide(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
  showSlide(currentIndex + 1);
});

// Auto slide every 5 seconds
setInterval(() => {
  showSlide(currentIndex + 1);
}, 5000);

// ===== Stats Count Up =====
const stats = document.querySelectorAll('.stat-card h3');

stats.forEach(stat => {
  const target = +stat.innerText;
  stat.innerText = '0';

  const increment = target / 100;

  function updateCount() {
    const current = +stat.innerText;
    if (current < target) {
      stat.innerText = Math.ceil(current + increment);
      setTimeout(updateCount, 20);
    } else {
      stat.innerText = target;
    }
  }

  updateCount();
});
