
document.addEventListener("DOMContentLoaded", function () {

    // Create bait element
    var adBait = document.createElement("div");
    adBait.className = "adsbox ad-banner ad-unit ad-zone ad-space";
    adBait.style.position = "absolute";
    adBait.style.left = "-999px";
    adBait.style.height = "10px";
    adBait.style.width = "10px";
    adBait.style.pointerEvents = "none";

    document.body.appendChild(adBait);

    setTimeout(function () {
        var detected = false;

        if (
            adBait.offsetHeight === 0 ||
            adBait.clientHeight === 0 ||
            adBait.offsetParent === null
        ) {
            detected = true;
        }

        document.body.removeChild(adBait);

        if (detected) {
            showAdblockMessage();
        }
    }, 100);
});

function showAdblockMessage() {
    var banner = document.createElement("div");
    banner.innerHTML = `
        <div style="
            position:fixed;
            bottom:0;
            left:0;
            width:100%;
            background:#222;
            color:#fff;
            padding:15px;
            text-align:center;
            z-index:9999;
            font-family:Arial;
        ">
            We detected an ad blocker. Please support us by disabling it.
        </div>
    `;
    document.body.appendChild(banner);
}



