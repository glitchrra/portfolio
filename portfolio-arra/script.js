/* Pretend this is enqueued via functions.php -> wp_enqueue_script('theme') */
(function(){
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if(toggle && menu){
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Smooth scrolling (enhanced for browsers without CSS behavior)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el){
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if(menu && menu.classList.contains('open')) menu.classList.remove('open');
      }
    });
  });

  // Intersection Observer for reveal-on-scroll
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // Animate skill bars
  const skillBars = document.querySelectorAll('.meter');
  const animateSkills = (entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const bar = entry.target.querySelector('.bar');
        const level = entry.target.getAttribute('data-level') || 0;
        requestAnimationFrame(() => { bar.style.width = level + '%'; });
        skillObs.unobserve(entry.target);
      }
    });
  };
  const skillObs = new IntersectionObserver(animateSkills, { threshold: 0.3 });
  skillBars.forEach(m => skillObs.observe(m));

  // Contact form demo handler (no backend)
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (form.querySelector('#name') || {}).value || 'there';
      const toast = form.querySelector('.toast');
      if(toast){
        toast.textContent = `Thanks, ${name}! Your message has been noted (demo).`;
        toast.style.display = 'block';
        setTimeout(() => toast.style.display = 'none', 3500);
      }
      form.reset();
    });
  }

  // Year in footer
  const y = document.getElementById('year');
  if(y){ y.textContent = new Date().getFullYear(); }
})();
// Typewriter Effect for tagline
const typewriterEl = document.getElementById('typewriter');
if (typewriterEl) {
  const words = ["Aspiring Game Developer", "Unity Enthusiast", "Roblox Creator", "Scratch Veteran"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 120;
  const erasingSpeed = 60;
  const delayBetweenWords = 1500;

  function type() {
    const currentWord = words[wordIndex];
    if (!isDeleting && charIndex < currentWord.length) {
      typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
      typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(type, erasingSpeed);
    } else {
      if (!isDeleting) {
        isDeleting = true;
        setTimeout(type, delayBetweenWords);
      } else {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, typingSpeed);
      }
    }
  }
  type();
}
