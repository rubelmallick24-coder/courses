// ===== Mobile Menu Toggle =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('nav-active');
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
    navLinks.classList.remove('nav-active');
  });
});

// ===== Formspree Submission =====
const form = document.getElementById('contactForm');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    if (response.ok) {
      alert('Thank you! We received your details.');
      form.reset();
    } else {
      alert('Oops! There was a problem submitting your form.');
    }
  }).catch(error => {
    alert('Oops! There was a problem submitting your form.');
    console.error(error);
  });
});

// ===== Testimonials Slider =====
const slider = document.querySelector('.testimonial-slider');
const cards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let currentIndex = 0;

function showSlide(index) {
  if (index < 0) currentIndex = cards.length - 1;
  else if (index >= cards.length) currentIndex = 0;
  else currentIndex = index;
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

let autoSlide = setInterval(() => { showSlide(currentIndex + 1); }, 5000);

prevBtn.addEventListener('click', () => { showSlide(currentIndex - 1); resetInterval(); });
nextBtn.addEventListener('click', () => { showSlide(currentIndex + 1); resetInterval(); });

function resetInterval() {
  clearInterval(autoSlide);
  autoSlide = setInterval(() => { showSlide(currentIndex + 1); }, 5000);
}

showSlide(currentIndex);
