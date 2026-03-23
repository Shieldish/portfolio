/* =============================================
   GABIAM Kossi Samuel — Portfolio Scripts
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Header shadow on scroll --- */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

    /* --- Scroll-to-top on logo click --- */
    document.querySelector('.nav-logo')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* --- Active nav link on scroll --- */
    const sections = document.querySelectorAll('section[id], footer');
    const navLinks = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(a => {
                    a.style.color = '';
                    a.style.background = '';
                    if (a.getAttribute('href') === `#${id}`) {
                        a.style.color = 'var(--text)';
                        a.style.background = 'var(--tag-bg)';
                    }
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => sectionObserver.observe(s));

    /* --- Fade-in on scroll --- */
    const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

    /* --- Mobile hamburger (toggle nav visibility) --- */
    const hamburger = document.getElementById('hamburger');
    const navLinksList = document.querySelector('.nav-links');

    if (hamburger && navLinksList) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinksList.style.display === 'flex';
            navLinksList.style.display = isOpen ? 'none' : 'flex';
            navLinksList.style.flexDirection = 'column';
            navLinksList.style.position = 'absolute';
            navLinksList.style.top = 'var(--header-h)';
            navLinksList.style.left = '0';
            navLinksList.style.right = '0';
            navLinksList.style.background = 'var(--bg)';
            navLinksList.style.padding = '1rem 24px 1.5rem';
            navLinksList.style.borderBottom = '1px solid var(--border)';
        });

        // Close mobile menu on nav link click
        navLinksList.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                if (window.innerWidth < 680) {
                    navLinksList.style.display = 'none';
                }
            });
        });
    }

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