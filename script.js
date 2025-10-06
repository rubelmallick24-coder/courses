// Counter animation
const counters = document.querySelectorAll('.counter');
const options = { threshold: 0.6 };

const runCounter = (counter) => {
  const target = +counter.getAttribute('data-target');
  let count = 0;
  const increment = target / 200;
  const updateCounter = () => {
    if (count < target) {
      count += increment;
      counter.innerText = Math.ceil(count);
      requestAnimationFrame(updateCounter);
    } else {
      counter.innerText = target + "+";
    }
  };
  updateCounter();
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      runCounter(entry.target);
      obs.unobserve(entry.target);
    }
  });
}, options);

counters.forEach(counter => {
  observer.observe(counter);
});
