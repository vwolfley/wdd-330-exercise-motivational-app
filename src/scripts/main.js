import { aboutModal } from "./aboutModal.js";
import { exercise } from "./exercise.js";
import { myWorkout } from "./myWorkout.js";
import { navBar } from "./navbar.js";
import { renderMuscleList } from "./renderMuscleList.js";
import data from "../data/muscleOptions.json" assert { type: "json" };

// Call the navBar function
navBar();
// Call the renderMuscleList function
renderMuscleList(data);
// Call the aboutModal function
aboutModal();
// Call the exercise function
exercise();
// Call the myWorkout function
myWorkout();
