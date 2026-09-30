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
  initExperienceDeckCarousel();
  initSkillsVerticalStack();
  initWorkVerticalStack();
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

  const hoverables = document.querySelectorAll('a, button, input, select, textarea, .skill-box, .about-feature-card, .edu-card, .exp-card, .hero-face-container, .auton-filter-btn, .auton-arrow-btn, .auton-project-card, .exp-nav-btn, .exp-dot, .exp-stack-card, .skill-stack-card, .skill-nav-btn, .skill-dot, .work-stack-card, .work-nav-btn, .work-dot');
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
  const tiltElements = document.querySelectorAll('.about-feature-card, .edu-card, .exp-card, .exp-stack-card, .skill-box, .auton-project-card');

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
  // Handled natively by initWorkVerticalStack for 3D card stack
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
      // Only open lightbox for the active card in focus
      if (!card.classList.contains('is-active')) return;

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

/* ==========================================================================
   15. 3D STACKED EXPERIENCE CARDS CAROUSEL (Framer Deck Style)
   ========================================================================== */
function initExperienceDeckCarousel() {
  const container = document.getElementById('exp-stack-container');
  const cards = document.querySelectorAll('.exp-stack-card');
  const prevBtn = document.getElementById('exp-prev-btn');
  const nextBtn = document.getElementById('exp-next-btn');
  const dots = document.querySelectorAll('.exp-dot');
  const counter = document.getElementById('exp-current-counter');

  if (!container || !cards.length) return;

  let currentIdx = 0;
  let isAnimating = false;
  const totalCards = cards.length;

  function updateContainerHeight() {
    let maxHeight = 0;
    cards.forEach((card) => {
      const h = card.offsetHeight;
      if (h > maxHeight) maxHeight = h;
    });
    if (maxHeight > 0) {
      container.style.minHeight = `${maxHeight + 20}px`;
    }
  }

  function updateDeck(newIdx, direction = 'next') {
    if (isAnimating) return;
    isAnimating = true;

    const prevActiveIdx = currentIdx;
    currentIdx = (newIdx + totalCards) % totalCards;

    const oldActiveCard = cards[prevActiveIdx];

    // Apply smooth outgoing slide-to-back fading animation
    if (direction === 'next') {
      oldActiveCard.classList.add('slide-to-back');
    } else if (direction === 'prev') {
      oldActiveCard.classList.add('slide-to-prev');
    }

    setTimeout(() => {
      cards.forEach((card, idx) => {
        card.classList.remove('is-active', 'is-next', 'is-prev', 'is-hidden', 'slide-to-back', 'slide-to-prev');

        const rel = (idx - currentIdx + totalCards) % totalCards;

        if (rel === 0) {
          card.classList.add('is-active');
        } else if (rel === 1) {
          card.classList.add('is-next');
        } else if (rel === totalCards - 1) {
          card.classList.add('is-prev');
        } else {
          card.classList.add('is-hidden');
        }
      });

      // Update indicator dots & number counter
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIdx);
      });

      if (counter) {
        counter.textContent = String(currentIdx + 1).padStart(2, '0');
      }

      isAnimating = false;
    }, 280);
  }

  // Initial layout configuration
  function initPositions() {
    cards.forEach((card, idx) => {
      card.classList.remove('is-active', 'is-next', 'is-prev', 'is-hidden', 'slide-to-back', 'slide-to-prev');
      const rel = (idx - currentIdx + totalCards) % totalCards;
      if (rel === 0) {
        card.classList.add('is-active');
      } else if (rel === 1) {
        card.classList.add('is-next');
      } else if (rel === totalCards - 1) {
        card.classList.add('is-prev');
      } else {
        card.classList.add('is-hidden');
      }
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIdx);
    });

    if (counter) {
      counter.textContent = String(currentIdx + 1).padStart(2, '0');
    }

    // Call after render tick so cards have accurate layout heights
    setTimeout(updateContainerHeight, 80);
  }

  // Next / Prev Button Controls
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateDeck(currentIdx + 1, 'next');
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateDeck(currentIdx - 1, 'prev');
    });
  }

  // Dot Indicator Controls
  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetIdx = parseInt(dot.getAttribute('data-index'), 10);
      if (targetIdx !== currentIdx) {
        updateDeck(targetIdx, targetIdx > currentIdx ? 'next' : 'prev');
      }
    });
  });

  // Clicking on the peeking side cards directly navigates
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      if (card.classList.contains('is-next')) {
        updateDeck(currentIdx + 1, 'next');
      } else if (card.classList.contains('is-prev')) {
        updateDeck(currentIdx - 1, 'prev');
      }
    });
  });

  // Keyboard navigation when section is in viewport
  const expSection = document.getElementById('experience');
  if (expSection) {
    window.addEventListener('keydown', (e) => {
      const rect = expSection.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowRight') {
        updateDeck(currentIdx + 1, 'next');
      } else if (e.key === 'ArrowLeft') {
        updateDeck(currentIdx - 1, 'prev');
      }
    });
  }

  // Mobile Touch Swipe Handling
  let touchStartX = 0;
  let touchStartY = 0;

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        updateDeck(currentIdx + 1, 'next');
      } else {
        updateDeck(currentIdx - 1, 'prev');
      }
    }
  }, { passive: true });

  window.addEventListener('resize', updateContainerHeight);

  // Initialize deck layout
  initPositions();
}

/* ==========================================================================
   11. SKILLS: VERTICAL 3D CARD STACK CAROUSEL (BOTTOM-TO-TOP ROLLER)
   ========================================================================== */
function initSkillsVerticalStack() {
  const container = document.getElementById('skill-stack-container');
  if (!container) return;

  const cards = Array.from(container.querySelectorAll('.skill-stack-card'));
  const prevBtn = document.getElementById('skill-prev-btn');
  const nextBtn = document.getElementById('skill-next-btn');
  const dotsContainer = document.getElementById('skill-dots-container');
  const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.skill-dot')) : [];
  const counter = document.getElementById('skill-current-counter');

  const totalCards = cards.length;
  if (totalCards === 0) return;

  let currentIdx = 0;
  let isAnimating = false;

  // Dynamically size container based on card heights + vertical stack offset
  function updateContainerHeight() {
    let maxHeight = 0;
    cards.forEach((card) => {
      const h = card.offsetHeight;
      if (h > maxHeight) maxHeight = h;
    });
    if (maxHeight > 0) {
      const extraOffset = window.innerWidth <= 640 ? 220 : 300;
      container.style.minHeight = `${Math.max(520, maxHeight + extraOffset)}px`;
    }
  }

  // Update card positions, classes, active states and counter
  function applyClasses() {
    cards.forEach((card, idx) => {
      card.classList.remove(
        'is-active',
        'is-prev',
        'is-next',
        'is-far-prev',
        'is-far-next',
        'is-hidden',
        'is-hidden-top',
        'is-hidden-bottom',
        'slide-up-exit',
        'slide-down-exit'
      );

      const rel = (idx - currentIdx + totalCards) % totalCards;

      if (rel === 0) {
        card.classList.add('is-active');
      } else if (rel === 1) {
        card.classList.add('is-next');
      } else if (rel === 2) {
        card.classList.add('is-far-next');
      } else if (rel === totalCards - 1) {
        card.classList.add('is-prev');
      } else if (rel === totalCards - 2) {
        card.classList.add('is-far-prev');
      } else if (rel > 2 && rel <= Math.floor(totalCards / 2)) {
        card.classList.add('is-hidden-bottom');
      } else {
        card.classList.add('is-hidden-top');
      }
    });

    // Update indicator dots
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIdx);
    });

    // Update counter (e.g. 01, 02... 08)
    if (counter) {
      counter.textContent = String(currentIdx + 1).padStart(2, '0');
    }
  }

  function updateDeck(newIdx, direction = 'next') {
    if (isAnimating) return;
    isAnimating = true;

    currentIdx = (newIdx + totalCards) % totalCards;
    applyClasses();

    setTimeout(() => {
      isAnimating = false;
    }, 450);
  }

  // Initial layout configuration
  function initPositions() {
    applyClasses();
    setTimeout(updateContainerHeight, 80);
  }

  // Navigation button controls:
  // Next btn (down arrow) brings skills up from bottom to top
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateDeck(currentIdx + 1, 'next');
    });
  }

  // Prev btn (up arrow) rolls reverse (top down)
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateDeck(currentIdx - 1, 'prev');
    });
  }

  // Dot indicator click controls
  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetIdx = parseInt(dot.getAttribute('data-index'), 10);
      if (targetIdx !== currentIdx) {
        updateDeck(targetIdx, targetIdx > currentIdx ? 'next' : 'prev');
      }
    });
  });

  // Clicking directly on visible peeking cards navigates to them
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      if (card.classList.contains('is-next')) {
        updateDeck(currentIdx + 1, 'next');
      } else if (card.classList.contains('is-far-next')) {
        updateDeck(currentIdx + 2, 'next');
      } else if (card.classList.contains('is-prev')) {
        updateDeck(currentIdx - 1, 'prev');
      } else if (card.classList.contains('is-far-prev')) {
        updateDeck(currentIdx - 2, 'prev');
      }
    });

    // Spotlight cursor tracking for active & hovering skill cards
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--skill-x', `${x}px`);
      card.style.setProperty('--skill-y', `${y}px`);
    });
  });

  // Keyboard navigation when Skills section is in viewport
  const skillSection = document.getElementById('skills');
  if (skillSection) {
    window.addEventListener('keydown', (e) => {
      const rect = skillSection.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        updateDeck(currentIdx + 1, 'next');
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        updateDeck(currentIdx - 1, 'prev');
      }
    });
  }

  // Mouse wheel scroll handler over skills container (debounced)
  let lastWheelTime = 0;
  container.addEventListener('wheel', (e) => {
    const now = Date.now();
    if (now - lastWheelTime < 450) return;

    if (Math.abs(e.deltaY) > 25) {
      if (e.deltaY > 0) {
        // Scrolling down -> skills roll from bottom to top
        lastWheelTime = now;
        updateDeck(currentIdx + 1, 'next');
      } else {
        // Scrolling up -> skills roll reverse
        lastWheelTime = now;
        updateDeck(currentIdx - 1, 'prev');
      }
    }
  }, { passive: true });

  // Mobile Touch Swipe Handling (Vertical)
  let touchStartY = 0;
  let touchStartX = 0;

  container.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;

    const diffY = touchStartY - touchEndY;
    const diffX = touchStartX - touchEndX;

    // Detect vertical swipe
    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 35) {
      if (diffY > 0) {
        // Swiped up -> next skill comes up from bottom
        updateDeck(currentIdx + 1, 'next');
      } else {
        // Swiped down -> previous skill
        updateDeck(currentIdx - 1, 'prev');
      }
    }
  }, { passive: true });

  window.addEventListener('resize', updateContainerHeight);

  // Initialize positions on load
  initPositions();
}

/* ==========================================================================
   12. MY WORK / PROJECTS: VERTICAL 3D CARD STACK CAROUSEL (BOTTOM-TO-TOP ROLLER)
   ========================================================================== */
function initWorkVerticalStack() {
  const container = document.getElementById('work-stack-container');
  if (!container) return;

  const allCards = Array.from(container.querySelectorAll('.work-stack-card'));
  const prevBtn = document.getElementById('work-prev-btn');
  const nextBtn = document.getElementById('work-next-btn');
  const dotsContainer = document.getElementById('work-dots-container');
  const currentCounter = document.getElementById('work-current-counter');
  const totalCounter = document.getElementById('work-total-counter');
  const filterBtns = document.querySelectorAll('.auton-filter-btn');

  let activeCards = [...allCards];
  let currentIdx = 0;
  let isAnimating = false;

  function updateContainerHeight() {
    let maxHeight = 0;
    activeCards.forEach((card) => {
      const h = card.offsetHeight;
      if (h > maxHeight) maxHeight = h;
    });
    if (maxHeight > 0) {
      const extraOffset = window.innerWidth <= 640 ? 240 : 320;
      container.style.minHeight = `${Math.max(620, maxHeight + extraOffset)}px`;
    }
  }

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    activeCards.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `work-dot ${idx === currentIdx ? 'active' : ''}`;
      dot.setAttribute('data-index', idx);
      dot.setAttribute('aria-label', `Work Project ${idx + 1}`);
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        if (idx !== currentIdx) {
          updateDeck(idx, idx > currentIdx ? 'next' : 'prev');
        }
      });
      dotsContainer.appendChild(dot);
    });
  }

  function applyClasses() {
    const total = activeCards.length;
    if (total === 0) return;

    // Reset hidden cards not in active filter
    allCards.forEach((card) => {
      if (!activeCards.includes(card)) {
        card.className = 'auton-project-card work-stack-card is-hidden group';
        card.style.display = 'none';
      } else {
        card.style.display = '';
      }
    });

    activeCards.forEach((card, idx) => {
      card.classList.remove(
        'is-active',
        'is-prev',
        'is-next',
        'is-far-prev',
        'is-far-next',
        'is-hidden',
        'is-hidden-top',
        'is-hidden-bottom',
        'slide-up-exit',
        'slide-down-exit'
      );

      const rel = (idx - currentIdx + total) % total;

      if (rel === 0) {
        card.classList.add('is-active');
      } else if (rel === 1) {
        card.classList.add('is-next');
      } else if (rel === 2 && total > 2) {
        card.classList.add('is-far-next');
      } else if (rel === total - 1) {
        card.classList.add('is-prev');
      } else if (rel === total - 2 && total > 3) {
        card.classList.add('is-far-prev');
      } else if (rel > 2 && rel <= Math.floor(total / 2)) {
        card.classList.add('is-hidden-bottom');
      } else {
        card.classList.add('is-hidden-top');
      }
    });

    // Update dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.work-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIdx);
      });
    }

    // Update counters
    if (currentCounter) {
      currentCounter.textContent = String(currentIdx + 1).padStart(2, '0');
    }
    if (totalCounter) {
      totalCounter.textContent = String(total).padStart(2, '0');
    }
  }

  function updateDeck(newIdx, direction = 'next') {
    if (isAnimating) return;
    const total = activeCards.length;
    if (total === 0) return;

    isAnimating = true;
    currentIdx = (newIdx + total) % total;
    applyClasses();

    setTimeout(() => {
      isAnimating = false;
    }, 450);
  }

  // Filter tabs handling
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');
      if (filterVal === 'all') {
        activeCards = [...allCards];
      } else {
        activeCards = allCards.filter(card => card.getAttribute('data-category') === filterVal);
      }

      currentIdx = 0;
      renderDots();
      applyClasses();
      setTimeout(updateContainerHeight, 80);
    });
  });

  // Buttons
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateDeck(currentIdx + 1, 'next');
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateDeck(currentIdx - 1, 'prev');
    });
  }

  // Clicking on cards:
  // If inactive card is clicked -> roll it to active!
  // If active card is clicked -> open lightbox!
  allCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      if (card.classList.contains('is-next')) {
        e.stopPropagation();
        updateDeck(currentIdx + 1, 'next');
      } else if (card.classList.contains('is-far-next')) {
        e.stopPropagation();
        updateDeck(currentIdx + 2, 'next');
      } else if (card.classList.contains('is-prev')) {
        e.stopPropagation();
        updateDeck(currentIdx - 1, 'prev');
      } else if (card.classList.contains('is-far-prev')) {
        e.stopPropagation();
        updateDeck(currentIdx - 2, 'prev');
      }
    });

    // Spotlight cursor tracking
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--card-x', `${x}px`);
      card.style.setProperty('--card-y', `${y}px`);
    });
  });

  // Keyboard navigation when Projects / My Work section is in viewport
  const projectSection = document.getElementById('projects');
  if (projectSection) {
    window.addEventListener('keydown', (e) => {
      const rect = projectSection.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        updateDeck(currentIdx + 1, 'next');
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        updateDeck(currentIdx - 1, 'prev');
      }
    });
  }

  // Mouse wheel scroll handler over container (debounced)
  let lastWheelTime = 0;
  container.addEventListener('wheel', (e) => {
    const now = Date.now();
    if (now - lastWheelTime < 450) return;

    if (Math.abs(e.deltaY) > 25) {
      if (e.deltaY > 0) {
        lastWheelTime = now;
        updateDeck(currentIdx + 1, 'next');
      } else {
        lastWheelTime = now;
        updateDeck(currentIdx - 1, 'prev');
      }
    }
  }, { passive: true });

  // Mobile Touch Swipe Handling (Vertical)
  let touchStartY = 0;
  let touchStartX = 0;

  container.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;

    const diffY = touchStartY - touchEndY;
    const diffX = touchStartX - touchEndX;

    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 35) {
      if (diffY > 0) {
        updateDeck(currentIdx + 1, 'next');
      } else {
        updateDeck(currentIdx - 1, 'prev');
      }
    }
  }, { passive: true });

  window.addEventListener('resize', updateContainerHeight);

  // Initialize
  renderDots();
  applyClasses();
  setTimeout(updateContainerHeight, 80);
}
