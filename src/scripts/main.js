import { aboutModal } from "./aboutModal.js";
import { exercise } from "./exercise.js";
import data from "../data/muscleOptions.json" assert { type: "json" };

// Call the aboutModal function
aboutModal();

// Hamburger menu for Nav Bar
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

// Call the exercise function
exercise();

// Renders the muscle button list
function renderMuscleList(result) {
    // console.log(result);
    const muscleList = document.getElementById("muscle-list");

    const muscles = result.muscleGroups;

    muscles.forEach((muscle) => {
        const muscleButton = document.createElement("button");
        muscleButton.textContent = muscle.name;
        muscleButton.classList.add("button-muscle");
        muscleButton.setAttribute("data-muscle", muscle.value);
        muscleList.appendChild(muscleButton);
    });

    // Get reference to the input field
    const muscleInput = document.getElementById("muscle");

    // Function to handle button clicks
    const muscleButtons = document.querySelectorAll(".button-muscle");

    muscleButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // Get the muscle name from the button's data attribute
            const selectedMuscle = button.getAttribute("data-muscle");
            // console.log("Selected muscle:", selectedMuscle);
            // Set the muscle name in the input field
            muscleInput.value = selectedMuscle;

            // Optionally highlight the clicked button and remove highlight from others
            muscleButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
        });
    });

    // Listen for changes in the input field
    muscleInput.addEventListener("input", () => {
        // If the input field is manually cleared, remove the 'active' class from all buttons
        if (muscleInput.value === "") {
            muscleButtons.forEach((btn) => btn.classList.remove("active"));
        }
    });
}
renderMuscleList(data);
