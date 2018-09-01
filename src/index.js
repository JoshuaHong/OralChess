/*
	Initiates variables
*/

//Speech interpretations
var grammars = [
	"knight", "knights", "night", "N",
	"bishop", "B",
	"brook", "brooke", "rook", "R",
	"queen", "Q",
	"king", "K",
	"one", "1",
	"two", "2",
	"three", "3",
	"for", "four", "4",
	"five", "5",
	"sex", "six", "6",
	"salon", "seven", "7",
	"eight", "8",
	"alpha", "a",
	"bee", "beta", "b",
	"charlie", "see", "c",
	"delta", "d",
	"echo", "e",
	"foxtrot", "of", "f",
	"golf", "g",
	"hotel", "h"
];

var moreGrammars = [
	"asics", "a6",
	"basics", "a6",
	"adee", "ad",
	"lightsey", "Nc",
	"remove", "premove",
	"quincy", "Qc",
	"queenie", "Qe",
];

var multiWordGrammars = [
	"pre move", "premove",
	"free movie", "premove e"
];

//Speech commands
var commands = [
	"N", "B", "R", "Q", "K",
	"1", "2", "3", "4", "5", "6", "7", "8",
	"a", "b", "c", "d", "e", "f", "g", "h"
];

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
	On load
*/
window.addEventListener("load", function() {

	//Checks for Lichess
	if (window.location.href.indexOf("lichess.org") != -1) {
		isLichess = true;
		console.log("%c Welcome to Oral Chess ", "background: dodgerblue; color: black; font-size: 20px;");
	} else {
		isLichess = false;
	}

	//Sets notice text
	getStatus();

	//Gets button status
	chrome.storage.local.get(null, function(item) {

		//Chrome status
		if (item.isChrome != null) {
			isChrome = item.isChrome;
		} else {
			isChrome = false;
		}

		//Addon status
		if (item.addonIsEnabled != null) {
			addonIsEnabled = item.addonIsEnabled;
		} else {
			addonIsEnabled = false;
		}

		//Blindfold status
		if (item.blindfoldIsEnabled != null) {
			blindfoldIsEnabled = item.blindfoldIsEnabled;
		} else {
			blindfoldIsEnabled = false;
		}

		//Confirmation status
		if (item.confirmationIsEnabled != null) {
			confirmationIsEnabled = item.confirmationIsEnabled;
		} else {
			confirmationIsEnabled = true;
		}

		//Notification status
		if (item.notificationIsEnabled != null) {
			notificationIsEnabled = item.notificationIsEnabled;
		} else {
			notificationIsEnabled = true;
		}

		//Text to speech status
		if (item.textToSpeechIsEnabled != null) {
			textToSpeechIsEnabled = item.textToSpeechIsEnabled;
		} else {
			textToSpeechIsEnabled = true;
		}

		//Volume status
		if (item.volumeValue != null) {
			msg.volume = item.volumeValue;
		} else {
			msg.volume = 1;
		}

		//Rate status
		if (item.rateValue != null) {
			msg.rate = item.rateValue;
		} else {
			msg.rate = 1;
		}

		//Pitch status
		if (item.pitchValue != null) {
			msg.pitch = item.pitchValue;
		} else {
			msg.pitch = 1;
		}

		//Voice status
		if (item.voiceValue != null) {
			msg.voice = speechSynthesis.getVoices()[item.voiceValue];

		} else {
			msg.voice = speechSynthesis.getVoices()[0];
		}

		if (isChrome) {

			//Executes speech recognition if in game
			if (addonIsEnabled && isLichess && ((document.querySelector(".playing") != null && document.querySelector(".tv_history") == null) || document.querySelector(".rematch") != null)) {
				recognition.start();

				//Alerts new game
				if (document.querySelector(".moves") != null && !document.querySelector(".moves").hasChildNodes()) {
					if (notificationIsEnabled) {
						notification("Start", theme.SUCCESS);
					}

					if (textToSpeechIsEnabled) {
						speak("start", false);
					}
				}
			}

			//Executes blindfold if blindfold enabled
			if (document.querySelector("#lichess") != null && blindfoldIsEnabled && addonIsEnabled) {
				enableBlindfold();
			}
		}
	});

	//Stops speech recognition if keyboard input disabled
	setTimeout(function() {
		if (document.querySelector(".ready") == null) {
			end = true;
			recognition.stop();

			if (addonIsEnabled && isLichess && notificationIsEnabled && ((document.querySelector(".playing") != null && document.querySelector(".tv_history") == null) || document.querySelector(".rematch") != null)) {
				notification("Enable Keyboard Input", theme.ERROR);
			}
		}
	}, 3000);

	//Observes moves
	if (document.querySelector(".moves") != null) {
		observer.observe(document.querySelector(".moves"), {attributes: true, childList: true, characterData: true});
	}
});


/*
	Updates button status on change
*/
chrome.storage.onChanged.addListener(function() {
	chrome.storage.local.get(null, function(item) {

		//Addon status
		if (item.addonIsEnabled != null) {
			addonIsEnabled = item.addonIsEnabled;
		} else {
			addonIsEnabled = false;
		}

		//Blindfold status
		if (item.blindfoldIsEnabled != null) {
			blindfoldIsEnabled = item.blindfoldIsEnabled;
		} else {
			blindfoldIsEnabled = false;
		}

		//Confirmation status
		if (item.confirmationIsEnabled != null) {
			confirmationIsEnabled = item.confirmationIsEnabled;
		} else {
			confirmationIsEnabled = true;
		}

		//Notification status
		if (item.notificationIsEnabled != null) {
			notificationIsEnabled = item.notificationIsEnabled;
		} else {
			notificationIsEnabled = true;
		}

		//Text to speech status
		if (item.textToSpeechIsEnabled != null) {
			textToSpeechIsEnabled = item.textToSpeechIsEnabled;
		} else {
			textToSpeechIsEnabled = true;
		}

		//Volume status
		if (item.volumeValue != null) {
			msg.volume = item.volumeValue;
		}

		//Rate status
		if (item.rateValue != null) {
			msg.rate = item.rateValue;
		}

		//Pitch status
		if (item.pitchValue != null) {
			msg.pitch = item.pitchValue;
		}

		//Voice status
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
	Executes command on speech result
*/
recognition.addEventListener("result", function(event) {

	//Result exists
	if (event.results.length > 0) {
		var end = false;
		var command = event.results[0][0].transcript;
		var logs = command;

		//Keyboard input enabled
		if (document.querySelector(".ready") != null) {
			command = getCommand(command);
			console.log(logs + " => " + command);

			//Confirmation enabled
			if (confirmationIsEnabled) {

				//Confirmation confirmed
				if (command == "yes") {
					command = previousCommand;

				//Command confirmation
				} else {
					previousCommand = command;

					//Notification
					if (notificationIsEnabled) {
						notification(command + "?", theme.WARNING);
					}

					//Speaks command request if text to speech enabled
					if (textToSpeechIsEnabled) {
						speechSynthesis.cancel();
						speak(command, false);
					}

					return;
				}
			}

			//Executes commands
			if (command == "takeback") {
				if (document.querySelector(".takeback-yes") != null) {
					document.querySelector(".takeback-yes").click();

					if (notificationIsEnabled) {
						notification("Takeback Proposed", theme.DEFAULT);
					}

					if (textToSpeechIsEnabled) {
						speechSynthesis.cancel();
						speak("takeback proposed", false);
					}
				}
			} else if (command == "draw") {
				if (document.querySelector(".draw-yes") != null) {
					document.querySelector(".draw-yes").click();

					if (document.querySelector(".yes") != null) {
						document.querySelector(".yes").click();

						if (notificationIsEnabled) {
							notification("Draw Offered", theme.DEFAULT);
						}

						if (textToSpeechIsEnabled) {
							speechSynthesis.cancel();
							speak("draw offered", false);
						}
					}
				}
			} else if (command == "resign") {
				if (document.querySelector(".resign-confirm") != null) {
					document.querySelector(".resign-confirm").click();

					if (document.querySelector(".yes") != null) {
						document.querySelector(".yes").click();
					}
				}
			} else if (command == "abort") {
				if (document.querySelector(".abort") != null) {
					document.querySelector(".abort").click();
				}
			} else if (command == "rematch") {
				if (document.querySelector(".rematch") != null) {
					document.querySelector(".rematch").click();

					if (notificationIsEnabled) {
						notification("Rematch Offered", theme.DEFAULT);
					}

					if (textToSpeechIsEnabled) {
						speechSynthesis.cancel();
						speak("rematch offered", false);
					}
				}
			} else if (command == "accept") {
				if (document.querySelector(".accept") != null) {
					document.querySelector(".accept").click();

					if (notificationIsEnabled) {
						notification("Accepted", theme.DEFAULT);
					}
				}
			} else if (command == "decline") {
				if (document.querySelector(".decline") != null) {
					document.querySelector(".decline").click();

					if (notificationIsEnabled) {
						notification("Declined", theme.DEFAULT);
					}

					if (textToSpeechIsEnabled) {
						speechSynthesis.cancel();
						speak("declined", false);
					}
				} else if (document.querySelector(".rematch-decline") != null) {
					document.querySelector(".rematch-decline").click();

					if (notificationIsEnabled) {
						notification("Declined", theme.DEFAULT);
					}

					if (textToSpeechIsEnabled) {
						speechSynthesis.cancel();
						speak("declined", false);
					}
				}
			} else if (command == "cancel") {
				if (document.querySelector(".rematch-decline") != null) {
					document.querySelector(".rematch-decline").click();

					if (notificationIsEnabled) {
						notification("Declined", theme.DEFAULT);
					}

					if (textToSpeechIsEnabled) {
						speechSynthesis.cancel();
						speak("declined", false);
					}
				} else if (document.querySelector(".button") != null && document.querySelector(".button").innerHTML == "Cancel") {
					document.querySelector(".button").click();

					if (notificationIsEnabled) {
						notification("Cancelled", theme.DEFAULT);
					}

					if (textToSpeechIsEnabled) {
						speechSynthesis.cancel();
						speak("cancelled", false);
					}
				}
			} else if (command == "analysis") {
				if (document.querySelector(".analysis") != null) {
					document.querySelector(".analysis").click();

					if (notificationIsEnabled) {
						notification("Analysis Mode", theme.DEFAULT);
					}

					if (textToSpeechIsEnabled) {
						speechSynthesis.cancel();
						speak("analysis mode", false);
					}
				}
			} else if (command == "zen") {
				if (document.querySelector(".fbt") != null) {
					document.querySelector(".fbt").click();

					if (notificationIsEnabled) {
						notification("Zen Mode", theme.DEFAULT);
					}

					if (textToSpeechIsEnabled) {
						speechSynthesis.cancel();
						speak("zen mode", false);
					}
				}
			} else if (command == "new") {
				if (document.querySelectorAll(".button")[1] != null && document.querySelectorAll(".button")[1].innerHTML == "New opponent") {
					document.querySelectorAll(".button")[1].click();

					if (notificationIsEnabled) {
						notification("New Game", theme.DEFAULT);
					}

					if (textToSpeechIsEnabled) {
						speechSynthesis.cancel();
						speak("new game", false);
					}
				}
			} else if (command == "give") {
				if (document.querySelector(".moretime") != null) {
					document.querySelector(".moretime").click();

					if (notificationIsEnabled) {
						notification("Gave 15 Seconds", theme.DEFAULT);
					}

					if (textToSpeechIsEnabled) {
						speechSynthesis.cancel();
						speak("gave 15 seconds", false);
					}
				}
			} else if (command == "blindfold") {
				if (blindfoldIsEnabled) {
					disableBlindfold();

					if (notificationIsEnabled) {
						notification("Blindfold Disabled", theme.DEFAULT);
					}

					if (textToSpeechIsEnabled) {
						speechSynthesis.cancel();
						speak("blindfold disabled", false);
					}

					chrome.storage.local.set({
						blindfoldIsEnabled: false
					});
					blindfoldIsEnabled = false;
				} else {
					enableBlindfold();

					if (notificationIsEnabled) {
						notification("Blindfold Enabled", theme.DEFAULT);
					}

					if (textToSpeechIsEnabled) {
						speechSynthesis.cancel();
						speak("blindfold enabled", false);
					}

					chrome.storage.local.set({
						blindfoldIsEnabled: true
					});
					blindfoldIsEnabled = true;
				}
			} else if (command == "confirmation") {
				if (confirmationIsEnabled) {
					if (notificationIsEnabled) {
						notification("Confirmation Disabled", theme.DEFAULT);
					}

					if (textToSpeechIsEnabled) {
						speechSynthesis.cancel();
						speak("confirmation disabled", false);
					}

					chrome.storage.local.set({
						confirmationIsEnabled: false
					});
					confirmationIsEnabled = false;
				} else {
					if (notificationIsEnabled) {
						notification("Confirmation Enabled", theme.DEFAULT);
					}

					if (textToSpeechIsEnabled) {
						speechSynthesis.cancel();
						speak("confirmation enabled", false);
					}

					chrome.storage.local.set({
						confirmationIsEnabled: true
					});
					confirmationIsEnabled = true;
				}
			} else if (command == "notification") {
				if (notificationIsEnabled) {
					notification("Notification Disabled", theme.DEFAULT);

					if (textToSpeechIsEnabled) {
						speechSynthesis.cancel();
						speak("notification disabled", false);
					}

					chrome.storage.local.set({
						notificationIsEnabled: false
					});
					notificationIsEnabled = false;
				} else {
					chrome.storage.local.set({
						notificationIsEnabled: true
					});
					notificationIsEnabled = true;

					notification("Notification Enabled", theme.DEFAULT);

					if (textToSpeechIsEnabled) {
						speechSynthesis.cancel();
						speak("notification enabled", false);
					}
				}
			} else if (command == "text to speech") {
				if (textToSpeechIsEnabled) {
					if (notificationIsEnabled) {
						notification("Text To Speech Disabled", theme.DEFAULT);
					}

					//Overrides disabled text to speech to speak
					speechSynthesis.cancel();
					var utterance = new SpeechSynthesisUtterance("text to speech disabled");
					utterance.volume = msg.volume;
					utterance.rate = msg.rate;
					utterance.pitch = msg.pitch;
					utterance.voice = msg.voice;
					speechSynthesis.speak(utterance);

					utterance.addEventListener("end", function() {
						chrome.storage.local.set({
							textToSpeechIsEnabled: false
						});
						textToSpeechIsEnabled = false;
					});
				} else {
					chrome.storage.local.set({
						textToSpeechIsEnabled: true
					});
					textToSpeechIsEnabled = true;

					if (notificationIsEnabled) {
						notification("Text To Speech Enabled", theme.DEFAULT);
					}

					speechSynthesis.cancel();
					speak("text to speech enabled", false);
				}
			} else if (command == "joshua hong") {
				if (notificationIsEnabled) {
					notification("815147", theme.DEFAULT);
				}

				if (textToSpeechIsEnabled) {
					speechSynthesis.cancel();
					speak("8 1 5 1 4 7", false);
				}
			} else if (command == "0-0") {

				//Black castles king side
				if (document.querySelector(".orientation-black") != null && canCastle()) {
					document.dispatchEvent(new KeyboardEvent("keydown",{"keyCode":13,"which":13}));
					document.querySelector(".ready").value = "e8";
					document.dispatchEvent(new KeyboardEvent("keydown",{"keyCode":13,"which":13}));
					document.querySelector(".ready").value = "g8";
					document.dispatchEvent(new KeyboardEvent("keydown",{"keyCode":13,"which":13}));

				//White castles king side
				} else if (canCastle()) {
					document.dispatchEvent(new KeyboardEvent("keydown",{"keyCode":13,"which":13}));
					document.querySelector(".ready").value = "e1";
					document.dispatchEvent(new KeyboardEvent("keydown",{"keyCode":13,"which":13}));
					document.querySelector(".ready").value = "g1";
					document.dispatchEvent(new KeyboardEvent("keydown",{"keyCode":13,"which":13}));
				}
			} else if (command == "0-0-0") {
				document.dispatchEvent(new KeyboardEvent("keydown",{"keyCode":13,"which":13}));
				document.querySelector(".ready").value = command;
				document.dispatchEvent(new KeyboardEvent("keydown",{"keyCode":13,"which":13}));
			} else if (command == "castle") {

				//Castle king side first
				document.dispatchEvent(new KeyboardEvent("keydown",{"keyCode":13,"which":13}));
				document.querySelector(".ready").value = "0-0";
				document.dispatchEvent(new KeyboardEvent("keydown",{"keyCode":13,"which":13}));

				//Castle queen side if still not castled
				document.dispatchEvent(new KeyboardEvent("keydown",{"keyCode":13,"which":13}));
				document.querySelector(".ready").value = "0-0-0";
				document.dispatchEvent(new KeyboardEvent("keydown",{"keyCode":13,"which":13}));
			} else if (command == "beginning") {
				document.dispatchEvent(new KeyboardEvent("keydown",{"keyCode":9,"which":9}));
				document.dispatchEvent(new KeyboardEvent("keydown",{"keyCode":38,"which":38}));

				if (notificationIsEnabled) {
					notification("First Move", theme.DEFAULT);
				}
			} else if (command == "backward") {
				document.dispatchEvent(new KeyboardEvent("keydown",{"keyCode":9,"which":9}));
				document.dispatchEvent(new KeyboardEvent("keydown",{"keyCode":37,"which":37}));

				if (notificationIsEnabled) {
					notification("Previous Move", theme.DEFAULT);
				}
			} else if (command == "forward") {
				document.dispatchEvent(new KeyboardEvent("keydown",{"keyCode":9,"which":9}));
				document.dispatchEvent(new KeyboardEvent("keydown",{"keyCode":39,"which":39}));

				if (notificationIsEnabled) {
					notification("Next Move", theme.DEFAULT);
				}
			} else if (command == "end") {
				document.dispatchEvent(new KeyboardEvent("keydown",{"keyCode":9,"which":9}));
				document.dispatchEvent(new KeyboardEvent("keydown",{"keyCode":40,"which":40}));

				if (notificationIsEnabled) {
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

				//Premoves
				if (command.includes("premove")) {
					command = command.split(" ");
					command = command.pop();

					document.dispatchEvent(new KeyboardEvent("keydown",{"keyCode":13,"which":13}));
					document.querySelector(".ready").value = command;
					document.dispatchEvent(new KeyboardEvent("keydown",{"keyCode":13,"which":13}));

					return;
				}

				document.dispatchEvent(new KeyboardEvent("keydown",{"keyCode":13,"which":13}));
				document.querySelector(".ready").value = command;
				document.dispatchEvent(new KeyboardEvent("keydown",{"keyCode":13,"which":13}));
			}

			//Clears keyboard input if no premove
			document.querySelector(".ready").value = "";
			document.querySelector(".ready").classList.remove("wrong");
		}
	}
});


/*
	Restarts or ends speech recognition
*/
recognition.addEventListener("end", function() {
	if (end) {
		recognition.stop();
	} else {
		recognition.start();
	}
});


/*
	Throws error
*/
recognition.addEventListener("error", function(event) {
	console.log("Error occurred in recognition: " + event.error);
});


/*
	Restarts speech recognition on focus
*/
window.addEventListener("focus", function() {
	if (addonIsEnabled && isLichess && document.querySelector(".ready") != null) {
		end = false;
		recognition.start();
	}

	//Sets notice text
	getStatus();
});


/*
	Stops speech recognition on blur
*/
window.addEventListener("blur", function() {
	end = true;
	recognition.stop();
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
		if (addonIsEnabled && notificationIsEnabled) {
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
		if (addonIsEnabled && notificationIsEnabled) {
			notification(command, theme.SUCCESS);
		}
	}

	//Speaks move if text to speech enabled
	if (addonIsEnabled && textToSpeechIsEnabled) {
		speak(command, true);
	}
});


/*
	Parses command
*/
function getCommand(command) {
	var premove = false;
	var command = command;
	command = command.toLowerCase();

	//Removes hyphens
	command = command.replace(new RegExp("-", "g"), "");

	//Replaces multi-word grammars
	for (var i = 0; i < multiWordGrammars.length; i += 2) {
		command = command.replace(new RegExp(multiWordGrammars[i], "g"), multiWordGrammars[i + 1]);
	}

	//Splits by spaces
	command = command.split(" ");

	//Commands
	for (var i = 0; i < command.length; i++) {
		if (command[i] == "yes" || command[i] == "confirm") {
			return "yes";																												//Confirms command
		} else if (command[i] == "blindfold") {
			return "blindfold";																											//Toggles blindfold
		} else if (command[i] == "confirmation") {
			return "confirmation";																										//Toggles confirmation
		} else if (command[i] == "notification" || command[i] == "notifications") {
			return "notification";																										//Toggles notification
		} else if (command[i] == "text" && command[i + 1] == "to" && command[i + 2] == "speech") {
			return "text to speech";																									//Toggles text to speech
		} else if ((command[i] == "take" && command[i + 1] == "back") || command[i] == "takeback") {
			return "takeback";																											//Proposes takeback
		} else if (command[i] == "cancel") {
			return "cancel";																											//Cancels takeback or rematch offer
		} else if (command[i] == "draw") {
			return "draw";																												//Offers draw
		} else if (command[i] == "resign") {
			return "resign";																											//Resigns game
		} else if (command[i] == "abort") {
			return "abort";																												//Aborts game
		} else if (command[i] == "rematch") {
			return "rematch";																											//Offers rematch
		} else if (command[i] == "accept") {
			return "accept";																											//Accepts offer
		} else if (command[i] == "decline") {
			return "decline";																											//Declines offer
		} else if (command[i] == "analysis") {
			return "analysis";																											//Analysis mode
		} else if (command[i] == "zen") {
			return "zen";																												//Zen mode
		} else if (command[i] == "beginning" || command[i] == "first") {
			return "beginning";																											//First move
		} else if (command[i] == "backward" || command[i] == "backwards" || command[i] == "back" || command[i] == "previous") {
			return "backward";																											//Previous move
		} else if (command[i] == "forward" || command[i] == "forwards" || command[i] == "next") {
			return "forward";																											//Next move
		} else if (command[i] == "end" || command[i] == "last") {
			return "end";																												//Last move
		} else if (command[i] == "new") {
			return "new";																												//New game
		} else if (command[i] == "give") {
			return "give";																												//Gives 15 seconds
		} else if (command[i] == "joshua" && command[i + 1] == "hong") {
			return "joshua hong";																										//Unlocks secret key
		} else if (command[i] == "castle") {
			if ((command.includes("king") && command.includes("side")) || command.includes("kingside") || command.includes("short")) {
				return "0-0";
			} else if ((command.includes("queen") && command.includes("side")) || command.includes("queenside") || command.includes("long")) {
				return "0-0-0";
			} else {
				return "castle";
			}
		}
	}

	//Moves
	for (var i = 0; i < command.length; i++) {

		var index = -1;

		//Replaces interpretations with commands
		for (var j = 0; j < commands.length; j++) {
			while (grammars[index] != commands[j]) {
				index++;

				if (command[i] == grammars[index]) {
					command[i] = commands[j];
				}
			}
		}

		//Replaces more grammars with commands
		for (var j = 0; j < moreGrammars.length; j += 2) {
			if (command[i] == moreGrammars[j]) {
				command[i] = moreGrammars[j + 1];
			}
		}

		//Parses premoves
		if (command[i] == "premove") {
			premove = true;
			command.splice(i, 1);
			i--;
			break;
		}

		var letters = command[i].split("");

		//Removes non valid commands
		for (var j = 0; j < letters.length; j++) {
			if (!isCommand(letters[j])) {
				command.splice(i, 1);
				i--;
				break;
			}
		}
	}

	//Gets last four characters
	command = command.join("");
	command = command.slice(-4);

	//Adds premoves
	if (premove) {
		command = "premove " + command;
	}

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
	Executes blindfold
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
	} else if (command == "O") {
		command = "Castles";
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
	container.insertAdjacentElement("afterbegin", notification);

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