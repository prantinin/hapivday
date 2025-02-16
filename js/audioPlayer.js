document.addEventListener("DOMContentLoaded", function () {
    const audioToggle = document.getElementById("audioToggle");
    const audioIcon = document.getElementById("audioIcon");

    // List of "present" pages that require different file paths
    const presentClasses = ["present1", "present2", "present6", "present8", "present9", "present10", "present11"];
    const isPresentPage = presentClasses.some(cls => document.body.classList.contains(cls));

    // Function to get correct audio file paths based on page type
    function getAudioPath(file) {
        return isPresentPage ? `../../audio/${file}` : `../audio/${file}`;
    }

    // Function to get correct icon file paths based on page type
    function getIconPath(icon) {
        return isPresentPage ? `../../icons/${icon}` : `../icons/${icon}`;
    }

    // List of songs with correct paths
    const songs = [
        getAudioPath("love-like-you.mp3"),
        getAudioPath("cant-help-falling.mp3"),
        getAudioPath("island-song.mp3"),
        getAudioPath("tifa-theme.mp3")
    ];

    let audio = new Audio();
    audio.volume = 0.3; // Lower volume

    let songQueue = shuffleArray([...songs]); // Shuffle playlist initially
    let currentIndex = parseInt(localStorage.getItem("currentSongIndex")) || 0;
    let currentTime = parseFloat(localStorage.getItem("currentTime")) || 0;
    let isPlaying = sessionStorage.getItem("isPlaying") === "true";

    // Function to shuffle songs
    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // Function to play the next song
    function playNextSong() {
        currentIndex++;
        if (currentIndex >= songQueue.length) {
            songQueue = shuffleArray([...songs]); // Reshuffle playlist
            currentIndex = 0;
        }
        audio.src = songQueue[currentIndex];
        audio.currentTime = 0;
        audio.play().catch(err => console.log("Autoplay Blocked:", err));
        localStorage.setItem("currentSongIndex", currentIndex);
    }

    // Check if the page has a video element and stop music if necessary
    const hasVideo = document.querySelector("video") !== null;
    if (hasVideo) {
        audio.pause();
        sessionStorage.setItem("isPlaying", "false");
        audioIcon.src = getIconPath("audio-off.png");
        return; // Stop further execution
    }

    // Toggle music function (handling autoplay restrictions)
    function toggleMusic() {
        if (isPlaying) {
            audio.pause();
            audioIcon.src = getIconPath("audio-off.png");
            sessionStorage.setItem("isPlaying", "false");
        } else {
            audio.src = songQueue[currentIndex];
            audio.currentTime = currentTime;
            audio.play().then(() => {
                audioIcon.src = getIconPath("audio-on.png");
                sessionStorage.setItem("isPlaying", "true");
            }).catch(err => console.log("Autoplay Blocked:", err));
        }
        isPlaying = !isPlaying;
    }

    // Load saved state if music was playing
    if (isPlaying) {
        audio.src = songQueue[currentIndex];
        audio.currentTime = currentTime;
        audio.play().catch(err => console.log("Autoplay Blocked:", err));
        audioIcon.src = getIconPath("audio-on.png");
    } else {
        audioIcon.src = getIconPath("audio-off.png");
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
