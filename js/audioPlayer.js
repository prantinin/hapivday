document.addEventListener("DOMContentLoaded", function () {
    const audioToggle = document.getElementById("audioToggle");
    const audioIcon = document.getElementById("audioIcon");

    const songs = [
        "../audio/love-like-you.mp3",
        "../audio/cant-help-falling.mp3",
        "../audio/island-song.mp3",
        "../audio/tifa-theme.mp3"
    ];

    let audio = new Audio();
    audio.volume = 0.3; // 🔊 Set volume lower (0.0 - 1.0)

    let songQueue = shuffleArray([...songs]);
    let currentIndex = parseInt(localStorage.getItem("currentSongIndex")) || 0;
    let currentTime = parseFloat(localStorage.getItem("currentTime")) || 0;
    let isPlaying = sessionStorage.getItem("isPlaying") === "true";

    // Shuffle function
    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // Play next song
    function playNextSong() {
        currentIndex++;
        if (currentIndex >= songQueue.length) {
            songQueue = shuffleArray([...songs]);
            currentIndex = 0;
        }
        audio.src = songQueue[currentIndex];
        audio.currentTime = 0; // Reset playback position
        audio.play();
        localStorage.setItem("currentSongIndex", currentIndex);
    }

    // Check for video element
    const hasVideo = document.querySelector("video") !== null;
    if (hasVideo) {
        audio.pause();
        sessionStorage.setItem("isPlaying", "false");
        audioIcon.src = "../icons/audio-off.png";
        return;
    }

    // Toggle music
    function toggleMusic() {
        if (isPlaying) {
            audio.pause();
            audioIcon.src = "../icons/audio-off.png";
            sessionStorage.setItem("isPlaying", "false");
        } else {
            audio.src = songQueue[currentIndex];
            audio.currentTime = currentTime; // Resume from last time
            audio.play();
            audioIcon.src = "../icons/audio-on.png";
            sessionStorage.setItem("isPlaying", "true");
        }
        isPlaying = !isPlaying;
    }

    // Load state if music was playing
    if (isPlaying) {
        audio.src = songQueue[currentIndex];
        audio.currentTime = currentTime;
        audio.play();
        audioIcon.src = "../icons/audio-on.png";
    } else {
        audioIcon.src = "../icons/audio-off.png";
    }

    // Save current playback time every second
    setInterval(() => {
        if (!audio.paused) {
            localStorage.setItem("currentTime", audio.currentTime);
        }
    }, 1000);

    // Play next song when the current one ends
    audio.addEventListener("ended", playNextSong);

    // Attach event listener to toggle button
    audioToggle.addEventListener("click", toggleMusic);
});
