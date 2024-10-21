import { motivation } from "./motivation";
import { photos } from "./photos";
const EXERCISE_API_KEY = import.meta.env.VITE_EXERCISE_API_KEY;

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
            motivation();

            // Call the API function with the city name
            exerciseApiFetch(exerciseType, muscle, difficulty);
        });
}

// const muscle = "biceps";
// const type = "strength";
// const difficulty = "easy";
// The function to call the location api
async function exerciseApiFetch(type, muscle, difficulty) {
    // console.log(muscle);

    const url = `https://api.api-ninjas.com/v1/exercises?type=${type}&muscle=${muscle}&difficulty=${difficulty}`;

    const options = {
        method: "GET",
        headers: {
            "X-Api-Key": import.meta.env.VITE_EXERCISE_API_KEY,
            "Content-Type": "application/json",
        },
    };
    try {
        const response = await fetch(url, options);
        if (response.ok) {
            const result = await response.json();
            // console.log(result);
            if (result.length === 0) {
                displayError();
            } else {
                displayResults(result, type, muscle);
            }
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

async function displayResults(result, type, muscle) {
    // console.log(result, type);
    const photoType = type;
    const photoMuscle = muscle;
    // Await the photos from the API
    try {
        const photoData = await photos(photoType, photoMuscle);
        const photoArray = photoData.photos;
        // console.log(photoArray);

        let cardsHTML = "";
        result.forEach((workout, index) => {
            let cardsImage = "";

            const photo = photoArray[index % photoArray.length];

            const photoTemplate = `<img class="card-photo" src="${photo.src.medium}" alt="${photo.alt}" />`;
            cardsImage += photoTemplate;

            let diffClass = "";
            if (workout.difficulty === "beginner") {
                diffClass = "beginner";
            } else if (workout.difficulty === "intermediate") {
                diffClass = "intermediate";
            } else if (workout.difficulty === "expert") {
                diffClass = "expert";
            }

            const workoutCardTemplate = `
                <article class="card">
                <div class="card-image">${cardsImage}</div>
                    <h2 class="card-title">${workout.name}</h2>
                    <div class="card-info">
                        <ul>
                            <li><strong>Difficulty:</strong> <span class="${diffClass}">${
                                workout.difficulty.charAt(0).toUpperCase() +
                                workout.difficulty.slice(1)
                            }</span></li>
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
                    </div>
                    <div class="card-content">
                        <p><strong>Instructions:</strong> ${workout.instructions}</p>
                    </div>
                </article>
            `;

            cardsHTML += workoutCardTemplate;
        });

        // Update the container once, after the loop
        document.querySelector(".cards").innerHTML = cardsHTML;
    } catch (error) {
        console.error("Error in photo processing or display:", error);
    }
}

// Display an error message if no results are found
function displayError() {
    document.querySelector(".cards").innerHTML = `
        <article class="card-error">
            <h2>No Information Available</h2>
            <p>Sorry, There were no exercises found for your selection.</p>
            <p>Please make another selection.
        </article>
    `;
}
