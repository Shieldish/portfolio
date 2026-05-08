/* =============================================
   GABIAM Kossi Samuel — Portfolio Scripts
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Theme switcher --- */
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('i');
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

    const setTheme = (theme, persist = true) => {
        const isLight = theme === 'light';
        document.documentElement.dataset.theme = theme;

        if (themeToggle) {
            themeToggle.setAttribute('aria-label', isLight ? 'Activer le thème sombre' : 'Activer le thème clair');
            themeToggle.setAttribute('aria-pressed', String(isLight));
            themeToggle.title = isLight ? 'Passer au thème sombre' : 'Passer au thème clair';
        }

        if (themeIcon) {
            themeIcon.classList.toggle('fa-sun', !isLight);
            themeIcon.classList.toggle('fa-moon', isLight);
        }

        if (themeMeta) {
            themeMeta.setAttribute('content', isLight ? '#f8fafc' : '#0a0a0f');
        }

        if (persist) {
            localStorage.setItem('portfolio-theme', theme);
        }
    };

    const storedTheme = localStorage.getItem('portfolio-theme');
    setTheme(document.documentElement.dataset.theme || storedTheme || (mediaQuery.matches ? 'light' : 'dark'), Boolean(storedTheme));

    themeToggle?.addEventListener('click', () => {
        const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
    });

    mediaQuery.addEventListener('change', event => {
        if (!localStorage.getItem('portfolio-theme')) {
            setTheme(event.matches ? 'light' : 'dark', false);
        }
    });


    /* --- Text Scramble Animation --- */
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => (this.resolve = resolve));
            this.queue = [];
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        update() {
            let output = '';
            let complete = 0;
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="dud">${char}</span>`;
                } else {
                    output += from;
                }
            }
            this.el.innerHTML = output;
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }

    const phrases = [
        'Développeur Fullstack & Mobile',
        'Architecte Cloud & Réseaux',
        'Expert Systèmes & Infrastructure',
        'Développeur DevOps & Big Data'
    ];

    const el = document.querySelector('.scramble-text');
    if (el) {
        const fx = new TextScramble(el);
        let counter = 0;
        const next = () => {
            fx.setText(phrases[counter]).then(() => {
                setTimeout(next, 3000);
            });
            counter = (counter + 1) % phrases.length;
        };
        next();
    }

    /* --- Custom Tilt Effect --- */
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    /* --- Cursor glow follow --- */
    const glow = document.getElementById('cursorGlow');
    if (glow && window.innerWidth > 768) {
        document.addEventListener('mousemove', e => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        }, { passive: true });
    }

    /* --- Header shadow on scroll --- */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

    /* --- Scroll-to-top on logo click --- */
    document.querySelector('.nav-logo')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* --- Active nav link on scroll --- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(a => {
                    a.classList.remove('nav-active');
                    if (a.getAttribute('href') === `#${id}`) {
                        a.classList.add('nav-active');
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(s => sectionObserver.observe(s));

    /* --- Reveal on scroll --- */
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* --- Animated stat counters --- */
    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                let current = 0;
                const increment = Math.max(1, Math.floor(target / 30));
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.textContent = current;
                }, 40);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));

    /* --- Mobile hamburger --- */
    const hamburger = document.getElementById('hamburger');
    const navLinksList = document.getElementById('navLinks');

    if (hamburger && navLinksList) {
        hamburger.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            const isOpen = navLinksList.classList.contains('active');
            if (isOpen) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });

        // Close on nav link click (mobile)
        navLinksList.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                if (window.innerWidth < 680) {
                    navLinksList.classList.remove('active');
                    hamburger.querySelectorAll('span').forEach(s => {
                        s.style.transform = '';
                        s.style.opacity = '';
                    });
                }
            });
        });
    }

    /* --- Smooth scroll for anchor links --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* --- Visitor tracking (background, no-cors) --- */
    (async () => {
        try {
            const ipRes = await fetch('https://api.ipify.org?format=json');
            const { ip } = await ipRes.json();
            const geo = await (await fetch(`https://ipapi.co/${ip}/json/`)).json();

            const ua = navigator.userAgent;
            const getBrowser = u => {
                if (u.includes('Firefox')) return 'Firefox';
                if (u.includes('Edg')) return 'Edge';
                if (u.includes('Chrome')) return 'Chrome';
                if (u.includes('Safari') && !u.includes('Chrome')) return 'Safari';
                if (u.includes('OPR') || u.includes('Opera')) return 'Opera';
                return 'Unknown';
            };

            await fetch(
                'https://script.google.com/macros/s/AKfycbzWeKyR51bvOEgKy7yewN_XivhULsigVBwVWKfy1SgxvcXM8KqIryqA9FdYAAz-1O89/exec',
                {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ip,
                        city: geo.city,
                        region: geo.region,
                        country: geo.country_name,
                        time: new Date().toLocaleString(),
                        platform: navigator.platform,
                        os: ua,
                        browser: getBrowser(ua),
                        language: navigator.language
                    })
                }
            );
        } catch (_) { /* silent fail */ }
    })();

});