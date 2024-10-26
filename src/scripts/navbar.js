// The navBar function is responsible for creating a hamburger menu for the navigation bar. The function listens for a click event on the hamburger icon and toggles the "active" class on both the hamburger icon and the navigation menu. It also listens for click events on the navigation links and closes the menu when a link is clicked.
export function navBar() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLink = document.querySelectorAll(".nav-link");

    function mobileMenu() {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    }

    function closeMenu() {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }

    // Event Listeners
    hamburger.addEventListener("click", mobileMenu);
    navLink.forEach((n) => n.addEventListener("click", closeMenu));
}
