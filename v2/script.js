// ============================================
// STUDIO ARTS v2 — Neon Japanese animations
// ============================================

// ---------- Particle sparkles ----------
(function particles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function makeParticle() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3 - 0.1,
      life: Math.random() * 200 + 100,
      age: 0,
      color: Math.random() > 0.5 ? '0,217,232' : '255,79,168'
    };
  }
  for (let i = 0; i < 90; i++) particles.push(makeParticle());

  function tick() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.age++;
      const alpha = Math.sin((p.age / p.life) * Math.PI);
      ctx.beginPath();
      ctx.fillStyle = `rgba(${p.color},${alpha * 0.8})`;
      ctx.shadowColor = `rgba(${p.color},1)`;
      ctx.shadowBlur = 6;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      if (p.age > p.life || p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
        particles[i] = makeParticle();
        particles[i].y = h + 10;
      }
    });
    requestAnimationFrame(tick);
  }
  tick();
})();

// ---------- Reveal on scroll ----------
const reveals = document.querySelectorAll('.section, .work-slide, .pillar, .news-list li, .sns-btn');
reveals.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => io.observe(el));

// ---------- Carousel dots tracking ----------
const carousel = document.querySelector('.works-carousel');
const dots = document.querySelectorAll('.carousel-dots .dot');
if (carousel && dots.length) {
  carousel.addEventListener('scroll', () => {
    const slides = carousel.querySelectorAll('.work-slide');
    const center = carousel.scrollLeft + carousel.clientWidth / 2;
    let closest = 0, min = Infinity;
    slides.forEach((s, i) => {
      const cx = s.offsetLeft + s.offsetWidth / 2;
      const d = Math.abs(cx - center);
      if (d < min) { min = d; closest = i; }
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === closest));
  });
  dots.forEach((d, i) => {
    d.addEventListener('click', () => {
      const slides = carousel.querySelectorAll('.work-slide');
      if (slides[i]) {
        carousel.scrollTo({
          left: slides[i].offsetLeft - (carousel.clientWidth - slides[i].offsetWidth) / 2,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ---------- Form submit demo ----------
function v2Submit(e) {
  e.preventDefault();
  const note = document.getElementById('v2Note');
  note.textContent = '▶ SENT! お問い合わせありがとうございます。折り返しご連絡いたします。';
  e.target.reset();
  setTimeout(() => note.textContent = '', 6000);
  return false;
}
window.v2Submit = v2Submit;

// ---------- Parallax on neon decorations ----------
const decos = document.querySelectorAll('.neon-deco');
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  decos.forEach((d, i) => {
    const depth = (i % 2 === 0 ? 1 : -1) * (10 + i * 3);
    d.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
  });
});
