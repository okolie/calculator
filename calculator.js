class Calculator {
	constructor(previousOutputTextElement, currentOutputTextElement) {
		this.previousOutputTextElement = previousOutputTextElement;
		this.currentOutputTextElement = currentOutputTextElement;
		this.clear();
		this.resetFlag = false;
	}

	clear() {
		this.currentOperand = "";
		this.previousOperand = "";
		this.operation = undefined;
	}

	delete() {
		// this.currentOperand = this.currentOperand
		// 	.toString()
		// 	.slice(0, this.currentOperand.length - 1);
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	appendNumber(numberString) {
		if (numberString === "." && this.currentOperand.includes(".")) return;
		this.currentOperand =
			this.currentOperand.toString() + numberString.toString();
	}
	chooseOperation(operationString) {
		if (this.currentOperand === "") return;
		if (this.previousOperand !== "") {
			this.compute();
		}
		this.operation = operationString;
		this.previousOperand = this.currentOperand;
		this.currentOperand = "";
	}
	compute() {
		let computation;
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);
		if (isNaN(prev) || isNaN(current)) return;

		switch (this.operation) {
			case "+":
				computation = prev + current;
				break;
			case "−":
				computation = prev - current;
				break;
			case "÷":
				computation = prev / current;
				break;
			case "×":
				computation = prev * current;
				break;
			default:
				return;
		}
		this.resetFlag = true;
		this.currentOperand = computation;
		this.operation = undefined;
		this.previousOperand = "";
	}

	getDisplayNumber(numberString) {
		const stringNumber = numberString.toString();
		const integerNumber = parseFloat(stringNumber.split(".")[0]);
		const decimalNumber = stringNumber.split(".")[1];
		let integerDisplay;

		if (isNaN(integerNumber)) {
			integerDisplay = "";
		} else {
			integerDisplay = integerNumber.toLocaleString("en", {
				maximumFractionDigits: 0,
			});
		}

		if (decimalNumber != null) {
			return `${integerDisplay}.${decimalNumber}`;
		} else {
			return integerDisplay;
		}
	}

	updateDisplay() {
		// this.currentOutputTextElement.innerText = this.currentOperand;

		this.currentOutputTextElement.innerText = this.getDisplayNumber(
			this.currentOperand
		);
		// this.previousOutputTextElement.innerText = this.previousOperand;

		if (this.operation != null) {
			this.previousOutputTextElement.innerText = `${this.getDisplayNumber(
				this.previousOperand
			)}  ${this.operation}`;
		} else {
			this.previousOutputTextElement.innerText = "";
		}
	}
}

const numberButtons = document.querySelectorAll("[data-number]");

const operationButtons = document.querySelectorAll("[data-operation]");

const clearButton = document.querySelector("[data-clear]");

const equalsButton = document.querySelector("[data-equals]");

const deleteButton = document.querySelector("[data-delete]");

const currentOutputTextElement = document.querySelector("[data-current]");

const previousOutputTextElement = document.querySelector("[data-previous]");

const calculator = new Calculator(
	previousOutputTextElement,
	currentOutputTextElement
);

numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		if (
			calculator.previousOperand === "" &&
			calculator.currentOperand != "" &&
			calculator.resetFlag
		) {
			calculator.currentOperand = "";
			calculator.resetFlag = false;
		}
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

operationButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});

clearButton.addEventListener("click", () => {
	calculator.clear();
	calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
	calculator.delete();
	calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
	calculator.compute();
	calculator.updateDisplay();
});
