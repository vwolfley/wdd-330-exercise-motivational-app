import { aboutModal } from "./aboutModal.js";
import { exercise } from "./exercise.js";
import data from '../data/muscleOptions.json' assert { type: 'json' };

// Call the aboutModal function
aboutModal();

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

// Calls the data from json file
// async function createMuscleList() {
//     console.log(data);
//     try {
//         const response = await fetch(data);
//         if (response.ok) {
//             const result = await response.json();
//             // console.log(result);
//             renderMuscleList(result);
//         } else {
//             throw new Error(await response.text());
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }
// createMuscleList();
