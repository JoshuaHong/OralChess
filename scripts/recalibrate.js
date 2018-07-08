var grammars = ["knight", "bishop", "rook", "queen", "king",
				"a takes", "a",
				"b takes", "b",
				"c takes", "c",
				"d takes", "d",
				"e takes", "e",
				"f takes", "f",
				"g takes", "g",
				"h takes", "h",
				"a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8",
				"b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8",
				"c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8",
				"d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8",
				"e1", "e2", "e3", "e4", "e5", "e6", "e7", "d8",
				"f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8",
				"g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8",
				"h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8"];

var commands = ["N", "B", "R", "Q", "K",
				"a", "b", "c", "d", "e", "f", "g", "h",
				"a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8",
				"b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8",
				"c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8",
				"d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8",
				"e1", "e2", "e3", "e4", "e5", "e6", "e7", "d8",
				"f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8",
				"g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8",
				"h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8"];

var isChrome;
var addonIsEnabled;
var blindfoldIsEnabled;
var confirmationIsEnabled;
var textToSpeechIsEnabled;

var recognition = new webkitSpeechRecognition();
recognition.lang = 'en-US';
var end = false;

var msg = new SpeechSynthesisUtterance();
var voices = speechSynthesis.getVoices();
msg.voiceURI = 'native';
msg.volume = 1; // 0 to 1
msg.rate = 2; // 0.1 to 2
msg.pitch = 1; //0 to 2]
msg.lang = 'en-US';

chrome.storage.local.get(null, function(item) {
	isChrome = item.isChrome;
	addonIsEnabled = item.addonIsEnabled;
	blindfoldIsEnabled = item.blindfoldIsEnabled;
	confirmationIsEnabled = item.confirmationIsEnabled;
	textToSpeechIsEnabled = item.textToSpeechIsEnabled;

	if (isChrome) {
		if (addonIsEnabled) {
			recognition.start();
		}

		if (document.querySelector("#lichess") != null && blindfoldIsEnabled) {
			setTimeout(function() {
				enableBlindfold();
			}, 500);
		}
	}
});

recognition.onresult = function(event) {
	if (event.results.length > 0) {
		var end = false;
		var command = event.results[0][0].transcript;
		console.log(command);

		if (document.querySelector("#lichess") != null && document.querySelector(".ready") != null) {
			command = getCommand(command);

			if (command == "takeback" && document.querySelector(".takeback-yes") != null) {
				document.querySelector(".takeback-yes").click();
			} else if (command == "draw" && (document.querySelector(".draw-yes") != null || document.querySelector(".yes") != null)) {
				document.querySelector(".draw-yes").click();
				document.querySelector(".yes").click();
			} else if (command == "resign" && document.querySelector(".resign-confirm") != null || document.querySelector(".yes") != null) {
				document.querySelector(".resign-confirm").click();
				document.querySelector(".yes").click();
			} else if (command == "abort" && document.querySelector(".abort") != null) {
				document.querySelector(".abort").click();
			} else if (command == "rematch" && document.querySelector(".rematch") != null) {
				document.querySelector(".rematch").click();
			} else if (command == "button" && document.querySelector(".button") != null) {
				document.querySelector(".button").click();
			} else if (command == "analysis" && document.querySelector(".analysis") != null) {
				document.querySelector(".analysis").click();
			} else if (command == "zen" && document.querySelector(".fbt") != null) {
				document.querySelector(".fbt").click();
			} else if (command == "new" && document.querySelectorAll(".button")[1] != null) {
				document.querySelectorAll(".button")[1].click();
			} else if (command == "give" && document.querySelector(".moretime") != null) {
				document.querySelector(".moretime").click();
			} else if (command == "blindfold") {
				if (blindfoldIsEnabled) {
					disableBlindfold();
					chrome.storage.local.set({
						blindfoldIsEnabled: false
					});
					blindfoldIsEnabled = false;
				} else {
					enableBlindfold();
					chrome.storage.local.set({
						blindfoldIsEnabled: true
					});
					blindfoldIsEnabled = true;
				}
			} else if (command == "0-0") {
				if (document.querySelector(".orientation-black") != null && canCastle()) {
					document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':13,'which':13}));
					document.querySelector(".ready").value = "e8";
					document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':13,'which':13}));
					document.querySelector(".ready").value = "g8";
					document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':13,'which':13}));
				} else if (canCastle()) {
					document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':13,'which':13}));
					document.querySelector(".ready").value = "e1";
					document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':13,'which':13}));
					document.querySelector(".ready").value = "g1";
					document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':13,'which':13}));
				}
			} else if (command == "0-0-0") {
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':13,'which':13}));
				document.querySelector(".ready").value = command;
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':13,'which':13}));
			} else if (command == "0") {
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':13,'which':13}));
				document.querySelector(".ready").value = "0-0";
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':13,'which':13}));

				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':13,'which':13}));
				document.querySelector(".ready").value = "0-0-0";
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':13,'which':13}));
			} else if (command == "beginning") {
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':9,'which':9}));
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':38,'which':38}));
			} else if (command == "backward") {
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':9,'which':9}));
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':37,'which':37}));
			} else if (command == "forward") {
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':9,'which':9}));
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':39,'which':39}));
			} else if (command == "end") {
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':9,'which':9}));
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':40,'which':40}));
			} else if (command == "Q") {
				for (var i = 0; i < document.querySelectorAll(".queen").length; i++) {
					document.querySelectorAll(".queen")[i].click();
				}
			} else if (command == "N") {
				for (var i = 0; i < document.querySelectorAll(".knight").length; i++) {
					document.querySelectorAll(".knight")[i].click();
				}
			} else if (command == "R") {
				for (var i = 0; i < document.querySelectorAll(".rook").length; i++) {
					document.querySelectorAll(".rook")[i].click();
				}
			} else if (command == "B") {
				for (var i = 0; i < document.querySelectorAll(".bishop").length; i++) {
					document.querySelectorAll(".bishop")[i].click();
				}
			} else if (command != "") {
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':13,'which':13}));
				document.querySelector(".ready").value = command;
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':13,'which':13}));
			}
		}
	}
}

recognition.onend = function() {
	if (end) {
		console.log("ACTUAL END");
		recognition.stop();
	} else {
		console.log("RESTARTING");
		recognition.start();
	}
}

recognition.onerror = function(event) {
	console.log("Error occurred in recognition: " + event.error);
}

window.addEventListener('focus', function() {
	if (addonIsEnabled) {
		console.log("FOCUS");
		end = false;
		recognition.start();
	}
});

window.addEventListener('blur', function() {
	console.log("BLUR");
	end = true;
	recognition.stop();
});

chrome.storage.onChanged.addListener(function() {
	chrome.storage.local.get(null, function(item) {
		isChrome = item.isChrome;
		addonIsEnabled = item.addonIsEnabled;
		blindfoldIsEnabled = item.blindfoldIsEnabled;
		confirmationIsEnabled = item.confirmationIsEnabled;
		textToSpeechIsEnabled = item.textToSpeechIsEnabled;

		if (blindfoldIsEnabled) {
			enableBlindfold();
		} else {
			disableBlindfold();
		}
	});
});

function getCommand(command) {
	var command = command;
	command = command.toLowerCase();

	if (command.includes("take back")) {
		return "takeback";
	} else if (command.includes("claim") || command.includes("cancel")) {
		return "button";
	} else if (command.includes("draw")) {
		return "draw";
	} else if (command.includes("resign")) {
		return "resign";
	} else if (command.includes("abort")) {
		return "abort";
	} else if (command.includes("rematch")) {
		return "rematch";
	} else if (command.includes("confirm")) {
		return "confirm";
	} else if (command.includes("analysis")) {
		return "analysis";
	} else if (command.includes("zen")) {
		return "zen";
	} else if (command.includes("beginning")) {
		return "beginning";
	} else if (command.includes("backward")) {
		return "backward";
	} else if (command.includes("forward")) {
		return "forward";
	} else if (command.includes("end")) {
		return "end";
	} else if (command.includes("new")) {
		return "new";
	} else if (command.includes("give")) {
		return "give";
	} else if (command.includes("castle")) {
		if (command.includes("king side")) {
			return "0-0";
		} else if (command.includes("queen side")) {
			return "0-0-0";
		} else {
			return "0";
		}
	} else if (command.includes("blindfold")) {
		return "blindfold";
	}

	for (var i = 0; i < grammars.length; i++) {
		switch (true) {
			case (i <= grammars.indexOf("knight")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'N');
				break;
			case (i <= grammars.indexOf("bishop")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'B');
				break;
			case (i <= grammars.indexOf("rook")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'R');
				break;
			case (i <= grammars.indexOf("queen")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'Q');
				break;
			case (i <= grammars.indexOf("king")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'K');
				break;
			case (i <= grammars.indexOf("a")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'a');
				break;
			case (i <= grammars.indexOf("b")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'b');
				break;
			case (i <= grammars.indexOf("c")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'c');
				break;
			case (i <= grammars.indexOf("d")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'd');
				break;
			case (i <= grammars.indexOf("e")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'e');
				break;
			case (i <= grammars.indexOf("f")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'f');
				break;
			case (i <= grammars.indexOf("g")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'g');
				break;
			case (i <= grammars.indexOf("h")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'h');
				break;
			case (i <= grammars.indexOf("a1")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'a1');
				break;
			case (i <= grammars.indexOf("a2")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'a2');
				break;
			case (i <= grammars.indexOf("a3")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'a3');
				break;
			case (i <= grammars.indexOf("a4")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'a4');
				break;
			case (i <= grammars.indexOf("a5")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'a5');
				break;
			case (i <= grammars.indexOf("a6")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'a6');
				break;
			case (i <= grammars.indexOf("a7")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'a7');
				break;
			case (i <= grammars.indexOf("a8")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'a8');
				break;
			case (i <= grammars.indexOf("b1")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'b1');
				break;
			case (i <= grammars.indexOf("b2")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'b2');
				break;
			case (i <= grammars.indexOf("b3")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'b3');
				break;
			case (i <= grammars.indexOf("b4")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'b4');
				break;
			case (i <= grammars.indexOf("b5")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'b5');
				break;
			case (i <= grammars.indexOf("b6")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'b6');
				break;
			case (i <= grammars.indexOf("b7")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'b7');
				break;
			case (i <= grammars.indexOf("b8")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'b8');
				break;
			case (i <= grammars.indexOf("c1")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'c1');
				break;
			case (i <= grammars.indexOf("c2")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'c2');
				break;
			case (i <= grammars.indexOf("c3")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'c3');
				break;
			case (i <= grammars.indexOf("c4")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'c4');
				break;
			case (i <= grammars.indexOf("c5")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'c5');
				break;
			case (i <= grammars.indexOf("c6")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'c6');
				break;
			case (i <= grammars.indexOf("c7")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'c7');
				break;
			case (i <= grammars.indexOf("c8")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'c8');
				break;
			case (i <= grammars.indexOf("d1")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'd1');
				break;
			case (i <= grammars.indexOf("d2")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'd2');
				break;
			case (i <= grammars.indexOf("d3")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'd3');
				break;
			case (i <= grammars.indexOf("d4")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'd4');
				break;
			case (i <= grammars.indexOf("d5")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'd5');
				break;
			case (i <= grammars.indexOf("d6")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'd6');
				break;
			case (i <= grammars.indexOf("d7")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'd7');
				break;
			case (i <= grammars.indexOf("d8")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'd8');
				break;
			case (i <= grammars.indexOf("e1")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'e1');
				break;
			case (i <= grammars.indexOf("e2")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'e2');
				break;
			case (i <= grammars.indexOf("e3")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'e3');
				break;
			case (i <= grammars.indexOf("e4")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'e4');
				break;
			case (i <= grammars.indexOf("e5")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'e5');
				break;
			case (i <= grammars.indexOf("e6")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'e6');
				break;
			case (i <= grammars.indexOf("e7")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'e7');
				break;
			case (i <= grammars.indexOf("e8")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'e8');
				break;
			case (i <= grammars.indexOf("f1")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'f1');
				break;
			case (i <= grammars.indexOf("f2")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'f2');
				break;
			case (i <= grammars.indexOf("f3")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'f3');
				break;
			case (i <= grammars.indexOf("f4")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'f4');
				break;
			case (i <= grammars.indexOf("f5")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'f5');
				break;
			case (i <= grammars.indexOf("f6")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'f6');
				break;
			case (i <= grammars.indexOf("f7")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'f7');
				break;
			case (i <= grammars.indexOf("f8")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'f8');
				break;
			case (i <= grammars.indexOf("g1")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'g1');
				break;
			case (i <= grammars.indexOf("g2")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'g2');
				break;
			case (i <= grammars.indexOf("g3")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'g3');
				break;
			case (i <= grammars.indexOf("g4")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'g4');
				break;
			case (i <= grammars.indexOf("g5")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'g5');
				break;
			case (i <= grammars.indexOf("g6")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'g6');
				break;
			case (i <= grammars.indexOf("g7")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'g7');
				break;
			case (i <= grammars.indexOf("g8")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'g8');
				break;
			case (i <= grammars.indexOf("h1")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'h1');
				break;
			case (i <= grammars.indexOf("h2")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'h2');
				break;
			case (i <= grammars.indexOf("h3")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'h3');
				break;
			case (i <= grammars.indexOf("h4")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'h4');
				break;
			case (i <= grammars.indexOf("h5")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'h5');
				break;
			case (i <= grammars.indexOf("h6")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'h6');
				break;
			case (i <= grammars.indexOf("h7")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'h7');
				break;
			case (i <= grammars.indexOf("h8")):
				command = command.replace(new RegExp(grammars[i], 'g'), 'h8');
				break;
		}
	}

	command = command.split(" ");

	for (var i = 0; i < command.length; i++) {
		if (!isCommand(command[i])) {
			command.splice(i, 1);
			i--;
		}
	}

	command = command.slice(command.length - 2, command.length);
	command = command.join("");

	return command;
}

function isCommand(command) {
	for (var i = 0; i < commands.length; i++) {
		if (command == commands[i]) {
			return true;
		}
	}
    
	return false;
}

function canCastle() {
	if (document.querySelector(".orientation-black") != null) {
		if (document.querySelector(".king").style.transform == "translate(192px, 448px)") {
			return true;
		} else {
			return false;
		}
	} else {
		if (document.querySelectorAll(".king")[1].style.transform == "translate(256px, 448px)") {
			return true;
		} else {
			return false;
		}
	}
}

function enableBlindfold() {
	for (var i = 0; i < document.querySelectorAll(".pawn").length; i++) {
		document.querySelectorAll(".pawn")[i].style.display = "none";
	}
	for (var i = 0; i < document.querySelectorAll(".knight").length; i++) {
		document.querySelectorAll(".knight")[i].style.display = "none";
	}
	for (var i = 0; i < document.querySelectorAll(".bishop").length; i++) {
		document.querySelectorAll(".bishop")[i].style.display = "none";
	}
	for (var i = 0; i < document.querySelectorAll(".rook").length; i++) {
		document.querySelectorAll(".rook")[i].style.display = "none";
	}
	for (var i = 0; i < document.querySelectorAll(".queen").length; i++) {
		document.querySelectorAll(".queen")[i].style.display = "none";
	}
	document.querySelectorAll(".king")[0].style.display = "none";
	document.querySelectorAll(".king")[1].style.display = "none";
}

function disableBlindfold() {
	for (var i = 0; i < document.querySelectorAll(".pawn").length; i++) {
		document.querySelectorAll(".pawn")[i].style.display = "block";
	}
	for (var i = 0; i < document.querySelectorAll(".knight").length; i++) {
		document.querySelectorAll(".knight")[i].style.display = "block";
	}
	for (var i = 0; i < document.querySelectorAll(".bishop").length; i++) {
		document.querySelectorAll(".bishop")[i].style.display = "block";
	}
	for (var i = 0; i < document.querySelectorAll(".rook").length; i++) {
		document.querySelectorAll(".rook")[i].style.display = "block";
	}
	for (var i = 0; i < document.querySelectorAll(".queen").length; i++) {
		document.querySelectorAll(".queen")[i].style.display = "block";
	}
	document.querySelectorAll(".king")[0].style.display = "block";
	document.querySelectorAll(".king")[1].style.display = "block";
}

var observer = new MutationObserver(function(mutations) {
	if (document.querySelector(".result_wrap") != null) {
		msg.text = "Game Over";
	} else {
		if (document.querySelectorAll("move")[document.querySelectorAll("move").length - 1].innerHTML == "") {
			msg.text = document.querySelectorAll("move")[document.querySelectorAll("move").length - 2].innerHTML;
		} else {
			msg.text = document.querySelectorAll("move")[document.querySelectorAll("move").length - 1].innerHTML;
		}
	}

	speechSynthesis.speak(msg);
});

setTimeout(function() {
	if (document.querySelector(".moves") != null) {
		observer.observe(document.querySelector(".moves"), {attributes: true, childList: true, characterData: true});
	}
}, 500);









/*
https://codepen.io/matt-west/pen/wGzuJ
*/