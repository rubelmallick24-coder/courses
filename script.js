// ===== Mobile Menu Toggle =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('nav-active');
});

// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({
      behavior: 'smooth'
    });
    if(navLinks.classList.contains('nav-active')) {
      navLinks.classList.remove('nav-active');
    }
  });
});

// ===== Formspree Form Submission =====
const form = document.getElementById('contactForm');

form.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submission

  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      alert('Thank you for enrolling! We have received your details.');
      form.reset();
    } else {
      alert('Oops! There was a problem submitting your form.');
    }
  }).catch(error => {
    alert('Oops! There was a problem submitting your form.');
    console.error(error);
  });
});
