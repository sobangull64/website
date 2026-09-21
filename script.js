/* ==========================================================================
   PORTFOLIO SCRIPTS - ASRA IMTIAZ
   - Interactive Custom Pointer Cursor
   - Hero: Dynamic Center 3D Face / Portrait Cursor Tracking Physics
   - Scroll-Triggered Reveal Animations
   - Education: Sticky Pinned Scroll Section (Animates 1-by-1 then moves down)
   - Experience: Sticky Pinned Scroll Section (Dynamic Fade In & Fade Away 1-by-1)
   - Skills: 3D Box Physics on Hover
   - Projects / Designs: Sticky Pinned Scroll Section (Animates 1-by-1 then moves down)
   - Lightbox Viewer & Mobile Menu
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeroFaceTracker();
  initDynamicParticles();
  initDynamicTypewriter();
  initScrollProgressBar();
  initScrollAnimations();
  initActiveNavSpy();
  initCustomCursor();
  initUnifiedSpotlightTilt();
  initSkillProgressBars();
  initAutonProjectsFilter();
  initLightbox();
  initMobileMenu();
  initDynamicContactForm();
});

/* ==========================================================================
   1. HERO: DYNAMIC CENTER FACE / PORTRAIT 3D CURSOR TRACKING
   ========================================================================== */
function initHeroFaceTracker() {
  const heroSection = document.getElementById('hero');
  const faceContainer = document.querySelector('.hero-face-container');
  const faceImg = document.querySelector('.hero-face-img');
  const faceGlare = document.querySelector('.hero-face-glare');
  const floatingBadges = document.querySelectorAll('.floating-badge');

  if (!heroSection || !faceContainer) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentRotateX = 0;
  let currentRotateY = 0;
  let currentImgX = 0;
  let currentImgY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderFaceTracking() {
    const rect = faceContainer.getBoundingClientRect();
    const faceCenterX = rect.left + rect.width / 2;
    const faceCenterY = rect.top + rect.height / 2;

    const deltaX = (mouseX - faceCenterX) / (window.innerWidth / 2);
    const deltaY = (mouseY - faceCenterY) / (window.innerHeight / 2);

    const targetRotateY = Math.max(-28, Math.min(28, deltaX * 24));
    const targetRotateX = Math.max(-24, Math.min(24, -deltaY * 20));

    const targetImgX = Math.max(-18, Math.min(18, deltaX * 16));
    const targetImgY = Math.max(-18, Math.min(18, deltaY * 16));

    currentRotateX += (targetRotateX - currentRotateX) * 0.12;
    currentRotateY += (targetRotateY - currentRotateY) * 0.12;
    currentImgX += (targetImgX - currentImgX) * 0.12;
    currentImgY += (targetImgY - currentImgY) * 0.12;

    faceContainer.style.transform = `perspective(1000px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) scale(1.02)`;

    if (faceImg) {
      faceImg.style.transform = `translate(${currentImgX}px, ${currentImgY}px) scale(1.08)`;
    }

    if (faceGlare) {
      const glareX = 50 + deltaX * 30;
      const glareY = 50 + deltaY * 30;
      faceGlare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.5) 0%, transparent 65%)`;
    }

    floatingBadges.forEach((badge, index) => {
      const depth = (index + 1) * 8;
      const bX = -deltaX * depth;
      const bY = -deltaY * depth;
      badge.style.transform = `translate(${bX}px, ${bY}px) translateZ(${depth * 2}px)`;
    });

    requestAnimationFrame(renderFaceTracking);
  }

  requestAnimationFrame(renderFaceTracking);
}

/* ==========================================================================
   2. SCROLL TRIGGERED REVEAL ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll(
    '.reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-scale-up, .skill-box, .edu-card, .exp-card, .auton-project-card'
  );

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  document.querySelectorAll('#hero .reveal-fade-up, #hero .reveal-fade-left, #hero .reveal-fade-right').forEach(el => {
    setTimeout(() => el.classList.add('is-revealed'), 100);
  });
}

/* ==========================================================================
   3. CUSTOM CURSOR (Course Pointing)
   ========================================================================== */
function initCustomCursor() {
  const dot = document.querySelector('.custom-cursor-dot');
  const follower = document.querySelector('.custom-cursor-follower');
  const cursorText = follower?.querySelector('.cursor-text');
  
  if (!dot || !follower) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function renderCursor() {
    followerX += (mouseX - followerX) * 0.18;
    followerY += (mouseY - followerY) * 0.18;

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  window.addEventListener('mousedown', () => {
    dot.style.transform = 'translate(-50%, -50%) scale(2)';
  });
  window.addEventListener('mouseup', () => {
    dot.style.transform = 'translate(-50%, -50%) scale(1)';
  });

  const hoverables = document.querySelectorAll('a, button, input, select, textarea, .skill-box, .about-feature-card, .edu-card, .exp-card, .hero-face-container, .auton-filter-btn, .auton-arrow-btn, .auton-project-card');
  hoverables.forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  const projectCards = document.querySelectorAll('.auton-project-card');
  projectCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-view');
      if (cursorText) cursorText.textContent = 'EXPLORE';
    });
    card.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-view');
      if (cursorText) cursorText.textContent = '';
    });
  });
}

/* ==========================================================================
   4. UNIFIED 3D MAGNETIC TILT & CURSOR SPOTLIGHT PHYSICS
   ========================================================================== */
function initUnifiedSpotlightTilt() {
  const tiltElements = document.querySelectorAll('.about-feature-card, .edu-card, .exp-card, .exp-fade-card, .skill-box, .auton-project-card');

  tiltElements.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
      el.style.setProperty('--card-x', `${x}px`);
      el.style.setProperty('--card-y', `${y}px`);
      el.style.setProperty('--skill-x', `${x}px`);
      el.style.setProperty('--skill-y', `${y}px`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
    });
  });
}

/* ==========================================================================
   5. SKILL PROGRESS BARS REVEAL
   ========================================================================== */
function initSkillProgressBars() {
  const skillBoxes = document.querySelectorAll('.skill-box');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, { threshold: 0.15 });

  skillBoxes.forEach(box => observer.observe(box));
}

/* ==========================================================================
   7. AUTON FRAMER STYLE: PROJECTS FILTER TABS & INTERACTIONS
   ========================================================================== */
function initAutonProjectsFilter() {
  const filterBtns = document.querySelectorAll('.auton-filter-btn');
  const cards = document.querySelectorAll('.auton-project-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      cards.forEach((card) => {
        const category = card.getAttribute('data-category');
        card.classList.remove('auton-card-entering');

        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('auton-card-hidden');
          card.classList.add('auton-card-entering');
        } else {
          card.classList.add('auton-card-hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   7. LIGHTBOX MODAL
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-image');
  const modalTitle = document.getElementById('lightbox-title');
  const closeBtn = document.getElementById('lightbox-close');

  if (!modal || !modalImg) return;

  const projectCards = document.querySelectorAll('.auton-project-card');
  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      const imgPath = card.getAttribute('data-img') || card.querySelector('img')?.src;
      const title = card.getAttribute('data-title') || card.querySelector('.auton-card-title')?.textContent || 'Design Showcase';
      if (imgPath) {
        modalImg.src = imgPath;
        if (modalTitle) modalTitle.textContent = title;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

/* ==========================================================================
   9. MOBILE NAVIGATION
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

/* ==========================================================================
   10. INTERACTIVE AMBIENT PARTICLE CANVAS (Neon Red & Obsidian Physics)
   ========================================================================== */
function initDynamicParticles() {
  const canvas = document.getElementById('ambient-particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouse = { x: width / 2, y: height / 2, radius: 130 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(65, Math.floor((width * height) / 18000));
  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 42, 59, ${this.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#FF2A3B';
      ctx.fill();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse Proximity Repulsion & Connect Physics
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        const angle = Math.atan2(dy, dx);
        this.x -= Math.cos(angle) * force * 3.5;
        this.y -= Math.sin(angle) * force * 3.5;
      }
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function renderParticles() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255, 42, 59, ${0.18 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(renderParticles);
  }

  requestAnimationFrame(renderParticles);
}

/* ==========================================================================
   11. DYNAMIC TYPEWRITER (Rotating Roles Tag)
   ========================================================================== */
function initDynamicTypewriter() {
  const el = document.getElementById('hero-dynamic-typewriter');
  if (!el) return;

  const roles = [
    'Digital Media & Communication Specialist',
    'Social Media Strategist & Manager',
    'Canva Visual Designer & Content Creator',
    'CapCut Video Editor & Reel Storyteller',
    'Trend Analyst & Brand Specialist'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 70;
  const deleteSpeed = 35;
  const pauseTime = 2200;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      el.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIdx === currentRole.length) {
      delay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ==========================================================================
   12. DYNAMIC SCROLL PROGRESS BAR
   ========================================================================== */
function initScrollProgressBar() {
  const indicator = document.getElementById('scroll-progress-indicator');
  if (!indicator) return;

  function updateProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    indicator.style.width = `${progress}%`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
}

/* ==========================================================================
   13. ACTIVE NAVIGATION SCROLL SPY
   ========================================================================== */
function initActiveNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  function spy() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 140;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', spy, { passive: true });
  spy();
}

/* ==========================================================================
   14. DYNAMIC CONTACT FORM WITH LIVE FEEDBACK
   ========================================================================== */
function initDynamicContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const toast = document.getElementById('contact-success-toast');
  const submitBtn = document.getElementById('form-submit-btn');
  const submitText = document.getElementById('form-submit-text');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (submitBtn && submitText) {
      submitBtn.disabled = true;
      submitText.textContent = 'Sending...';
    }

    setTimeout(() => {
      if (toast) {
        toast.classList.remove('hidden');
        toast.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      if (submitBtn && submitText) {
        submitBtn.disabled = false;
        submitText.textContent = 'Send Message';
      }

      form.reset();

      setTimeout(() => {
        if (toast) toast.classList.add('hidden');
      }, 7000);
    }, 600);
  });
}
