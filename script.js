const WEDDING = new Date('2027-04-03T00:00:00');

function pad(n) {
    return String(n).padStart(2, '0');
}

function updateCountdown() {
    const diff = WEDDING - new Date();

    if (diff <= 0) {
        document.getElementById('countdown').innerHTML =
            '<p style="font-family:\'Playfair Display\',serif;font-style:italic;font-size:1.4rem">I dag er den store dag! ♡</p>';
        return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent    = pad(days);
    document.getElementById('hours').textContent   = pad(hours);
    document.getElementById('minutes').textContent = pad(minutes);
    document.getElementById('seconds').textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);
