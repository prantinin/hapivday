document.addEventListener("DOMContentLoaded", function () {
    const audioFiles = ["../audio/cant-help-falling.mp3", "../audio/love-like-you.mp3", "../audio/tifa-theme.mp3"];

    function getRandomAudio() {
        return audioFiles[Math.floor(Math.random() * audioFiles.length)];
    }

    const hasVideo = document.querySelector("video") !== null;
    if (hasVideo) return; // Stop audio if there's a video

    let storedAudio = sessionStorage.getItem("currentAudio") || getRandomAudio();
    let storedTime = sessionStorage.getItem("audioTime") || 0;

    let audioElement = document.createElement("audio");
    audioElement.id = "backgroundAudio";
    audioElement.src = storedAudio;
    audioElement.volume = 0.5;
    audioElement.loop = true;
    document.body.appendChild(audioElement);

    function playAudio() {
        audioElement.currentTime = parseFloat(storedTime);
        audioElement.play().catch((error) => {
            console.warn("Autoplay blocked, waiting for user interaction");
        });
        sessionStorage.setItem("currentAudio", storedAudio);
    }

    // Play after user interaction
    document.addEventListener("click", () => {
        playAudio();
    }, { once: true });

    // Save progress every second
    setInterval(() => {
        sessionStorage.setItem("audioTime", audioElement.currentTime);
    }, 1000);
});
