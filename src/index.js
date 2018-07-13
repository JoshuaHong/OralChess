var grammars = ["knight", "N",
				 "bishop", "B",
				 "rook", "R",
				 "queen", "Q",
				 "king", "K",
				"a", "b", "c", "d", "e", "f", "g", "h",
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

var theme = {
	DEFAULT: "default",
	SUCCESS: "success",
	WARNING: "warning",
	ERROR: "error"
};

var isChrome;
var isLichess;
var addonIsEnabled;
var blindfoldIsEnabled;
var confirmationIsEnabled;
var notificationIsEnabled;
var textToSpeechIsEnabled;
var previousCommand;

if (window.location.href.indexOf("lichess.org") != -1) {
	isLichess = true;
}

var recognition = new webkitSpeechRecognition();
recognition.lang = 'en-US';
var end = false;

var msg = new SpeechSynthesisUtterance();
var voices = speechSynthesis.getVoices();
msg.voiceURI = 'native';
msg.lang = 'en-US';

chrome.storage.local.get(null, function(item) {
	isChrome = item.isChrome;
	addonIsEnabled = item.addonIsEnabled;
	blindfoldIsEnabled = item.blindfoldIsEnabled;
	confirmationIsEnabled = item.confirmationIsEnabled;
	notificationIsEnabled = item.notificationIsEnabled;
	textToSpeechIsEnabled = item.textToSpeechIsEnabled;

	if (item.volumeValue != null) {
		msg.volume = item.volumeValue;
	}

	if (item.rateValue != null) {
		msg.rate = item.rateValue;
	}

	if (item.pitchValue != null) {
		msg.pitch = item.pitchValue;
	}

	if (item.voiceValue != null) {
		msg.voice = speechSynthesis.getVoices()[item.voiceValue];
	} else {
		msg.voice = speechSynthesis.getVoices()[0];
	}

	if (isChrome) {
		if (addonIsEnabled && isLichess) {
			recognition.start();
		}

		if (document.querySelector("#lichess") != null && blindfoldIsEnabled && addonIsEnabled) {
			setTimeout(function () {
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

			if (addonIsEnabled && (confirmationIsEnabled || confirmationIsEnabled == null)) {
				if (command == "yes") {
					command = previousCommand;
				} else {
					previousCommand = command;
					alert(command);

					if (textToSpeechIsEnabled || textToSpeechIsEnabled == null) {
						msg.text = command;
						speechSynthesis.speak(msg);
					}

					return;
				}
			}

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
			} else if (command == "confirmation") {
				if (confirmationIsEnabled) {
					chrome.storage.local.set({
						confirmationIsEnabled: false
					});
					confirmationIsEnabled = false;
				} else {
					chrome.storage.local.set({
						confirmationIsEnabled: true
					});
					confirmationIsEnabled = true;
				}
			} else if (command == "notification") {
				if (notificationIsEnabled) {
					chrome.storage.local.set({
						notificationIsEnabled: false
					});
					notificationIsEnabled = false;
				} else {
					chrome.storage.local.set({
						notificationIsEnabled: true
					});
					notificationIsEnabled = true;
				}
			} else if (command == "text to speech") {
				if (textToSpeechIsEnabled) {
					chrome.storage.local.set({
						textToSpeechIsEnabled: false
					});
					textToSpeechIsEnabled = false;
				} else {
					chrome.storage.local.set({
						textToSpeechIsEnabled: true
					});
					textToSpeechIsEnabled = true;
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
				return;  ///@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
			}
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ TEST ME @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
			document.querySelector(".ready").value = "";
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
	if (addonIsEnabled && isLichess) {
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
		notificationIsEnabled = item.notificationIsEnabled;
		textToSpeechIsEnabled = item.textToSpeechIsEnabled;
		
		if (item.volumeValue != null) {
			msg.volume = item.volumeValue;
		}

		if (item.rateValue != null) {
			msg.rate = item.rateValue;
		}

		if (item.pitchValue != null) {
			msg.pitch = item.pitchValue;
		}

		if (item.voiceValue != null) {
			msg.voice = speechSynthesis.getVoices()[item.voiceValue];
		} else {
			msg.voice = speechSynthesis.getVoices()[0];
		}

		if (document.querySelector("#lichess") != null && blindfoldIsEnabled && addonIsEnabled) {
			enableBlindfold();
		} else if (document.querySelector("#lichess") != null) {
			disableBlindfold();
		}
	});
});

function getCommand(command) {
	var command = command;
	command = command.toLowerCase();

	if (command.includes("yes")) {
		return "yes";
	} else if (command.includes("blindfold")) {
		return "blindfold";
	} else if (command.includes("confirmation")) {
		return "confirmation";
	} else if (command.includes("notification")) {
		return "notification";
	} else if (command.includes("text to speech")) {
		return "text to speech";
	} else if (command.includes("take back")) {
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
	}

	var index = -1;

	for (var i = 0; i < commands.length; i++) {
		while (grammars[index] != commands[i]) {
			index++;
			command = command.replace(new RegExp(grammars[index], "g"), commands[i]);
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

	if (addonIsEnabled && (textToSpeechIsEnabled || textToSpeechIsEnabled == null)) {
		speechSynthesis.speak(msg);
	}
});

setTimeout(function () {
	if (document.querySelector(".moves") != null) {
		observer.observe(document.querySelector(".moves"), {attributes: true, childList: true, characterData: true});
	}
}, 500);

function notification(content, theme) {
	var notification = document.createElement("div");
	notification.id = "snackbar";
	notification.className = "show ";
	notification.className += theme;
	notification.innerHTML = content;

	var close = document.createElement("span");
	close.innerHTML = "x";
	close.id = "close";
	close.addEventListener("click", function() {
		notification.style.display = "none";
	});

	var image = document.createElement("IMG");
	image.id = "image";

	if (theme == "default") {
		image.src = chrome.extension.getURL("icons/default.png");
	} else if (theme == "success") {
		image.src = chrome.extension.getURL("icons/success.png");
	} else if (theme == "warning") {
		image.src = chrome.extension.getURL("icons/warning.png");
	} else if (theme == "error") {
		image.src = chrome.extension.getURL("icons/error.png");
	}

	notification.appendChild(close);
	notification.appendChild(image);
	document.body.appendChild(notification);

	setTimeout(function () {
		notification.className = notification.className.replace("show", "");
	}, 3000);
}

setTimeout(function () {
		if (addonIsEnabled && (notificationIsEnabled || notificationIsEnabled == null)) {
			notification("Nf6+", theme.SUCCESS);
		}
}, 1);