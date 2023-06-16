let display = document.getElementById("display");
let explanationSteps = document.getElementById("explanationSteps");
let explanationIndex = 1;
let explanation = [];
let calculationsHistory = [];
let scientificMode = false;

function appendCharacter(char) {
  display.value += char;
  clearExplanation();
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
  const display = document.getElementById('display');
  const expression = display.value;

  try {
    result = eval(display.value);
    result = eval(expression);
    display.value = result;
    const explanationSteps = document.getElementById('explanation-steps');
    explanationSteps.innerHTML = '';

    const explanation = `Passo 1: Substitua a expressão "${expression}" por "${result}".`;
    explanationSteps.innerHTML += `<p>${explanation}</p>`;
    generateExplanation(result);
  } catch (error) {
    result = "Erro";
    addExplanationStep("Erro na expressão.");
  }
  const calculation = {
    expression,
    result,
    explanation
  };
  calculationsHistory.push(calculation);

  // Atualiza o histórico exibido
  const calcHistoryElement = document.getElementById('calc-history');
  calcHistoryElement.innerHTML = '';

  calculationsHistory.forEach((calc) => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="calculation">${calc.expression} = ${calc.result}</span><br>
                    <span class="explanation">${calc.explanation}</span>`;
    calcHistoryElement.appendChild(li);
  });
}

function clearHistory() {
  calculationsHistory = [];
  const calcHistoryElement = document.getElementById('calc-history');
  calcHistoryElement.innerHTML = '';
}

document.getElementById('clear-history-btn').addEventListener('click', clearHistory);
 
function setCursor() {
  display.focus();
  display.setSelectionRange(5, 5); // Defina a posição do cursor conforme necessário
}

function deleteAfterCursor() {
  let cursorPosition = display.selectionStart;
  display.value = display.value.substring(0, cursorPosition);
  clearExplanation();
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
  stepDescription.innerHTML = step;

  stepElement.appendChild(stepNumber);
  stepElement.appendChild(stepDescription);
  explanationSteps.appendChild(stepElement);
}

function clearExplanation() {
  explanationIndex = 1;
  explanationSteps.innerHTML = "";
  explanationSteps.classList.remove("show");
}

function generateExplanation(result) {
  explanation = [];
  explanationIndex = 1;
  explanationSteps.innerHTML = "";

  if (typeof result === "number") {
    if (result === 0) {
      explanation.push("Passo 1: O resultado é zero.");
    } else if (result > 0) {
      explanation.push(`Passo 1: O resultado é positivo (${result}).`);
    } else {
      explanation.push(`Passo 1: O resultado é negativo (${result}).`);
    }

    if (Number.isInteger(result)) {
      explanation.push("Passo 2: O resultado é um número inteiro.");
    } else {
      explanation.push("Passo 2: O resultado é um número decimal.");
    }

    if (result > 0) {
      explanation.push(`Passo 3: O resultado é maior que zero.`);
    } else if (result < 0) {
      explanation.push(`Passo 3: O resultado é menor que zero.`);
    } else {
      explanation.push(`Passo 3: O resultado é igual a zero.`);
    }

    // Adicionar explicações para funções trigonométricas
    if (display.value.includes("sin(")) {
      explanation.push("Passo 4: O resultado é o seno do ângulo fornecido.");
    } else if (display.value.includes("cos(")) {
      explanation.push("Passo 4: O resultado é o cosseno do ângulo fornecido.");
    } else if (display.value.includes("tan(")) {
      explanation.push("Passo 4: O resultado é a tangente do ângulo fornecido.");
    }

    // Adicionar explicações para logaritmos
    if (display.value.includes("log(")) {
      explanation.push("Passo 5: O resultado é o logaritmo do número fornecido.");
    } else if (display.value.includes("ln(")) {
      explanation.push("Passo 5: O resultado é o logaritmo natural do número fornecido.");
    }

    // Adicionar explicações para exponenciais
    if (display.value.includes("exp(")) {
      explanation.push("Passo 6: O resultado é a exponencial do número fornecido.");
    }

    // Adicionar explicações para raiz quadrada
    if (display.value.includes("sqrt(")) {
      explanation.push("Passo 7: O resultado é a raiz quadrada do número fornecido.");
    }

  } else {
    explanation.push("O cálculo não resultou em um valor numérico.");
  }

  let explanationBox = document.getElementById("explanationBox");
  explanationBox.innerHTML = "<h3>Explicação do cálculo:</h3>";

  explanation.forEach((step) => {
    let paragraph = document.createElement("p");
    paragraph.textContent = step;
    explanationBox.appendChild(paragraph);
    addExplanationStep(step);
  });

  explanationSteps.classList.add("show");
}