window.addEventListener("load", () => {
    const frog = document.querySelector(".side-frog");
    setTimeout(() => {
        frog.style.transform = "translateX(0)";
        frog.style.opacity = "1";
    }, 500);
});