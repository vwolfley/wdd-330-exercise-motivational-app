import logo from "../images/exercise_logo.png";
import docConfig from "./docConfig";

export function aboutModal() {
    renderAboutModal();

    const modal = document.getElementById("aboutModal");

    // Toggle modal visibility
    const toggleModal = () => modal.classList.toggle("show");

    // Listen for clicks to open, close, or hide modal
    document.addEventListener("click", (event) => {
        if (event.target.matches("#openModal")) {
            toggleModal();
        } else if (event.target.matches(".close") || event.target === modal) {
            modal.classList.remove("show");
        }
    });
}

function renderAboutModal() {
    if (!document.getElementById("aboutModal")) {
        const aboutModalHTML = `
          <div id="aboutModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>About</h2>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                <div class="image-bg" ><img src="${logo}" alt="Exercise Logo" class="about-logo"></div>
                
                    <h3>Exercise and Motivational App</h3>
                    <p>Stay active and inspired with our interactive app! Discover a variety of exercises and receive motivational quotes to keep you going. When you find an exercise you love, simply add it to your personal workout plan using the <strong>My Workout</strong> button.</p>
                </div>
                <div class="modal-footer">
                <p class="legal"> &copy; ${docConfig.copyright} Vern Wolfley | ${docConfig.version} | ${docConfig.date}</p>
                </div>
            </div>
          </div>`;
        document.body.insertAdjacentHTML("beforeend", aboutModalHTML);
    }
}
