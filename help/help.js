/*
	Initiates variables
*/
var lock;
var modal;
var modalContent;
var buttons;
var input;
var inputCode;
var inputLock;
var key = 1; //Math.floor(Math.random() * 1000000000000000);


/*
	On load
*/
window.addEventListener("load", function() {
	lock = document.getElementById("lock");
	modal = document.getElementById("modal");
	modalContent = document.getElementById("modal-content");
	buttons = document.getElementsByClassName("button");
	input = document.getElementById("input");
	inputCode = document.getElementById("input-code");
	inputLock = document.getElementById("input-lock");

	//If not Chrome, hide lock
	if (navigator.userAgent.indexOf("Chrome") == -1) {
		lock.style.display = "none";
	}

	//Adds event listeners
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener("click", keypress);
	}

	//Displays modal
	lock.addEventListener("click", function() {
		modal.style.display = "block";
	});

	//Hides modal
	window.addEventListener("click", function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
			inputCode.innerHTML = "";
		}
	});
});


/*
	Enter code
*/
function keypress(event) {

	//Enter
	if (event.target.id == "enter") {
		if (inputCode.innerHTML == key) {
			input.style.backgroundColor = "green";
			inputLock.className = "fa fa-unlock";
			modalContent.style.borderColor = "green";

			setTimeout(secret, 1000);
		} else {
			inputLock.classList.add("shake");
			setTimeout(function() {
				inputLock.classList.remove("shake");
			}, 500);
		}

	//Backspace
	} else if (event.target.id == "backspace") {
		inputCode.innerHTML = inputCode.innerHTML.slice(0, -1);

	//Keypress
	} else if (inputCode.innerHTML.length < 15) {
		inputCode.innerHTML += event.target.innerHTML;
	}
}


/*
	Secret function
*/
function secret() {

	//Resets style
	input.style.backgroundColor = "red";
	inputLock.className = "fa fa-lock";
	modalContent.style.borderColor = "red";
	
	//Executes secret
	
}