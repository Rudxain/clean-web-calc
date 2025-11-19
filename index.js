let calc = "";

function updateDisplay(text) {
	document.getElementById("display").innerHTML = text;
}

function input(value) {
	if (calc.length > 16) return;
	calc += value;
	updateDisplay(calc);
}

function calculate() {
	try {
		calc = eval(calc).toString();
	} catch (err) {
		calc = "error";
	}
	updateDisplay(calc);
}

function displayClear() {
	calc = "";
	updateDisplay("");
}