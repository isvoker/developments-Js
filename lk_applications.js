(function (d, $, S) {
	"use strict";
	const controller = "contenders.d";
	const saveDraft = d.getElementById("saveDraft");
	const send = d.getElementById("send");

	function switchStage() {
		const stages = d.querySelectorAll(".account-stages__link");
		const lastStages = d.querySelector(".account-stages");
		lastStages.lastChild.classList.add("active");
		d.forms[stages.length - 1].classList.remove("hide");
		stages.forEach((element) => {
			element.addEventListener("click", function (e) {
				e.preventDefault();
				stages.forEach((element) => {
					element.classList.remove("active");
					d.forms[element.dataset.stages].classList.add("hide");
				});
				element.classList.add("active");
				d.forms[element.dataset.stages].classList.remove("hide");
			});
		});
	}
	switchStage();
	function setInputRestrictions() {
		const input = document.querySelectorAll(".setInputRestrictions");
		for (let item of input) {
			item.value = item.value.replace(/[^0-9\.\,]/g, "");
		}
	}
	// удаление строки
	function removeLine() {
		const remove = document.querySelectorAll(".button_remove_line");
		remove.forEach(element => {
			element.addEventListener("click", function (event) {
				event.preventDefault();			
				element.closest(".createTr").remove();
				totalAmount();
			});
		});
	}
	// Подсчет суммы
	function totalAmount() {
		const total = document.querySelectorAll(".total");
		let input;
		let output;
		for (let elem of total) {
			let dataName = elem.dataset.total;
			switch (dataName) {
			case "outlay":
				input = document.querySelectorAll(".totalOutlay");
				output = document.querySelector(".totalSumm_outlay");
				int();
				break;
			case "financing_other":
				input = document.querySelectorAll(".totalFinancing_other");
				output = document.getElementById("financing_other_summ");
				int();
				break;
			case "column_three":
				output = document.getElementById("column_three");
				input = document.querySelectorAll('[data-total="column_three"]');
				int();
				break;
			case "column_four":
				output = document.getElementById("column_four");
				input = document.querySelectorAll('[data-total="column_four"]');
				int();
				break;

			case "column_six":
				output = document.getElementById("column_six");
				input = document.querySelectorAll('[data-total="column_six"]');
				int();
				break;

			case "third_column":
				output = document.getElementById("third_column");
				input = document.querySelectorAll('[data-total="third_column"]');
				console.log(input);
				int();
				break;

			case "fourth_column":
				output = document.getElementById("fourth_column");
				input = document.querySelectorAll('[data-total="fourth_column"]');
				int();
				break;
			case "fifth_column":
				output = document.getElementById("fifth_column");
				input = document.querySelectorAll('[data-total="fifth_column"]');
				int();
				break;
			case "sixth_column":
				output = document.getElementById("sixth_column");
				input = document.querySelectorAll('[data-total="sixth_column"]');
				int();
				break;
			}
		}
		// int();
		function int() {					
			input = Array.from(input);
			let result = input.map(function (ele) {
				let age = Number(ele.innerHTML) || Number(ele.value);
				return age;
			});
			let reduce = result.reduce(function (a, b) {
				return a + b;
			}, 0);
			output.value = reduce.toFixed(2);
			output.innerHTML = reduce.toFixed(2);			
		}
	}
	// Добавление строки
	function create() {
		let line = document.querySelector(".line");
		let empty = "";
		let tr = document.createElement("tr");
		tr.setAttribute("class", "createTr");
		tr.setAttribute("id", "newTr");
		let button__close = '<button class="button_remove_line"> </button>';

		for (let i = 0; i < 4; i++) {
			let td = `<td contenteditable class="financing_input">`;
			let input = ``;
			switch (i) {
				case 0:
					input = `<input class="input metaTable_input" name ='name'></input>`;
					break;
				case 1:
					input = `<input class="input setInputRestrictions metaTable_input" name ='quality'></input>`;
					break;

				case 2:
					input = `<input class="input setInputRestrictions metaTable_input" name ='price'></input>`;
					break;

				case 3:
					td = `<td class="financing_input">`;
					input = `<input readonly='readonly' class="totalOutlay total input setInputRestrictions metaTable_input" name ='amount' data-total="outlay"></input>`;
					break;
			}
			empty += td + input + `</td>`;
		}
		tr.innerHTML += empty + button__close;
		line.before(tr);
		return tr;
	}
	// таблица (1)
	outlayy();
	function outlayy() {
		try {
			let button = document.getElementById("button");
			button.addEventListener("click", function (e) {
				e.preventDefault();
				let tr = create();
				tr.oninput = function sum() {
					setInputRestrictions();
					let one = tr.childNodes[1].childNodes[0].value;
					let two = tr.childNodes[2].childNodes[0].value;
					let summa = tr.childNodes[3].childNodes[0];
					let sums = one * two;
					summa.value = sums.toFixed(2);
					totalAmount(document.getElementById("tableOutlay"));
				};
				removeLine();
			});
		} catch(e) { }
	}
	// таблица (2)
	financing();
	function financing() {
		try {
			const finance = document.getElementById("table_finance"),
			co_financing = document.getElementById("co-financing"),
			co_percent = document.getElementById("co-percent"),
			all__financing = document.getElementById("all__financing"),
			all__percent = document.getElementById("all__percent");

			let all__finance = document.querySelectorAll(".input__finance");
			let projectAmount_percent = document.querySelectorAll(
				".projectAmount_percent"
			);
			let input__finance = document.querySelectorAll(".input__finance");
			all__finance = Array.from(all__finance);
			all__finance.map(function (ele) {
				ele.oninput = function action() {
					setInputRestrictions();
					co_financing.innerHTML = input__finance[0].value;
					let result = all__finance.map(function (x) {
						let age = Number(x.value);
						return age;
					});
					let reduce = result.reduce(function (a, b) {
						return a + b;
					});
					all__percent.innerHTML = reduce !== 0 ? "100" : "";
					all__financing.innerHTML =
						reduce.toFixed(2) !== "0.00" ? reduce.toFixed(2) : "";
					percents();
					function percents() {
						let percent;
						for (let i = 0; i < input__finance.length; i++) {
							projectAmount_percent[i].value = (
								(input__finance[i].value * 100) /
								reduce
							).toFixed(2);
							percent = projectAmount_percent[0].value = (
								(input__finance[0].value * 100) /
								reduce
							).toFixed(2);
							if (percent === "NaN") {
								percent = "";
							}
							if (projectAmount_percent[i].value === "NaN") {
								projectAmount_percent[i].value = "";
							}
						}
						co_percent.innerHTML = percent;
					}
				};
			});
		} catch(e) { }
	}
	//                                                                                                      --таблица 3 --
	financing_other()
	function financing_other() {
		try {
			let button = document.getElementById("buttons");
			let line = document.getElementById("linee");
			button.onclick = function click(e) {
				e.preventDefault();
				function create__three() {
					let empty = "";
					let tr = document.createElement("tr");
					tr.setAttribute("class", "createTr");
					let button__close = '<button class="button_remove_line"> </button>';
					for (let i = 0; i < 2; i++) {
						let td = `<td contenteditable class='financing_input'>`;
						let input = ``;
						if (i == 0) {
							input = `<input type ='text'name ='name' class="metaTable_input_financing_other"></input>`;
						}
						if (i == 1) {
							input = `<input name ='amount' class="allS setInputRestrictions metaTable_input_financing_other totalFinancing_other total" data-total="financing_other"></input>`;
						}
						empty += td + input + `</td>`;
					}
					tr.innerHTML += empty + button__close;
					line.before(tr);
					return tr;
				}
				let tr = create__three();
				tr.oninput = function sum() {
					setInputRestrictions();
					totalAmount();
				};
				removeLine();
			};
		} catch(e) { }
	}
	//                                                                                                        --таблица 4 --
	financing_report();
	function financing_report() {
		try {
			let button = document.getElementById("third_button");
			let line = document.getElementById("third_line");
			button.onclick = function click() {
				function create() {
					let empty = "";
					let tr = document.createElement("tr");
					tr.setAttribute("class", "createTr");
					let button__close = '<button class="button_remove_line"> </button>';
					creation();
					function creation() {
						for (let i = 0; i < 9; i++) {
							let td = `<td >`;
							let input = `<input></input>`;
							if (i == 0 || i == 1 || i == 2 || i == 6 || i == 8) {
								input =
									"<input type='text' name ='input' class='metaTable_input'></input>";
							}
							switch (i) {
								case 0:
									input = ``;
									break;
	
								case 3:
									input = `<input class = 'allS setInputRestrictions metaTable_input total' data-total='third_column' name ='input'></>`;
									break;
								case 4:
									input = `<input class = 'allS setInputRestrictions metaTable_input total' data-total='fourth_column' name ='input'></input>`;
									break;
								case 5:
									input = `<input class = 'allS setInputRestrictions metaTable_input total' data-total='fifth_column' name ='input'></input>`;
									break;
								case 7:
									input = `<input class = 'allS setInputRestrictions metaTable_input total' data-total='sixth_column' name ='input'></input>`;
									break;
							}
							empty += td + input + `</td>`;
						}
					}
					tr.innerHTML += empty + button__close;
					line.before(tr);
					return tr;
				}
				let tr = create();
				tr.oninput = function sum() {
					totalAmount();
				};
				removeLine();
			};
		} catch(e) { }
	}
	//                                                                                                        --таблица 5 --	
	jobs_report()
	function jobs_report() {
		try {
			let button = document.getElementById("fourth_button");
			let line = document.getElementById("fourth_line");
			let number = 1
			button.addEventListener("click", function (e) {
				e.preventDefault();
				function create() {
				let empty = "";
				let tr = document.createElement("tr");
				tr.setAttribute("class", "createTr");
				let button__close = '<button class="button_remove_line"> </button>';
				creation();
				function creation() {
				  for (let i = 0; i < 8; i++) {
					let td = `<td> `;
					let input = `<input type ='text' name ='input' class="metaTable_input"> </input>`;
					switch (i) {
					  case 0:
						input = `${number}`;
						break;
					  case 3:
						input = `<input class = 'allS setInputRestrictions total metaTable_input' data-total='column_three'name ='input'></input>`;
						break;
		
					  case 4:
						input = `<input class = 'allS setInputRestrictions total metaTable_input' data-total='column_four' name ='input'></input>`;
						break;
		
					  case 6:
						input = `<input class = 'allS setInputRestrictions total metaTable_input' data-total='column_six' name ='input'></input>`;
						break;
					}
					empty += td + input + `</td>`;
				  }
				}
				tr.innerHTML += empty + button__close;
				line.before(tr);
				return tr;
			  }
			  let tr = create();
			  tr.oninput = function sum() {
				totalAmount()
			  };
			  removeLine();
			  number ++
			});
		} catch(e) { }
	  }
})(document, jQuery, Sensei);
