// main.js — Home page scripts (currently minimal; expand as needed)

// Animate skill cards in on load
document.querySelectorAll('.skill-card').forEach((card, i) => {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = `opacity .4s ease ${i * 0.1}s, transform .4s ease ${i * 0.1}s`;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      card.style.opacity   = '1';
      card.style.transform = 'translateY(0)';
    });
  });
});
