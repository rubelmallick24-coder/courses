// ===== Counter Animation =====
const counters = document.querySelectorAll('.counter');
let started = false;

function animateCounters() {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / 200;
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target + '+';
      }
    };
    updateCount();
  });
}

window.addEventListener('scroll', () => {
  const section = document.querySelector('.stats');
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight && !started) {
    started = true;
    animateCounters();
  } else if (rect.top > window.innerHeight) {
    started = false;
    counters.forEach(c => c.innerText = '0');
  }
});

const testimonials = document.querySelectorAll('.testimonial');
let currentIndex = 0;

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.remove('active');
    if(i === index) t.classList.add('active');
  });
}

setInterval(() => {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
}, 3000); // changes every 3 seconds

// ===== Dark/Light Mode =====
document.getElementById('modeToggle').onclick = () => {
  document.body.classList.toggle('dark');
};

