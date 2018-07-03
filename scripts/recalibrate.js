var commands = ["knight", "bishop", "rook", "queen", "king"];

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
			command = command.toLowerCase();
			
			for (i = 0; i < commands.length; i++) {
				if (i <= 0) {
					command = command.replace(new RegExp(commands[i], 'g'), 'N');
				} else if (i <= 1) {
					command = command.replace(new RegExp(commands[i], 'g'), 'B');
				} else if (i <= 2) {
					command = command.replace(new RegExp(commands[i], 'g'), 'R');
				} else if (i <= 3) {
					command = command.replace(new RegExp(commands[i], 'g'), 'Q');
				} else if (i <= 4) {
					command = command.replace(new RegExp(commands[i], 'g'), 'K');
				}
			}

			
			for (i = 0; i < commands.length; i++) {
				if (!command.includes(commands[i])) {

				}
			}
			

			console.log(command);
			
			
			if (command == "Bishop") {
				document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':13,'which':13}));
				document.querySelector(".ready").value = "e5";
				//document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':13,'which':13}));
			} else {
				//WORKS!
				//if .takeback-yes exists CHECK
				document.querySelector(".takeback-yes").click();
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