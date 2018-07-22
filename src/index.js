/*
	Initiates variables
*/

//Speech interpretations
var grammars = ["knight", "N",
				"bishop", "B",
				"rook", "R",
				"queen", "Q",
				"king", "K",
				"one", "1",
				"two", "2",
				"three", "3",
				"four", "for", "4",
				"five", "5",
				"six", "6",
				"seven", "7",
				"eight", "8",
				"a", "b", "c", "d", "e", "f", "g", "h",
				"a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8",
				"b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8",
				"c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8",
				"d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8",
				"e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8",
				"f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8",
				"g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8",
				"h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8"];

var moreGrammars = ["quincy", "Q c",
					"queenie", "Q e"];

//Speech commands
var commands = ["N", "B", "R", "Q", "K",
				"1", "2", "3", "4", "5", "6", "7", "8",
				"a", "b", "c", "d", "e", "f", "g", "h",
				"a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8",
				"b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8",
				"c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8",
				"d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8",
				"e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8",
				"f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8",
				"g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8",
				"h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8"];

//Notification themes
var theme = {
	DEFAULT: "default",
	SUCCESS: "success",
	WARNING: "warning",
	ERROR: "error"
};

//Notification Container
var container = document.createElement("DIV");
container.id = "oralChess-container";
document.body.appendChild(container);

//Button status
var isChrome;
var isLichess;
var addonIsEnabled;
var blindfoldIsEnabled;
var confirmationIsEnabled;
var notificationIsEnabled;
var textToSpeechIsEnabled;

//Confirmation command
var previousCommand;

//Speech recognition
var recognition = new webkitSpeechRecognition();

//Text to speech
var msg = new SpeechSynthesisUtterance();
var voices = speechSynthesis.getVoices();

//Speech recognition reset flag
var end = false;


/*
	Checks for Lichess
*/
if (window.location.href.indexOf("lichess.org") != -1) {
	isLichess = true;
}


/*
	Sets notice text
*/
getStatus();


/*
	Gets button status
*/
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
		//Executes speech recognition if in game
		if (addonIsEnabled && isLichess && ((document.querySelector(".playing") != null && document.querySelector(".tv_history") == null) || document.querySelector(".rematch") != null)) {
			recognition.start();
		}

		//Executes blindfold if blindfold enabled
		if (document.querySelector("#lichess") != null && blindfoldIsEnabled && addonIsEnabled) {
			setTimeout(function() {
				enableBlindfold();
			}, 500);
		}
	}
});


/*
	Updates button status on change
*/
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

		//Executes blindfold if blindfold enabled
		if (document.querySelector("#lichess") != null && blindfoldIsEnabled && addonIsEnabled) {
			enableBlindfold();

		//Disables blindfold if blindfold disabled
		} else if (document.querySelector("#lichess") != null) {
			disableBlindfold();
		}

		//Stops speech synthesis
		if (!addonIsEnabled || !textToSpeechIsEnabled) {
			speechSynthesis.cancel();
		}
	});
});


/*
	Stop speech recognition if keyboard input disabled
*/
setTimeout(function() {
	if (document.querySelector(".ready") == null) {
		end = true;
		recognition.stop();

		if (addonIsEnabled && isLichess && (notificationIsEnabled || notificationIsEnabled == null) && ((document.querySelector(".playing") != null && document.querySelector(".tv_history") == null) || document.querySelector(".rematch") != null)) {
			notification("Enable Keyboard Input", theme.ERROR);
		}
	}
}, 3000);


/*
	Executes command on speech result
*/
recognition.onresult = function(event) {

	//Result exists
	if (event.results.length > 0) {
		var end = false;
		var command = event.results[0][0].transcript;
		console.log(command);

		//Keyboard input enabled
		if (document.querySelector(".ready") != null) {
			command = getCommand(command);

			//Confirmation enabled
			if (addonIsEnabled && (confirmationIsEnabled || confirmationIsEnabled == null)) {

				//Confirmation confirmed
				if (command == "yes") {
					command = previousCommand;

				//Command confirmation
				} else {
					previousCommand = command;

					//Notification
					if (addonIsEnabled && (notificationIsEnabled || notificationIsEnabled == null)) {
						notification(command + "?", theme.WARNING);
					}

					//Speaks command request if text to speech enabled
					if (textToSpeechIsEnabled || textToSpeechIsEnabled == null) {
						speechSynthesis.cancel();
						speak(command, false);
					}

					return;
				}
			}

			//Executes commands
			if (command == "takeback" && document.querySelector(".takeback-yes") != null) {
				document.querySelector(".takeback-yes").click();

				if (addonIsEnabled && (notificationIsEnabled || notificationIsEnabled == null)) {
					notification(command, theme.DEFAULT);
				}
			} else if (command == "draw" && document.querySelector(".draw-yes") != null) {
				document.querySelector(".draw-yes").click();
				if (document.querySelector(".yes") != null) {
					document.querySelector(".yes").click();
				}

				if (addonIsEnabled && (notificationIsEnabled || notificationIsEnabled == null)) {
					notification(command, theme.DEFAULT);
				}
			} else if (command == "resign" && document.querySelector(".resign-confirm") != null) {
				document.querySelector(".resign-confirm").click();
				if (document.querySelector(".yes") != null) {
					document.querySelector(".yes").click();
				}

				if (addonIsEnabled && (notificationIsEnabled || notificationIsEnabled == null)) {
					notification(command, theme.DEFAULT);
				}
			} else if (command == "abort" && document.querySelector(".abort") != null) {
				document.querySelector(".abort").click();

				if (addonIsEnabled && (notificationIsEnabled || notificationIsEnabled == null)) {
					notification(command, theme.DEFAULT);
				}
			} else if (command == "rematch" && document.querySelector(".rematch") != null) {
				document.querySelector(".rematch").click();

				if (addonIsEnabled && (notificationIsEnabled || notificationIsEnabled == null)) {
					notification(command, theme.DEFAULT);
				}
			} else if (command == "button" && document.querySelector(".button") != null) {
				document.querySelector(".button").click();

				if (addonIsEnabled && (notificationIsEnabled || notificationIsEnabled == null)) {
					notification(command, theme.DEFAULT);
				}
			} else if (command == "analysis" && document.querySelector(".analysis") != null) {
				document.querySelector(".analysis").click();

				if (addonIsEnabled && (notificationIsEnabled || notificationIsEnabled == null)) {
					notification(command, theme.DEFAULT);
				}
			} else if (command == "zen" && document.querySelector(".fbt") != null) {
				document.querySelector(".fbt").click();

				if (addonIsEnabled && (notificationIsEnabled || notificationIsEnabled == null)) {
					notification(command, theme.DEFAULT);
				}
			} else if (command == "new" && document.querySelectorAll(".button")[1] != null) {
				document.querySelectorAll(".button")[1].click();

				if (addonIsEnabled && (notificationIsEnabled || notificationIsEnabled == null)) {
					notification(command, theme.DEFAULT);
				}
			} else if (command == "give" && document.querySelector(".moretime") != null) {
				document.querySelector(".moretime").click();

				if (addonIsEnabled && (notificationIsEnabled || notificationIsEnabled == null)) {
					notification(command, theme.DEFAULT);
				}
			} else if (command == "blindfold") {
				if (blindfoldIsEnabled) {
					disableBlindfold();
					chrome.storage.local.set({
						blindfoldIsEnabled: false
					});
					blindfoldIsEnabled = false;

					if (addonIsEnabled && (notificationIsEnabled || notificationIsEnabled == null)) {
						notification("Blindfold Disabled", theme.DEFAULT);
					}
				} else {
					enableBlindfold();
					chrome.storage.local.set({
						blindfoldIsEnabled: true
					});
					blindfoldIsEnabled = true;

					if (addonIsEnabled && (notificationIsEnabled || notificationIsEnabled == null)) {
						notification("Blindfold Enabled", theme.DEFAULT);
					}
				}
			} else if (command == "confirmation") {
				if (confirmationIsEnabled) {
					chrome.storage.local.set({
						confirmationIsEnabled: false
					});
					confirmationIsEnabled = false;

					if (addonIsEnabled && (notificationIsEnabled || notificationIsEnabled == null)) {
						notification("Confirmation Disabled", theme.DEFAULT);
					}
				} else {
					chrome.storage.local.set({
						confirmationIsEnabled: true
					});
					confirmationIsEnabled = true;

					if (addonIsEnabled && (notificationIsEnabled || notificationIsEnabled == null)) {
						notification("Confirmation Enabled", theme.DEFAULT);
					}
				}
			} else if (command == "notification") {
				if (notificationIsEnabled) {
					chrome.storage.local.set({
						notificationIsEnabled: false
					});
					notificationIsEnabled = false;

					if (addonIsEnabled && (notificationIsEnabled || notificationIsEnabled == null)) {
						notification("Notification Disabled", theme.DEFAULT);
					}
				} else {
					chrome.storage.local.set({
						notificationIsEnabled: true
					});
					notificationIsEnabled = true;

					if (addonIsEnabled && (notificationIsEnabled || notificationIsEnabled == null)) {
						notification("Notification Enabled", theme.DEFAULT);
					}
				}
			} else if (command == "text to speech") {
				if (textToSpeechIsEnabled) {
					chrome.storage.local.set({
						textToSpeechIsEnabled: false
					});
					textToSpeechIsEnabled = false;

					if (addonIsEnabled && (notificationIsEnabled || notificationIsEnabled == null)) {
						notification("Text To Speech Disabled", theme.DEFAULT);
					}
				} else {
					chrome.storage.local.set({
						textToSpeechIsEnabled: true
					});
					textToSpeechIsEnabled = true;

					if (addonIsEnabled && (notificationIsEnabled || notificationIsEnabled == null)) {
						notification("Text To Speech Enabled", theme.DEFAULT);
					}
				}
			} else if (command == "0-0") {

				//Black castles king side
				if (document.querySelector(".orientation-black") != null && canCastle()) {
					document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':13,'which':13}));
					document.querySelector(".ready").value = "e8";
					document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':13,'which':13}));
					document.querySelector(".ready").value = "g8";
					document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':13,'which':13}));

				//White castles king side
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

				//Castle king side first
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':13,'which':13}));
				document.querySelector(".ready").value = "0-0";
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':13,'which':13}));

				//Castle queen side if still not castled
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':13,'which':13}));
				document.querySelector(".ready").value = "0-0-0";
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':13,'which':13}));
			} else if (command == "beginning") {
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':9,'which':9}));
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':38,'which':38}));

				if (addonIsEnabled && (notificationIsEnabled || notificationIsEnabled == null)) {
					notification("First Move", theme.DEFAULT);
				}
			} else if (command == "backward") {
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':9,'which':9}));
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':37,'which':37}));

				if (addonIsEnabled && (notificationIsEnabled || notificationIsEnabled == null)) {
					notification("Previous Move", theme.DEFAULT);
				}
			} else if (command == "forward") {
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':9,'which':9}));
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':39,'which':39}));

				if (addonIsEnabled && (notificationIsEnabled || notificationIsEnabled == null)) {
					notification("Next Move", theme.DEFAULT);
				}
			} else if (command == "end") {
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':9,'which':9}));
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':40,'which':40}));

				if (addonIsEnabled && (notificationIsEnabled || notificationIsEnabled == null)) {
					notification("Latest Move", theme.DEFAULT);
				}
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
				return;
			}

			//Clears keyboard input if no premove
			document.querySelector(".ready").value = "";
		}
	}
}


/*
	Restarts or ends speech recognition
*/
recognition.onend = function() {
	if (end) {
		console.log("ACTUAL END");
		recognition.stop();
	} else {
		console.log("RESTARTING");
		recognition.start();
	}
}


/*
	Throws error
*/
recognition.onerror = function(event) {
	console.log("Error occurred in recognition: " + event.error);
}


/*
	Restarts speech recognition on focus
*/
window.addEventListener('focus', function() {
	if (addonIsEnabled && isLichess && document.querySelector(".ready") != null) {
		console.log("FOCUS");
		end = false;
		recognition.start();
	}

	//Sets notice text
	getStatus();
});


/*
	Stops speech recognition on blur
*/
window.addEventListener('blur', function() {
	console.log("BLUR");
	end = true;
	recognition.stop();
});


/*
	Observes moves
*/
window.addEventListener("load", function() {
	if (document.querySelector(".moves") != null) {
		observer.observe(document.querySelector(".moves"), {attributes: true, childList: true, characterData: true});
	}
});


/*
	On peice move
*/
var observer = new MutationObserver(function(mutations) {
	var command;

	//Game over
	if (document.querySelector(".result_wrap") != null) {
		chrome.storage.local.set({
			isPlaying: false
		});

		//Gets game over status
		if (document.querySelector(".status") != null) {
			command = document.querySelector(".status").innerHTML;
		}

		//Notification
		if (addonIsEnabled && (notificationIsEnabled || notificationIsEnabled == null)) {
			notification("Game Over", theme.DEFAULT);
		}

	//Peice moved
	} else {

		//White moves
		if (document.querySelectorAll("move")[document.querySelectorAll("move").length - 1].innerHTML == "") {
			command = document.querySelectorAll("move")[document.querySelectorAll("move").length - 2].innerHTML;

		//Black moves
		} else {
			command = document.querySelectorAll("move")[document.querySelectorAll("move").length - 1].innerHTML;
		}

		//Notification
		if (addonIsEnabled && (notificationIsEnabled || notificationIsEnabled == null)) {
			notification(command, theme.SUCCESS);
		}
	}

	//Speaks move if text to speech enabled
	if (addonIsEnabled && (textToSpeechIsEnabled || textToSpeechIsEnabled == null)) {
		speak(command, true);
	}
});


/*
	Parses command
*/
function getCommand(command) {
	var command = command;
	command = command.toLowerCase();

	//Returns other commands
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
		if (command.includes("king side") || command.includes("short")) {
			return "0-0";
		} else if (command.includes("queen side") || command.includes("long")) {
			return "0-0-0";
		} else {
			return "0";
		}
	}

	var newCommand = command;
	var changed = false;

	//Replaces other interpretations with commands
	for (var i = 0; i < moreGrammars.length; i++) {
		newCommand = newCommand.replace(new RegExp(moreGrammars[i], "g"), moreGrammars[++i]);
	}

	if (newCommand != command) {
		changed = true;
		command = newCommand;
	}

	var index = -1;

	//Replaces interpretations with commands
	for (var i = 0; i < commands.length; i++) {
		while (grammars[index] != commands[i]) {
			index++;
			command = command.replace(new RegExp(grammars[index], "g"), commands[i]);
		}
	}

	command = command.split(" ");

	//Removes non valid commands
	for (var i = 0; i < command.length; i++) {
		if (!isCommand(command[i])) {
			command.splice(i, 1);
			i--;
		}
	}

	//Gets last three commands
	if (containsThreeCommands(command) || changed) {
		command = command.slice(command.length - 3, command.length);

	//Gets last two commands
	} else {
		command = command.slice(command.length - 2, command.length);
	}

	command = command.join("");
	return command;
}


/*
	Checks if command is valid
*/
function isCommand(command) {
	for (var i = 0; i < commands.length; i++) {
		if (command == commands[i]) {
			return true;
		}
	}

	return false;
}


/*
	Checks if contains three commands
*/
function containsThreeCommands(command) {
	for (var i = 0; i < command.length; i++) {
		for (var j = commands.indexOf("1"); j < commands.indexOf("h"); j++) {
			if (command[i] == commands[j]) {
				return true;
			}
		}
	}

	return false;
}


/*
	Checks if castling is valid
*/
function canCastle() {

	//Playing black
	if (document.querySelector(".orientation-black") != null) {
		if (document.querySelector(".king").style.transform == "translate(192px, 448px)") {
			return true;
		} else {
			return false;
		}

	//Playing white
	} else {
		if (document.querySelectorAll(".king")[1].style.transform == "translate(256px, 448px)") {
			return true;
		} else {
			return false;
		}
	}
}


/*
	Executes Blindfold
*/
function enableBlindfold() {
	if (document.querySelector(".lichess_game") != null) {

		//Hides pawns
		for (var i = 0; i < document.querySelectorAll(".pawn").length; i++) {
			document.querySelectorAll(".pawn")[i].style.display = "none";
		}

		//Hides knights
		for (var i = 0; i < document.querySelectorAll(".knight").length; i++) {
			document.querySelectorAll(".knight")[i].style.display = "none";
		}

		//Hides bishops
		for (var i = 0; i < document.querySelectorAll(".bishop").length; i++) {
			document.querySelectorAll(".bishop")[i].style.display = "none";
		}

		//Hides rooks
		for (var i = 0; i < document.querySelectorAll(".rook").length; i++) {
			document.querySelectorAll(".rook")[i].style.display = "none";
		}

		//Hides queens
		for (var i = 0; i < document.querySelectorAll(".queen").length; i++) {
			document.querySelectorAll(".queen")[i].style.display = "none";
		}

		//Hides kings
		for (var i = 0; i < document.querySelectorAll(".king").length; i++) {
			document.querySelectorAll(".king")[i].style.display = "none";
		}
	}
}


/*
	Removes blindfold
*/
function disableBlindfold() {
	if (document.querySelector(".lichess_game") != null) {

		//Hides pawns
		for (var i = 0; i < document.querySelectorAll(".pawn").length; i++) {
			document.querySelectorAll(".pawn")[i].style.display = "inline-block";
		}

		//Hides knights
		for (var i = 0; i < document.querySelectorAll(".knight").length; i++) {
			document.querySelectorAll(".knight")[i].style.display = "inline-block";
		}

		//Hides bishops
		for (var i = 0; i < document.querySelectorAll(".bishop").length; i++) {
			document.querySelectorAll(".bishop")[i].style.display = "inline-block";
		}

		//Hides rooks
		for (var i = 0; i < document.querySelectorAll(".rook").length; i++) {
			document.querySelectorAll(".rook")[i].style.display = "inline-block";
		}

		//Hides queens
		for (var i = 0; i < document.querySelectorAll(".queen").length; i++) {
			document.querySelectorAll(".queen")[i].style.display = "inline-block";
		}

		//Hides kings
		for (var i = 0; i < document.querySelectorAll(".king").length; i++) {
			document.querySelectorAll(".king")[i].style.display = "inline-block";
		}
	}
}


/*
	Parses and executes text to speech
*/
function speak(command, isMove) {
	var command = command;

	//Game over
	if (command.includes("<div>")) {
		command = command.replace(new RegExp("<div>", "g"), "");
		command = command.replace(new RegExp("</div>", "g"), ".");

		//Stops speech repetition bug by resetting queue
		speechSynthesis.cancel();

		msg.text = command;
		speechSynthesis.speak(msg);
		return;
	}

	//Adds a pause between adjacent lowercase letters
	if (isMove) {
		var letters = command.split("");

		for (var i = 0; i < letters.length - 1; i++) {
			if (letters[i].charCodeAt(0) >= 97 && letters[i].charCodeAt(0) <= 122 && (letters[i + 1].charCodeAt(0) >= 97 && letters[i + 1].charCodeAt(0) <= 122)) {
				letters.splice(i + 1, 0, ", ");

			//Changes short a sound to long a sound
			} else if (letters[i].charCodeAt(0) >= 97 && letters[i].charCodeAt(0) <= 122 && letters[i + 1] == "х" && letters[i] == "a") {
				letters.splice(i, 1, "eh");
			}
		}

		command = letters.join("");
	}

	//Replaces letters with peices
	if (command.includes("N")) {
		command = command.replace(new RegExp("N", "g"), "Knight ");
	} else if (command.includes("B")) {
		command = command.replace(new RegExp("B", "g"), "Bishop ");
	} else if (command.includes("R")) {
		command = command.replace(new RegExp("R", "g"), "Rook ");
	} else if (command.includes("Q")) {
		command = command.replace(new RegExp("Q", "g"), "Queen ");
	} else if (command.includes("K")) {
		command = command.replace(new RegExp("K", "g"), "King ");
	}

	//Replaces х with takes
	if (command.includes("х")) {
		command = command.replace(new RegExp("х", "g"), " takes ");
	}

	//Replaces + with check
	if (command.includes("+")) {
		command = command.slice(0, -1);
		command += " check"
	}

	//Castling
	if (command == "O-O") {
		command = "Castles kingside";
	} else if (command == "O-O-O") {
		command = "Castles queenside";
	}

	msg.text = command;
	speechSynthesis.speak(msg);
}


/*
	Executes notification
*/
function notification(content, theme) {

	//Notification modal
	var notification = document.createElement("div");
	notification.id = "oralChess-snackbar";
	notification.className = "show ";
	notification.className += theme;
	notification.innerHTML = content;

	//Close button
	var close = document.createElement("span");
	close.innerHTML = "x";
	close.id = "oralChess-close";
	close.addEventListener("click", function() {
		notification.style.display = "none";
	});

	//Notification icon
	var image = document.createElement("IMG");
	image.id = "oralChess-image";

	//Sets theme
	if (theme == "default") {
		image.src = chrome.extension.getURL("icons/default.png");
	} else if (theme == "success") {
		image.src = chrome.extension.getURL("icons/success.png");
	} else if (theme == "warning") {
		image.src = chrome.extension.getURL("icons/warning.png");
	} else if (theme == "error") {
		image.src = chrome.extension.getURL("icons/error.png");
	}

	//Appends elements
	notification.appendChild(close);
	notification.appendChild(image);
	container.insertAdjacentElement('afterbegin', notification);

	//Hides notification
	setTimeout(function() {
		notification.className = notification.className.replace("show", "");
		notification.remove();
	}, 3000);
}


/*
	Gets notice status
*/
function getStatus() {
	if (isLichess) {

		//Keyboard input enabled
		setTimeout(function() {
			if (document.querySelector(".ready") != null) {
				chrome.storage.local.set({
					isReady: true
				});
			} else {
				chrome.storage.local.set({
					isReady: false
				});
			}
		}, 3000);

		//In game
		if (document.querySelector(".playing") != null) {
			chrome.storage.local.set({
				isPlaying: true
			});
		} else {
			chrome.storage.local.set({
				isPlaying: false
			});
		}
	}
}