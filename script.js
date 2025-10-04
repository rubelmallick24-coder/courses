// ===== Mobile Menu Toggle =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('nav-active');
});

// ===== Scroll Reveal =====
const revealElements = document.querySelectorAll('.reveal, .hero-title, .hero-subtitle');

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
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let index = 0;

if (slider) {
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
}

// ===== Stats Count Up Animation =====
const counters = document.querySelectorAll(".stat h3");

function countUp(counter) {
  let target = +counter.getAttribute("data-target");
  let duration = 1500; 
  let startTime = null;

  function animateCount(timestamp) {
    if (!startTime) startTime = timestamp;
    let progress = timestamp - startTime;
    let percentage = Math.min(progress / duration, 1);

    let easedProgress = 1 - Math.pow(1 - percentage, 3); // ease out cubic
    let current = Math.floor(easedProgress * target);
    counter.innerText = current;

    if (percentage < 1) {
      requestAnimationFrame(animateCount);
    } else {
      counter.innerText = target;
    }
  }

  requestAnimationFrame(animateCount);
}

function checkStats() {
  const windowHeight = window.innerHeight;

  counters.forEach(counter => {
    const elementTop = counter.getBoundingClientRect().top;

    if (elementTop < windowHeight - 50 && !counter.classList.contains("counted")) {
      counter.classList.add("counted");
      counter.innerText = "0";
      countUp(counter);
    }

    if (elementTop > windowHeight) {
      counter.classList.remove("counted");
      counter.innerText = "0";
    }
  });
}

window.addEventListener("scroll", checkStats);
window.addEventListener("load", checkStats);
