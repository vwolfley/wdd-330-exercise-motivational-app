export function aboutModal() {
    renderAboutModal();
    // Get modal element
    const modal = document.getElementById("aboutModal");
    // Get the button that opens the modal
    const btn = document.getElementById("openModal");
    // Get the <span> element that closes the modal
    const closeBtn = document.querySelector(".close");

    // When the user clicks the button, open the modal
    btn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // When the user clicks on <span> (x), close the modal
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // When the user clicks anywhere outside of the modal content, close it
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
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
                    <h3>Exercise and Motivational App</h3>
                    <p>Interactive webpage that gives exercise information as well motivational quotes.</p>
                </div>
            </div>
          </div>`;
        document.body.insertAdjacentHTML("beforeend", aboutModalHTML);
    }
}
