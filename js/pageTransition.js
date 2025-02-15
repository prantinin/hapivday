document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("a"); // Select all links

    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default instant navigation
            let href = this.href; // Get the link destination

            document.body.classList.add("fade-out"); // Apply fade-out effect
            
            setTimeout(() => {
                window.location.href = href; // Navigate after fade-out
            }, 500); // Wait for the transition duration (0.5s)
        });
    });
});
