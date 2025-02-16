document.addEventListener("DOMContentLoaded", function () {
    const audioToggle = document.getElementById("audioToggle");
    const audioIcon = document.getElementById("audioIcon");

    const songs = [
        "../audio/love-like-you.mp3",
        "../audio/song2.mp3",
        "../audio/song3.mp3",
        "../audio/song4.mp3"
    ];

    let audio = new Audio(); // Create an audio element
    let songQueue = shuffleArray([...songs]); // Initial shuffle
    let currentIndex = 0;
    let isPlaying = sessionStorage.getItem("isPlaying") === "true";

    // Function to shuffle songs
    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // Function to play next song
    function playNextSong() {
        currentIndex++;
        if (currentIndex >= songQueue.length) {
            songQueue = shuffleArray([...songs]); // Reshuffle when all songs are played
            currentIndex = 0;
        }
        audio.src = songQueue[currentIndex];
        audio.play();
    }

    // Check if the page has a video element
    const hasVideo = document.querySelector("video") !== null;

    if (hasVideo) {
        audio.pause();
        sessionStorage.setItem("isPlaying", "false");
        audioIcon.src = "../icons/audio-off.png";
        return; // Stop audio setup on video pages
    }

    // Toggle music function
    function toggleMusic() {
        if (isPlaying) {
            audio.pause();
            audioIcon.src = "../icons/audio-off.png";
            sessionStorage.setItem("isPlaying", "false");
        } else {
            audio.src = songQueue[currentIndex];
            audio.play();
            audioIcon.src = "../icons/audio-on.png";
            sessionStorage.setItem("isPlaying", "true");
        }
        isPlaying = !isPlaying;
    }

    // Load saved state if music was already playing
    if (isPlaying) {
        audio.src = songQueue[currentIndex];
        audio.play();
        audioIcon.src = "../icons/audio-on.png";
    } else {
        audioIcon.src = "../icons/audio-off.png";
    }

    // Play next song when current one ends
    audio.addEventListener("ended", playNextSong);

    // Attach event listener to the button
    audioToggle.addEventListener("click", toggleMusic);
});
