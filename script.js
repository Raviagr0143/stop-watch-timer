// Variables for the timer display elements
const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
const millisecondsLabel = document.getElementById("milliseconds");

// Variables for the buttons
const startButton = document.getElementById("startBtn");
const stopButton = document.getElementById("stopBtn");
const pauseButton = document.getElementById("pauseBtn");
const resetButton = document.getElementById("resetBtn");

// Variable for the lap list
const lapList = document.getElementById("lapList");

// Stopwatch variables for keeping track of time
let minutes = 0;
let seconds = 0;
let milliseconds = 0;

let interval; // Variable to store the interval ID for setInterval

// Adding event listeners to buttons
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

// Function to start the timer
function startTimer() {
  interval = setInterval(updateTimer, 10); // Call updateTimer every 10 milliseconds
  startButton.disabled = true; // Disable the start button to prevent multiple intervals
}

// Function to stop the timer and add the time to the lap list
function stopTimer() {
  clearInterval(interval); // Stop the interval
  addToLapList(); // Add the current time to the lap list
  resetTimerData(); // Reset the timer variables
  startButton.disabled = false; // Enable the start button again
}

// Function to pause the timer
function pauseTimer() {
  clearInterval(interval); // Stop the interval
  startButton.disabled = false; // Enable the start button again
}

// Function to reset the timer
function resetTimer() {
  clearInterval(interval); // Stop the interval
  resetTimerData(); // Reset the timer variables
  startButton.disabled = false; // Enable the start button again
}

// Function to update the timer display
function updateTimer() {
  milliseconds += 10; // Increase milliseconds by 10 each time the function is called

  if (milliseconds === 1000) {
    // If milliseconds reach 1000 (1 second)
    milliseconds = 0; // Reset milliseconds
    seconds++; // Increase seconds

    if (seconds === 60) {
      // If seconds reach 60 (1 minute)
      seconds = 0; // Reset seconds
      minutes++; // Increase minutes
    }
  }

  displayTimer(); // Update the display with the new time
}

// Function to update the HTML elements with the current time
function displayTimer() {
  millisecondsLabel.textContent = padTime(milliseconds / 10); // Display milliseconds (divide by 10 to get original value)
  secondsLabel.textContent = padTime(seconds); // Display seconds
  minutesLabel.textContent = padTime(minutes); // Display minutes
}

// Function to format time values as two digits
function padTime(time) {
  return time.toString().padStart(2, "0"); // Convert time to string and pad with leading zeros if necessary
}

// Function to reset timer data
function resetTimerData() {
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  displayTimer(); // Update the display with the reset time
}

// Function to add the current time to the lap list
function addToLapList() {
  const lapTime = `
    ${padTime(minutes)} : ${padTime(seconds)} : ${padTime(milliseconds / 10)}
  `;

  const lapItem = document.createElement("li"); // Create a new list item

  lapItem.innerHTML = `
    <span>Lap ${lapList.childElementCount + 1} :</span> ${lapTime}
  `;

  lapList.appendChild(lapItem); // Append the new list item to the lap list
}
