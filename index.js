"use strict";
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
		if (calc == "NaN") {
			calc = "";
			updateDisplay("undefined");
		} else 
			updateDisplay(calc);
	} catch (err) {
		calc = "";
		updateDisplay("error");
	}
}

function displayClear() {
	calc = "";
	updateDisplay("");
}