document.getElementById("header").innerHTML = `<nav id="navbar">
            <a class="navlink" href="index.html">Home</a>
            <a class="navlink" href="about.html">About Me</a>
            <a class="navlink" href="projects.html">Projects</a>
            <a class="navlink" href="contact.html">Connect with Me</a>
        </nav>`;

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const navLinks = document.querySelectorAll('.navlink');

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});