document.getElementById("header").innerHTML =
`
<nav id="navbar">
        <div class="navbrandmobile">Menu</div>
        <button id="menutoggle" aria-label="Toggle navigation">
            <span class="hamburger"></span>
        </button>
        <div id="nav-menu">
            <a class="navlink" href="index.html">Home</a>
            <a class="navlink" href="about.html">About Me</a>
            <a class="navlink" href="projects.html">Projects</a>
            <a class="navlink" href="contact.html">Connect with Me</a>
        </div>
    </nav>
`
;

const toggleBtn = document.getElementById("menutoggle");
const navMenu = document.getElementById("nav-menu");

toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle("open");
    navMenu.classList.toggle("open");
});