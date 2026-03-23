
// Animation simple au scroll
const elements = document.querySelectorAll('.card');

window.addEventListener('scroll', () => {
    elements.forEach(el => {
        const position = el.getBoundingClientRect().top;
        const screen = window.innerHeight;

        if (position < screen - 50) {
            el.style.opacity = 1;
            el.style.transform = "translateY(0)";
        }
    });
});

// initial state
elements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";
    el.style.transition = "0.5s";
});


// Visitor tracking
(async () => {
    try {
        // Get IPv4 address
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipRes.json();
        const ipv4 = ipData.ip;

        // Get geo information based on IP
        const geoRes = await fetch("https://ipapi.co/" + ipv4 + "/json/");
        const geo = await geoRes.json();

        // Detect browser from userAgent
        function getBrowserName(ua) {
            if (ua.includes("Firefox")) return "Firefox";
            if (ua.includes("Edg")) return "Edge";
            if (ua.includes("Chrome")) return "Chrome";
            if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
            if (ua.includes("OPR") || ua.includes("Opera")) return "Opera";
            return "Unknown";
        }

        const ua = navigator.userAgent;
        const payload = {
            ip: ipv4,
            city: geo.city,
            region: geo.region,
            country: geo.country_name,
            time: new Date().toLocaleString(),
            platform: navigator.platform,
            os: ua,
            browser: getBrowserName(ua),
            language: navigator.language,
            page: window.location.pathname,
            referrer: document.referrer || 'Direct'
        };

        // Send to Google Apps Script
        await fetch("https://script.google.com/macros/s/AKfycbzWeKyR51bvOEgKy7yewN_XivhULsigVBwVWKfy1SgxvcXM8KqIryqA9FdYAAz-1O89/exec", {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        console.log("Visitor info sent successfully!");
    } catch (err) {
        console.error("Tracking error:", err);
    }
})();

