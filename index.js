//@ts-check
"use strict"
const root = /**@type {HTMLDivElement}*/(document.getElementById("root"))
const display = /**@type {HTMLParagraphElement}*/(document.getElementById("display"))

// isolate mutable state
{
	const op_or_group = new Set("()<>+-*/.")

	/**
	Expression. Mostly mirrors display
	*/
	let xpr = ""

	/**
	@param {string} b
	*/
	const handle_any_button_or_key = b => {
		if ((b >= "0" && b <= "9") || op_or_group.has(b)) {
			if (xpr.length > 16) return;
			display.textContent = xpr += b
			return
		}
		if (b == "c" || b == "C") {
			display.textContent = xpr = ""
			return
		}
		if (b == "=")
			try {
				// indirect is safer and faster
				xpr = (eval)?.(xpr).toString();
				if (xpr == "NaN") {
					xpr = "";
					display.textContent = "undefined";
				} else
					display.textContent = xpr;
			} catch (err) {
				xpr = "";
				// some error messages can be too long,
				// or might have misleading info in this context,
				// so show generic msg
				display.textContent = "error!";
			}
		// ignore invalid input
	}

	root.addEventListener("click", e => {
		const el = /**@type {HTMLDivElement|HTMLParagraphElement|HTMLButtonElement|HTMLBRElement}*/(
			e.target
		)
		if (el.tagName == "P") return
		handle_any_button_or_key(el.textContent)
	})

	root.addEventListener("keydown", e => {
		handle_any_button_or_key(e.key)
	})
}
