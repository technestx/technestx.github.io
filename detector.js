<!-- Place this code preferably in <head> or right after opening <body> -->
<script>
(function detectAdBlock() {
    // ───────────────────────────────────────────────
    //  CONFIGURATION - change these values if needed
    // ───────────────────────────────────────────────
    const CHECK_INTERVAL_MS     = 1500;     // how often to re-check
    const SHOW_MESSAGE_AFTER_MS = 3500;     // how long user must have adblock before showing message
    const DEBUG               = false;      // set true during testing

    // Message / overlay (you can also redirect, open modal, etc.)
    const BLOCK_MESSAGE = `
        <div style="position:fixed; inset:0; background:#000d;z-index:2147483647; color:white; font-family:system-ui,sans-serif; display:flex; align-items:center; justify-content:center; text-align:center; padding:20px;">
            <div style="max-width:520px;">
                <h2 style="margin:0 0 18px;font-size:1.9rem;">Ad blocker detected 😔</h2>
                <p style="margin:0 0 24px; font-size:1.15rem; line-height:1.45; opacity:0.92;">
                    Please support us by disabling your ad blocker for this website.<br>
                    We rely on advertising revenue to keep the lights on and content free.
                </p>
                <button onclick="location.reload()" style="background:#e74c3c; color:white; border:none; padding:14px 32px; font-size:1.1rem; border-radius:8px; cursor:pointer;">
                    I've disabled it — reload page
                </button>
                <p style="margin:28px 0 0; font-size:0.95rem; opacity:0.7;">
                    Thank you for understanding ❤️
                </p>
            </div>
        </div>
    `;

    // ───────────────────────────────────────────────
    //  DETECTION LOGIC
    // ───────────────────────────────────────────────

    let adBlockLikely   = false;
    let lastKnownState  = false;
    let overlayShown    = false;
    let timer           = null;

    // 1. Classic bait element + CSS + inline style trick
    function checkBaitElement() {
        const bait = document.createElement('div');
        bait.className = 'adsbygoogle ads-box textad banner-ad google-ad';
        bait.style.cssText = 'height:1px !important; width:1px !important; position:absolute !important; left:-9999px !important; top:-9999px !important; opacity:0 !important; display:block !important; visibility:visible !important;';
        document.body.appendChild(bait);

        setTimeout(() => {
            const h = bait.offsetHeight;
            const w = bait.offsetWidth;
            const disp = window.getComputedStyle(bait).display;

            const probablyBlocked =
                (h === 0 || w === 0 || disp === 'none') ||
                bait.getBoundingClientRect().height < 1;

            cleanupAndReport(probablyBlocked, "bait element");
            document.body.removeChild(bait);
        }, 80);
    }

    // 2. Popular ad networks fake requests
    function checkFakeAdRequest() {
        const img = new Image();
        const start = Date.now();

        img.onload = img.onerror = () => {
            const took = Date.now() - start;
            // very fast = blocked by filter list
            cleanupAndReport(took < 40, "fake ad image");
        };

        // Many lists block this kind of domain
        img.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?' + Math.random();
    }

    // 3. Most aggressive – try to load real adsbygoogle.js and see if it defines the global
    function checkAdsByGoogleNamespace() {
        if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
            cleanupAndReport(false, "adsbygoogle exists");
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        script.async = true;

        script.onload = () => {
            const exists = !!(window.adsbygoogle && Array.isArray(window.adsbygoogle));
            cleanupAndReport(!exists, "adsbygoogle.js load check");
        };

        script.onerror = () => {
            cleanupAndReport(true, "adsbygoogle.js 404/blocked");
        };

        document.head.appendChild(script);
    }

    function cleanupAndReport(blocked, method) {
        if (DEBUG) console.log(`[AdBlock detect] ${method}: ${blocked ? 'BLOCKED' : 'passed'}`);

        if (blocked) {
            adBlockLikely = true;
        }

        // We need at least 2 positive detections to be more confident
        if (adBlockLikely) {
            if (!timer) {
                timer = setTimeout(showOverlayIfStillBlocked, SHOW_MESSAGE_AFTER_MS);
            }
        }
    }

    function showOverlayIfStillBlocked() {
        // final re-check
        if (!adBlockLikely) {
            hideOverlay();
            return;
        }

        if (overlayShown) return;
        overlayShown = true;

        const div = document.createElement('div');
        div.innerHTML = BLOCK_MESSAGE;
        document.body.appendChild(div.children[0]);

        if (DEBUG) console.log("[AdBlock] Overlay displayed");
    }

    function hideOverlay() {
        if (!overlayShown) return;
        const el = document.querySelector('div[style*="inset:0"][style*="z-index:2147483647"]');
        if (el) el.remove();
        overlayShown = false;
    }

    // ───────────────────────────────────────────────
    //  Start detection
    // ───────────────────────────────────────────────

    function runAllChecks() {
        adBlockLikely = false; // reset before new round
        checkBaitElement();
        checkFakeAdRequest();
        checkAdsByGoogleNamespace();
    }

    // Initial check
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runAllChecks);
    } else {
        runAllChecks();
    }

    // Periodic check (some adblockers load filters later)
    setInterval(runAllChecks, CHECK_INTERVAL_MS);

})();
</script>