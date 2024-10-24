import { motivation } from "./motivation";

export function myWorkout() {
    // Listen for form submission
    document.getElementById("myworkout").addEventListener("click", function () {
        // Call the motivation function
        motivation();

        // Call local storage
        const storedUserData = localStorage.getItem("myWorkouts");
        if (storedUserData.length != 0 || storedUserData != null) {
            const userData = JSON.parse(storedUserData);
            displayResults(userData);
        } else {
            console.log("User data not found in local storage");
            displayError();
        }
    });
}

async function displayResults(result) {
    // console.log(result, type);

    try {
        let cardsHTML = "";
        result.forEach((workout, index) => {
            const difficultyClassMap = {
                beginner: "beginner",
                intermediate: "intermediate",
                expert: "expert",
            };

            const diffClass = difficultyClassMap[workout.difficulty] || "";

            const workoutCardTemplate = `
                <article class="card">
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
                            <button class="btn remove-workout">Remove from Workout</button>
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
        console.error("Error in processing or display:", error);
        displayError();
    }

    // Listen for button click
    document.querySelectorAll(".remove-workout").forEach((button) => {
        button.addEventListener("click", function (event) {
            const cardInfo = event.target.closest(".card");

            removeFromWorkout(cardInfo);
        });
    });
}

function displayError() {
    document.querySelector(".cards").innerHTML = `
        <article class="card-error">
            <h2>No Information Available</h2>
            <p>Sorry, There were no exercises found for your My Workout.</p>
            <p>Please make another selection.
        </article>
    `;
}

function removeFromWorkout(cardInfo) {
    // console.log(cardInfo);
    const workoutName = cardInfo.querySelector(".card-title").innerHTML;
    // Retrieve the existing workouts from localStorage (if any)
    let exercises = JSON.parse(localStorage.getItem("myWorkouts")) || [];
    // Filter out the workout with the matching name
    exercises = exercises.filter((exercise) => exercise.name !== workoutName);
    // Save the updated array back to localStorage
    localStorage.setItem("myWorkouts", JSON.stringify(exercises));
}
