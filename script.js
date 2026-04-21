// ============================================
// STUDIO ARTS - Interactions
// ============================================

// Smooth reveal on scroll
const revealTargets = document.querySelectorAll(
  '.work-card, .pillar-card, .news-item, .sns-card, .section-head, .about-text'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => io.observe(el));

// Contact form handler (demo — no backend)
function handleSubmit(e) {
  e.preventDefault();
  const note = document.getElementById('formNote');
  note.textContent = '▶ SENT! お問い合わせありがとうございます。折り返しご連絡いたします。';
  note.style.color = 'var(--yellow)';
  e.target.reset();
  setTimeout(() => { note.textContent = ''; }, 6000);
  return false;
}
window.handleSubmit = handleSubmit;

// Nav hide on scroll down, show on scroll up
let lastY = 0;
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 100 && y > lastY) {
    nav.style.transform = 'translateY(-110%)';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  nav.style.transition = 'transform 0.3s';
  lastY = y;
});

// Parallax on hero shapes
const shapes = document.querySelectorAll('.hero .shape');
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  shapes.forEach((s, i) => {
    const depth = (i + 1) * 6;
    s.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
  });
});
