var commands = ["knight",
				"bishop",
				"rook",
				"queen",
				"king",
				"a1",
				"a2",
				"a3",
				"a4",
				"a5",
				"a6",
				"a7",
				"a8",
				"b1",
				"b2",
				"b3",
				"b4",
				"b5",
				"b6",
				"b7",
				"b8",
				"c1",
				"c2",
				"c3",
				"c4",
				"c5",
				"c6",
				"c7",
				"c8",
				"d1",
				"d2",
				"d3",
				"d4",
				"d5",
				"d6",
				"d7",
				"d8",
				"e1",
				"e2",
				"e3",
				"e4",
				"e5",
				"e6",
				"e7",
				"d8",
				"f1",
				"f2",
				"f3",
				"f4",
				"f5",
				"f6",
				"f7",
				"f8",
				"g1",
				"g2",
				"g3",
				"g4",
				"g5",
				"g6",
				"g7",
				"g8",
				"h1",
				"h2",
				"h3",
				"h4",
				"h5",
				"h6",
				"h7",
				"h8"];

var squares = ["N", "B", "R", "Q", "K",
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

chrome.storage.local.get(null, function(item) {
	isChrome = item.isChrome;
	addonIsEnabled = item.addonIsEnabled;
	blindfoldIsEnabled = item.blindfoldIsEnabled;
	confirmationIsEnabled = item.confirmationIsEnabled;
	textToSpeechIsEnabled = item.textToSpeechIsEnabled;

	if (isChrome && addonIsEnabled) {
		recognition.start();
	}
});

recognition.onresult = function(event) {
	if (event.results.length > 0) {
		var end = false;
		var command = event.results[0][0].transcript;
		console.log(command);

		if (document.querySelector("#lichess") != null && document.querySelector(".ready") != null) {
			command = getCommand(command);

			if (command == "takeback") {
				//WORKS!
				//if .takeback-yes exists CHECK
				document.querySelector(".takeback-yes").click();
			} else if (command != "") {
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':13,'which':13}));
				document.querySelector(".ready").value = command;
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
	});
});

function getCommand(command) {
	var command = command;
	command = command.toLowerCase();

	if (command.includes("")) {
		//FINISH THE CASES. IE RESIGN TAKEBACK KEYBOARD SHORTCUTS ETC...
		//then return;

		//full trihard ab3 ab4 ab5 ab6 etc...?????
		//maybe afterwards
	}

	for (var i = 0; i < commands.length; i++) {
		switch (true) {
			case (i <= commands.indexOf("knight")):
				command = command.replace(new RegExp(commands[i], 'g'), 'N');
				break;
			case (i <= commands.indexOf("bishop")):
				command = command.replace(new RegExp(commands[i], 'g'), 'B');
				break;
			case (i <= commands.indexOf("rook")):
				command = command.replace(new RegExp(commands[i], 'g'), 'R');
				break;
			case (i <= commands.indexOf("queen")):
				command = command.replace(new RegExp(commands[i], 'g'), 'Q');
				break;
			case (i <= commands.indexOf("king")):
				command = command.replace(new RegExp(commands[i], 'g'), 'K');
				break;
			case (i <= commands.indexOf("a")):
				command = command.replace(new RegExp(commands[i], 'g'), 'a');
				break;
			case (i <= commands.indexOf("b")):
				command = command.replace(new RegExp(commands[i], 'g'), 'b');
				break;
			case (i <= commands.indexOf("c")):
				command = command.replace(new RegExp(commands[i], 'g'), 'c');
				break;
			case (i <= commands.indexOf("d")):
				command = command.replace(new RegExp(commands[i], 'g'), 'd');
				break;
			case (i <= commands.indexOf("e")):
				command = command.replace(new RegExp(commands[i], 'g'), 'e');
				break;
			case (i <= commands.indexOf("f")):
				command = command.replace(new RegExp(commands[i], 'g'), 'f');
				break;
			case (i <= commands.indexOf("g")):
				command = command.replace(new RegExp(commands[i], 'g'), 'g');
				break;
			case (i <= commands.indexOf("h")):
				command = command.replace(new RegExp(commands[i], 'g'), 'h');
				break;
			case (i <= commands.indexOf("a1")):
				command = command.replace(new RegExp(commands[i], 'g'), 'a1');
				break;
			case (i <= commands.indexOf("b2")):
				command = command.replace(new RegExp(commands[i], 'g'), 'a2');
				break;
			case (i <= commands.indexOf("a3")):
				command = command.replace(new RegExp(commands[i], 'g'), 'a3');
				break;
			case (i <= commands.indexOf("a4")):
				command = command.replace(new RegExp(commands[i], 'g'), 'a4');
				break;
			case (i <= commands.indexOf("a5")):
				command = command.replace(new RegExp(commands[i], 'g'), 'a5');
				break;
			case (i <= commands.indexOf("a6")):
				command = command.replace(new RegExp(commands[i], 'g'), 'a6');
				break;
			case (i <= commands.indexOf("a7")):
				command = command.replace(new RegExp(commands[i], 'g'), 'a7');
				break;
			case (i <= commands.indexOf("a8")):
				command = command.replace(new RegExp(commands[i], 'g'), 'a8');
				break;
			case (i <= commands.indexOf("b1")):
				command = command.replace(new RegExp(commands[i], 'g'), 'b1');
				break;
			case (i <= commands.indexOf("b2")):
				command = command.replace(new RegExp(commands[i], 'g'), 'b2');
				break;
			case (i <= commands.indexOf("b3")):
				command = command.replace(new RegExp(commands[i], 'g'), 'b3');
				break;
			case (i <= commands.indexOf("b4")):
				command = command.replace(new RegExp(commands[i], 'g'), 'b4');
				break;
			case (i <= commands.indexOf("b5")):
				command = command.replace(new RegExp(commands[i], 'g'), 'b5');
				break;
			case (i <= commands.indexOf("b6")):
				command = command.replace(new RegExp(commands[i], 'g'), 'b6');
				break;
			case (i <= commands.indexOf("b7")):
				command = command.replace(new RegExp(commands[i], 'g'), 'b7');
				break;
			case (i <= commands.indexOf("b8")):
				command = command.replace(new RegExp(commands[i], 'g'), 'b8');
				break;
			case (i <= commands.indexOf("c1")):
				command = command.replace(new RegExp(commands[i], 'g'), 'c1');
				break;
			case (i <= commands.indexOf("c2")):
				command = command.replace(new RegExp(commands[i], 'g'), 'c2');
				break;
			case (i <= commands.indexOf("c3")):
				command = command.replace(new RegExp(commands[i], 'g'), 'c3');
				break;
			case (i <= commands.indexOf("c4")):
				command = command.replace(new RegExp(commands[i], 'g'), 'c4');
				break;
			case (i <= commands.indexOf("c5")):
				command = command.replace(new RegExp(commands[i], 'g'), 'c5');
				break;
			case (i <= commands.indexOf("c6")):
				command = command.replace(new RegExp(commands[i], 'g'), 'c6');
				break;
			case (i <= commands.indexOf("c7")):
				command = command.replace(new RegExp(commands[i], 'g'), 'c7');
				break;
			case (i <= commands.indexOf("c8")):
				command = command.replace(new RegExp(commands[i], 'g'), 'c8');
				break;
			case (i <= commands.indexOf("d1")):
				command = command.replace(new RegExp(commands[i], 'g'), 'd1');
				break;
			case (i <= commands.indexOf("d2")):
				command = command.replace(new RegExp(commands[i], 'g'), 'd2');
				break;
			case (i <= commands.indexOf("d3")):
				command = command.replace(new RegExp(commands[i], 'g'), 'd3');
				break;
			case (i <= commands.indexOf("d4")):
				command = command.replace(new RegExp(commands[i], 'g'), 'd4');
				break;
			case (i <= commands.indexOf("d5")):
				command = command.replace(new RegExp(commands[i], 'g'), 'd5');
				break;
			case (i <= commands.indexOf("d6")):
				command = command.replace(new RegExp(commands[i], 'g'), 'd6');
				break;
			case (i <= commands.indexOf("d7")):
				command = command.replace(new RegExp(commands[i], 'g'), 'd7');
				break;
			case (i <= commands.indexOf("d8")):
				command = command.replace(new RegExp(commands[i], 'g'), 'd8');
				break;
			case (i <= commands.indexOf("e1")):
				command = command.replace(new RegExp(commands[i], 'g'), 'e1');
				break;
			case (i <= commands.indexOf("e2")):
				command = command.replace(new RegExp(commands[i], 'g'), 'e2');
				break;
			case (i <= commands.indexOf("e3")):
				command = command.replace(new RegExp(commands[i], 'g'), 'e3');
				break;
			case (i <= commands.indexOf("e4")):
				command = command.replace(new RegExp(commands[i], 'g'), 'e4');
				break;
			case (i <= commands.indexOf("e5")):
				command = command.replace(new RegExp(commands[i], 'g'), 'e5');
				break;
			case (i <= commands.indexOf("e6")):
				command = command.replace(new RegExp(commands[i], 'g'), 'e6');
				break;
			case (i <= commands.indexOf("e7")):
				command = command.replace(new RegExp(commands[i], 'g'), 'e7');
				break;
			case (i <= commands.indexOf("e8")):
				command = command.replace(new RegExp(commands[i], 'g'), 'e8');
				break;
			case (i <= commands.indexOf("f1")):
				command = command.replace(new RegExp(commands[i], 'g'), 'f1');
				break;
			case (i <= commands.indexOf("f2")):
				command = command.replace(new RegExp(commands[i], 'g'), 'f2');
				break;
			case (i <= commands.indexOf("f3")):
				command = command.replace(new RegExp(commands[i], 'g'), 'f3');
				break;
			case (i <= commands.indexOf("f4")):
				command = command.replace(new RegExp(commands[i], 'g'), 'f4');
				break;
			case (i <= commands.indexOf("f5")):
				command = command.replace(new RegExp(commands[i], 'g'), 'f5');
				break;
			case (i <= commands.indexOf("f6")):
				command = command.replace(new RegExp(commands[i], 'g'), 'f6');
				break;
			case (i <= commands.indexOf("f7")):
				command = command.replace(new RegExp(commands[i], 'g'), 'f7');
				break;
			case (i <= commands.indexOf("f8")):
				command = command.replace(new RegExp(commands[i], 'g'), 'f8');
				break;
			case (i <= commands.indexOf("g1")):
				command = command.replace(new RegExp(commands[i], 'g'), 'g1');
				break;
			case (i <= commands.indexOf("g2")):
				command = command.replace(new RegExp(commands[i], 'g'), 'g2');
				break;
			case (i <= commands.indexOf("g3")):
				command = command.replace(new RegExp(commands[i], 'g'), 'g3');
				break;
			case (i <= commands.indexOf("g4")):
				command = command.replace(new RegExp(commands[i], 'g'), 'g4');
				break;
			case (i <= commands.indexOf("g5")):
				command = command.replace(new RegExp(commands[i], 'g'), 'g5');
				break;
			case (i <= commands.indexOf("g6")):
				command = command.replace(new RegExp(commands[i], 'g'), 'g6');
				break;
			case (i <= commands.indexOf("g7")):
				command = command.replace(new RegExp(commands[i], 'g'), 'g7');
				break;
			case (i <= commands.indexOf("g8")):
				command = command.replace(new RegExp(commands[i], 'g'), 'g8');
				break;
			case (i <= commands.indexOf("h1")):
				command = command.replace(new RegExp(commands[i], 'g'), 'h1');
				break;
			case (i <= commands.indexOf("h2")):
				command = command.replace(new RegExp(commands[i], 'g'), 'h2');
				break;
			case (i <= commands.indexOf("h3")):
				command = command.replace(new RegExp(commands[i], 'g'), 'h3');
				break;
			case (i <= commands.indexOf("h4")):
				command = command.replace(new RegExp(commands[i], 'g'), 'h4');
				break;
			case (i <= commands.indexOf("h5")):
				command = command.replace(new RegExp(commands[i], 'g'), 'h5');
				break;
			case (i <= commands.indexOf("h6")):
				command = command.replace(new RegExp(commands[i], 'g'), 'h6');
				break;
			case (i <= commands.indexOf("h7")):
				command = command.replace(new RegExp(commands[i], 'g'), 'h7');
				break;
			case (i <= commands.indexOf("h8")):
				command = command.replace(new RegExp(commands[i], 'g'), 'h8');
				break;
		}
	}

	command = command.split(" ");

	for (var i = 0; i < command.length; i++) {
		if (!isSquare(command[i])) {
			if (!(command[i].length == 3 && ((command[i][0].charCodeAt(0) >= 97 && command[i][0].charCodeAt(0) <= 104) ||
				(command[i][0].charCodeAt(0) >= 49 && command[i][0].charCodeAt(0) <= 57)) &&
				(command[i][1].charCodeAt(0) >= 97 && command[i][1].charCodeAt(0) <= 104) &&
				(command[i][2].charCodeAt(0) >= 49 && command[i][2].charCodeAt(0) <= 57))) {
					command.splice(i, 1);
					i--;
			}
		}
	}

	command = command.slice(command.length - 2, command.length);
	command = command.join("");

	return command;
}

function isSquare(command) {
	for (var i = 0; i < squares.length; i++) {
		if (command == squares[i]) {
			return true;
		}
	}
    
	return false;
}





/*

//GETS MOVES
var move = document.querySelectorAll("move");
for( var i = 0; i < move.length; i++ ) {
	//alert(move[i].innerHTML);
}







//GETS Changes
var observer = new MutationObserver(function(mutations) {
	if (document.querySelector(".result_wrap") != null) {
		//alert("END GAME");
	} else {
		//alert("Changed");
	}
});

var config = { attributes: true, childList: true, characterData: true }

//make sure .moves exists first. Uncomment the below line.
//observer.observe(document.querySelector(".moves"), config);

// later, you can stop observing
//observer.disconnect();







//Speech Synthesis
var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
msg.voiceURI = 'native';
msg.volume = 1; // 0 to 1
msg.rate = 2; // 0.1 to 2
msg.pitch = 1; //0 to 2
msg.text = 'Hello World';
msg.lang = 'en-US';

msg.onend = function(e) {
	console.log('Finished in ' + event.elapsedTime + ' seconds.');
};


speechSynthesis.speak(msg);

/*
https://codepen.io/matt-west/pen/wGzuJ
*/


//Keyboard shortcuts for ANALYSIS: lichess.org/study/vCV8kZWo#keyboard   there are more for IN GAME. look them up.