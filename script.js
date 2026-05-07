/* =============================================
   GABIAM Kossi Samuel — Portfolio Scripts
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

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