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

            const difficultyClassMap = {
                beginner: "beginner",
                intermediate: "intermediate",
                expert: "expert",
            };

            const diffClass = difficultyClassMap[workout.difficulty] || "";

            const workoutCardTemplate = `
                <article class="card">
                <div class="card-image">${cardsImage}</div>
                    <h2 class="card-title">${workout.name}</h2>
                    <div class="card-info">
                        <ul>
                            <li><strong>Difficulty:</strong> <span class="tag ${diffClass} workoutDiff">${
                                workout.difficulty.charAt(0).toUpperCase() +
                                workout.difficulty.slice(1)
                            }</span></li>
                            <li class="workoutEquip"><strong>Equipment:</strong> ${
                                workout.equipment.charAt(0).toUpperCase() +
                                workout.equipment.slice(1)
                            }</li>
                            <li class="workoutType"><strong>Type:</strong> ${
                                workout.type.charAt(0).toUpperCase() +
                                workout.type.slice(1)
                            }</li>
                            <li class="workoutMuscle"><strong>Muscle Worked:</strong> ${
                                workout.muscle.charAt(0).toUpperCase() +
                                workout.muscle.slice(1)
                            }</li>
                        </ul>
                        <div class="button-container">
                            <button class="btn button-workout">Add to Workout</button>
                        </div>
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

    // Listen for button click
    document.querySelectorAll(".button-workout").forEach((button) => {
        button.addEventListener("click", function (event) {
            const cardInfo = event.target.closest(".card");

            addToWorkout(cardInfo);
        });
    });
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

function getWorkoutDetails(cardInfo) {
    // console.log(cardInfo);
    const workoutName = cardInfo.querySelector(".card-title").innerHTML;

    const workoutDifficulty = cardInfo.querySelector(".workoutDiff").innerHTML;

    let workoutEquipment = cardInfo.querySelector(".workoutEquip");
    workoutEquipment = workoutEquipment.innerHTML
        .replace(workoutEquipment.querySelector("strong").outerHTML, "")
        .trim();

    let workoutType = cardInfo.querySelector(".workoutType");
    workoutType = workoutType.innerHTML
        .replace(workoutType.querySelector("strong").outerHTML, "")
        .trim();

    let workoutMuscle = cardInfo.querySelector(".workoutMuscle");
    workoutMuscle = workoutMuscle.innerHTML
        .replace(workoutMuscle.querySelector("strong").outerHTML, "")
        .trim();

    let workoutInstructions = cardInfo.querySelector(".card-content p");
    workoutInstructions = workoutInstructions.innerHTML
        .replace(workoutInstructions.querySelector("strong").outerHTML, "")
        .trim();

    return {
        name: workoutName,
        difficulty: workoutDifficulty,
        equipment: workoutEquipment,
        type: workoutType,
        muscle: workoutMuscle,
        instructions: workoutInstructions,
    };
}

function addToLocalStorage(exercise) {
    // Retrieve the existing workouts from localStorage (if any)
    let exercises = JSON.parse(localStorage.getItem("myWorkouts")) || [];
    // Add the new exercise to the array
    exercises.push(exercise);
    // Save the updated array back to localStorage
    localStorage.setItem("myWorkouts", JSON.stringify(exercises));
}

function addToWorkout(cardInfo) {
    const exercise = getWorkoutDetails(cardInfo);
    addToLocalStorage(exercise);
}
