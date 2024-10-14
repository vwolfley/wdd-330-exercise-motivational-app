import { motivation } from "./motivation";

export function exercise() {

    // Listen for form submission
    document
        .getElementById("exerciseForm")
        .addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent the form from submitting the traditional way

            // Get the value from the input field
            const muscle = document.getElementById("muscle").value.trim();
            const exerciseType = document
                .getElementById("exerciseType")
                .value.trim();
            const difficulty = document
                .getElementById("difficulty")
                .value.trim();

            // Call the motivation function
            // motivation();

            // Call the API function with the city name
            exerciseApiFetch(exerciseType, muscle, difficulty);
        });
}

// const muscle = "biceps";
// const type = "strength";
// const difficulty = "easy";
// The function to call the location api
async function exerciseApiFetch(type, muscle, difficulty) {
    console.log(muscle);

    const url = `https://api.api-ninjas.com/v1/exercises?type=${type}&muscle=${muscle}&difficulty=${difficulty}`;

    const options = {
        method: "GET",
        headers: {
            "X-Api-Key": "JqVU78FmGF8DRs5wmCnWaA==BYYns69uqwTlcmyd",
            "Content-Type": "application/json",
        },
    };
    try {
        const response = await fetch(url, options);
        if (response.ok) {
            const result = await response.json();
            console.log(result);
            displayResults(result);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

// difficulty: "beginner";
// equipment: "dumbbell";
// instructions: "Seat yourself on an incline bench with a dumbbell in each hand. You should pressed firmly against he back with your feet together. Allow the dumbbells to hang straight down at your side, holding them with a neutral grip. This will be your starting position. Initiate the movement by flexing at the elbow, attempting to keep the upper arm stationary. Continue to the top of the movement and pause, then slowly return to the start position.";
// muscle: "biceps";
// name: "Incline Hammer Curls";
// type: "strength";

function displayResults(result) {
    let cardsHTML = ""; // Accumulate the HTML here

    result.forEach((workout) => {
        const workoutCardTemplate = `
            <article class="card">
                <h2>${workout.name}</h2>
                <ul>
                    <li><strong>Difficulty:</strong> ${
                        workout.difficulty.charAt(0).toUpperCase() +
                        workout.difficulty.slice(1)
                    }</li>
                    <li><strong>Equipment:</strong> ${
                        workout.equipment.charAt(0).toUpperCase() +
                        workout.equipment.slice(1)
                    }</li>
                    <li><strong>Type:</strong> ${
                        workout.type.charAt(0).toUpperCase() +
                        workout.type.slice(1)
                    }</li>
                    <li><strong>Muscle Worked:</strong> ${
                        workout.muscle.charAt(0).toUpperCase() +
                        workout.muscle.slice(1)
                    }</li>
                </ul>
                <p>Instructions: ${workout.instructions}</p>
            </article>
        `;

        cardsHTML += workoutCardTemplate; // Add to the accumulated HTML
    });

    // Update the container once, after the loop
    document.querySelector(".cards").innerHTML = cardsHTML;
}


