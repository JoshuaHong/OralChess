function logStorageChange() {
	var testing = chrome.storage.local.get(null, function(item) {

//If clicked on recalibrate OR storage changes, run this function ONCE. Is this really needed? hmm
		// alert("TEST");

		if (item.addonIsEnabled) {
			//alert("ENABLED");
		} else {
			//alert("DISABLED");
		}
	});
}




//When storage changes it procs. Use to check if enabled or not
chrome.storage.onChanged.addListener(logStorageChange);



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



//Not needed anymore?
var peice = "queen";
var elem = document.querySelectorAll("." + peice);

for (test of elem) {
	//alert(test.getBoundingClientRect().top + window.scrollY);
}


//This needed either?
document.addEventListener("click", printMousePos);

function printMousePos(event) {
	//alert(event.pageX);
	//alert(event.pageY);
}



//Temp button testing keypresses
var enableAddonButton = document.createElement("BUTTON");
enableAddonButton.id = "myBtn";
enableAddonButton.innerHTML = "TEST";
document.body.appendChild(enableAddonButton);



//Keypresses
var e = new KeyboardEvent('keydown',{'keyCode':13,'which':13});

document.getElementById("myBtn").addEventListener("click", function(){
	document.dispatchEvent(e);
	document.querySelector(".ready").value = "e5";
	document.dispatchEvent(e);
});



//Speech Recognition
var recognition = new webkitSpeechRecognition();

recognition.lang = 'en-US';

document.body.onclick = function() {
	recognition.start();
}

recognition.onresult = function(event) {
	if (event.results.length > 0) {
		var color = event.results[0][0].transcript;
		console.log(color);
		document.body.style.backgroundColor = color;
	}
}

recognition.onspeechend = function() {
	recognition.stop();
}

recognition.onerror = function(event) {
	console.log("Error occurred in recognition: " + event.error);
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