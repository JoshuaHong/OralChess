/*
	Verifies if enabled on Chrome
*/
run();

chrome.storage.onChanged.addListener(function(changes, area) {
	run();
});




function run() {
	chrome.storage.local.get(null, function(item) {
		if (item.isChrome && item.addonIsEnabled && localStorage.getItem("loading") != "true") {

			localStorage.setItem("loading", true);

			setTimeout(function() {

				localStorage.setItem("loading", false);

				if (document.querySelector("#lichess") != null && document.querySelector(".ready") != null) {
					var recognition = new webkitSpeechRecognition();
					recognition.lang = 'en-US';
					recognition.start();
					var end;

					recognition.onresult = function(event) {
						if (event.results.length > 0) {
							var end = false;
							var command = event.results[0][0].transcript;
							console.log(command);
						}
					}

					recognition.onend = function() {
						console.log("END");
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
						if (localStorage.getItem("loading") != "true") {
							console.log("focus");
							end = false;
							run();
							//recognition.start();
						}
					});

					window.addEventListener('blur', function() {
						console.log("blur");
						end = true;
						recognition.stop();
					});

					chrome.storage.onChanged.addListener(function() {
						end = true;
						recognition.stop();
					});
				}
			}, 3000);
		}
	});
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






//Keypresses
var e = new KeyboardEvent('keydown',{'keyCode':13,'which':13});

document.getElementById("myBtn").addEventListener("click", function(){
	document.dispatchEvent(e);
	document.querySelector(".ready").value = "e5";
	document.dispatchEvent(e);
});









recognition.onspeechend = function() {
	recognition.stop();
}






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