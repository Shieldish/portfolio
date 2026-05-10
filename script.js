/* =============================================
   GABIAM Kossi Samuel — Portfolio v2
   Script: Animations | Interactions | Canvas
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* =============================================
     1. LOADER
     ============================================= */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader?.classList.add('hidden');
    }, 600);
  });
  // Fallback: hide loader after 3s max
  setTimeout(() => loader?.classList.add('hidden'), 3000);

  /* =============================================
     2. CURSOR
     ============================================= */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  if (cursorDot && cursorRing && window.innerWidth > 768) {
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    }, { passive: true });

    // Smooth ring follow
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    };
    animateRing();

    // Hover effect on interactives
    const hoverTargets = document.querySelectorAll('a, button, .btn, .skill-card, .project-card, .contact-item, .stat-card');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });
  }

  /* =============================================
     3. PARTICLES (Canvas)
     ============================================= */
  const canvas = document.getElementById('particlesCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseXp = 0, mouseYp = 0;
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.hue = Math.random() < 0.5 ? 240 : 280; // indigo or purple
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse interaction
        const dx = mouseXp - this.x;
        const dy = mouseYp - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150 * 0.02;
          this.x -= dx * force;
          this.y -= dy * force;
        }

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 60%, 70%, ${this.opacity})`;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const count = Math.min(80, Math.floor(canvas.width * canvas.height / 12000));
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };
    initParticles();

    let mouseActive = false;
    let mouseTimer;
    document.addEventListener('mousemove', e => {
      mouseXp = e.clientX;
      mouseYp = e.clientY;
      mouseActive = true;
      clearTimeout(mouseTimer);
      mouseTimer = setTimeout(() => { mouseActive = false; }, 200);
    }, { passive: true });

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      if (animationId) cancelAnimationFrame(animationId);
    });
  }

  /* =============================================
     4. THEME TOGGLE
     ============================================= */
  const themeBtn = document.getElementById('themeBtn');
  const STORAGE_KEY = 'gks-theme';

  const getStoredTheme = () => {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  };

  const storeTheme = theme => {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch {}
  };

  const setTheme = (theme, persist = true) => {
    const safe = theme === 'light' ? 'light' : 'dark';
    document.documentElement.dataset.theme = safe;
    if (persist) storeTheme(safe);

    // Update meta theme-color
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', safe === 'light' ? '#f8fafc' : '#0a0a0f');
  };

  // Init theme
  const stored = getStoredTheme();
  if (stored === 'light' || stored === 'dark') {
    setTheme(stored);
  } else {
    const prefersLight = window.matchMedia?.('(prefers-color-scheme: light)')?.matches;
    setTheme(prefersLight ? 'light' : 'dark', false);
  }

  themeBtn?.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === 'light' ? 'dark' : 'light');
  });

  // Listen to system theme changes
  const mediaQuery = window.matchMedia?.('(prefers-color-scheme: light)');
  const handleSystemChange = e => {
    if (!getStoredTheme()) {
      setTheme(e.matches ? 'light' : 'dark', false);
    }
  };
  if (mediaQuery?.addEventListener) {
    mediaQuery.addEventListener('change', handleSystemChange);
  }

  /* =============================================
     5. TYPEWRITER EFFECT
     ============================================= */
  const typewriterEl = document.getElementById('typewriterText');
  if (typewriterEl) {
    const phrases = [
      'Full Stack & Mobile Developer',
      'Cloud & Networks Architect',
      'Systems & Infrastructure Engineer',
      'DevOps & Big Data'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function typeWrite() {
      const currentPhrase = phrases[phraseIndex];

      if (!isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentPhrase.length) {
          isPaused = true;
          setTimeout(() => {
            isPaused = false;
            isDeleting = true;
            typeWrite();
          }, 2500);
          return;
        }
        setTimeout(typeWrite, 60 + Math.random() * 40);
      } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(typeWrite, 400);
          return;
        }
        setTimeout(typeWrite, 30 + Math.random() * 20);
      }
    }
    typeWrite();
  }

  /* =============================================
     6. HEADER SCROLL EFFECTS
     ============================================= */
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Shadow on scroll
    header?.classList.toggle('scrolled', currentScroll > 50);

    // Hide/Show header on scroll direction (shrink)
    if (currentScroll > 200) {
      if (currentScroll > lastScroll) {
        header?.classList.add('shrink');
      } else {
        header?.classList.remove('shrink');
      }
    } else {
      header?.classList.remove('shrink');
    }

    lastScroll = currentScroll;
  }, { passive: true });

  /* =============================================
     7. NAVIGATION ACTIVE LINK
     ============================================= */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });

  sections.forEach(s => navObserver.observe(s));

  /* =============================================
     8. REVEAL ON SCROLL
     ============================================= */
  const revealElements = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Apply delay if present
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  /* =============================================
     9. STAT COUNTERS
     ============================================= */
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let current = 0;
        const steps = 30;
        const increment = target / steps;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current);
        }, 40);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(c => counterObserver.observe(c));

  /* =============================================
     10. SKILL BARS ANIMATION
     ============================================= */
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.dataset.width;
        fill.style.width = width + '%';
        fill.classList.add('animated');
        skillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.2 });

  skillFills.forEach(f => skillObserver.observe(f));

  /* =============================================
     11. HAMBURGER MENU
     ============================================= */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const spans = hamburger.querySelectorAll('span');
      const isOpen = navMenu.classList.contains('active');
      spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
      spans[1].style.opacity = isOpen ? '0' : '';
      spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
    });

    // Close on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 680) {
          navMenu.classList.remove('active');
          hamburger.querySelectorAll('span').forEach(s => {
            s.style.transform = '';
            s.style.opacity = '';
          });
        }
      });
    });

    // Close on click outside
    document.addEventListener('click', e => {
      if (window.innerWidth <= 680 && !header?.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.querySelectorAll('span').forEach(s => {
          s.style.transform = '';
          s.style.opacity = '';
        });
      }
    });
  }

  /* =============================================
     12. SCROLL TO LOGO
     ============================================= */
  document.querySelector('.nav-logo')?.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* =============================================
     13. BACK TO TOP
     ============================================= */
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    backToTop?.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* =============================================
     14. CONTACT FORM — Formspree
     ============================================= */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = document.getElementById('formSubmitBtn');
      const statusEl = document.getElementById('formStatus');
      const originalHTML = btn?.innerHTML;

      if (btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
        btn.disabled = true;
      }
      if (statusEl) statusEl.className = 'form-status';

      try {
        const data = new FormData(contactForm);
        const res = await fetch(contactForm.action, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' }
        });

        if (res.ok) {
          if (statusEl) {
            statusEl.textContent = 'Message sent! I will get back to you as soon as possible.';
            statusEl.className = 'form-status success';
          }
          contactForm.reset();
          setTimeout(() => { if (statusEl) statusEl.className = 'form-status'; }, 5000);
        } else {
          throw new Error('server');
        }
      } catch {
        if (statusEl) {
          statusEl.textContent = 'Sending failed. Contact me directly: gabiam.k.samuel@gmail.com';
          statusEl.className = 'form-status error';
        }
      } finally {
        if (btn) {
          btn.innerHTML = originalHTML || '';
          btn.disabled = false;
        }
      }
    });
  }

  /* =============================================
     15. SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* =============================================
     16. PROJECT CARDS PARALLAX TILT
     ============================================= */
  const projectCards = document.querySelectorAll('.project-card:not(.coming-soon)');
  projectCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 12;
      const rotateY = (centerX - x) / 12;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  /* =============================================
     17. PARALLAX SCROLL ON HERO
     ============================================= */
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroInner = hero.querySelector('.hero-inner');
      if (heroInner && scrollY < window.innerHeight) {
        heroInner.style.transform = `translateY(${scrollY * 0.15}px)`;
        heroInner.style.opacity = 1 - (scrollY / window.innerHeight) * 0.5;
      }
    }, { passive: true });
  }

  /* =============================================
     18. TIMELINE STAGGER ANIMATION
     ============================================= */
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, index * 150);
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  timelineItems.forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    timelineObserver.observe(item);
  });

  console.log(`%c GKS Portfolio %c v2.0 `, 'background:#6366f1;color:#fff;padding:4px 8px;border-radius:4px 0 0 4px;font-weight:700', 'background:#a855f7;color:#fff;padding:4px 8px;border-radius:0 4px 4px 0;font-weight:500');
});