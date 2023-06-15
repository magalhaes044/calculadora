let display = document.getElementById("display");
let explanationSteps = document.getElementById("explanationSteps");
let explanationIndex = 1;
let explanation = [];
let scientificMode = false;

function appendCharacter(char) {
  display.value += char;
}

function clearDisplay() {
  display.value = "";
  clearExplanation();
}

function deleteLastCharacter() {
  display.value = display.value.slice(0, -1);
  clearExplanation();
}

function calculate() {
  let result;
  try {
    result = eval(display.value);
    clearExplanation();
  } catch (error) {
    result = "Erro";
    addExplanationStep("Erro na expressão.");
  }
  display.value = result;
}

function toggleScientificMode() {
  scientificMode = !scientificMode;
  let scientificButtons = document.getElementsByClassName("scientific");
  for (let i = 0; i < scientificButtons.length; i++) {
    scientificButtons[i].classList.toggle("hidden");
  }
  let advancedButtons = document.getElementsByClassName("advanced");
  for (let i = 0; i < advancedButtons.length; i++) {
    advancedButtons[i].classList.toggle("hidden");
  }
  clearExplanation();
}

function addExplanationStep(step) {
  let stepElement = document.createElement("div");
  stepElement.classList.add("step");

  let stepNumber = document.createElement("span");
  stepNumber.classList.add("step-number");
  stepNumber.textContent = explanationIndex++;

  let stepDescription = document.createElement("span");
  stepDescription.classList.add("step-description");
  stepDescription.textContent = step;

  stepElement.appendChild(stepNumber);
  stepElement.appendChild(stepDescription);
  explanationSteps.appendChild(stepElement);
}

function clearExplanation() {
  explanationIndex = 1;
  explanationSteps.innerHTML = "";
}