import React, { useState } from "react";

import styles from "./app.module.css";

const NUMS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function App() {
	const [operand1, setOperand1] = useState("");
	const [operator, setOperator] = useState("");
	const [operand2, setOperand2] = useState("");
	const [result, setResult] = useState(null);

	const handleNumberClick = (num) => {
		if (result !== null) {
			// Если результат присутствует, сбрасываем состояние при вводе нового числа
			setOperand1(num);
			setOperand2("");
			setOperator("");
			setResult(null);
		} else if (operator === "") {
			setOperand1(operand1 + num);
		} else {
			setOperand2(operand2 + num);
		}
	};

	const handleOperatorClick = (op) => {
		if (op === "C") {
			setOperand1("");
			setOperand2("");
			setOperator("");
			setResult(null);
			return;
		}

		if (operator === "") {
			setOperator(op);
		}
	};

	const handleResultClick = () => {
		if (operand1 && operator && operand2) {
			const num1 = parseInt(operand1);
			const num2 = parseInt(operand2);
			let res;

			if (operator === "+") {
				res = num1 + num2;
			} else if (operator === "-") {
				res = num1 - num2;
			}

			setResult(res);
			setOperand1(""); // Если хотите обнулить operand1 после результата
			setOperand2("");
			setOperator("");
		}
	};

	return (
		<div className={styles.calculator}>
			<div className={styles.display}>
				{result !== null ? (
					<span className={styles.result}>{result}</span>
				) : (
					`${operand1} ${operator} ${operand2}`
				)}
			</div>
			<div className={styles.buttons}>
				{NUMS.map((num) => (
					<button key={num} onClick={() => handleNumberClick(num)}>
						{num}
					</button>
				))}
				<button onClick={() => handleOperatorClick("+")}>+</button>
				<button onClick={() => handleOperatorClick("-")}>-</button>
				<button onClick={handleResultClick}>=</button>
				<button onClick={() => handleOperatorClick("C")}>C</button>
			</div>
		</div>
	);
}
