/*
	Creates the popup menu components on opening
*/
var enableAddonButton = document.createElement("BUTTON");
var enableBlindfoldButton = document.createElement("BUTTON");
var enableConfirmationButton = document.createElement("BUTTON");
var enableNotificationButton = document.createElement("BUTTON");
var enableTextToSpeechButton = document.createElement("BUTTON");

var volumeDiv = document.createElement("DIV");
var rateDiv = document.createElement("DIV");
var pitchDiv = document.createElement("DIV");
var voiceDiv = document.createElement("DIV");

var volumeSpan = document.createElement("SPAN");
var rateSpan = document.createElement("SPAN");
var pitchSpan = document.createElement("SPAN");
var voiceSpan = document.createElement("SPAN");

var volumeSlider = document.createElement("INPUT");
var rateSlider = document.createElement("INPUT");
var pitchSlider = document.createElement("INPUT");
var voiceSelect = document.createElement("SELECT");

var volumeValueSpan = document.createElement("SPAN");
var rateValueSpan = document.createElement("SPAN");
var pitchValueSpan = document.createElement("SPAN");

var notice = document.createElement("SPAN");

volumeSlider.type = "range";
rateSlider.type = "range";
pitchSlider.type = "range";

volumeSlider.min = "0.1";
rateSlider.min = "0.1";
pitchSlider.min = "0.1";

volumeSlider.max = "1";
rateSlider.max = "2";
pitchSlider.max = "2";

volumeSlider.step = "0.1";
rateSlider.step = "0.1";
pitchSlider.step = "0.1";

enableBlindfoldButton.innerHTML = "Blindfold";
enableConfirmationButton.innerHTML = "Confirmation";
enableNotificationButton.innerHTML = "Notifications";
enableTextToSpeechButton.innerHTML = "Text To Speech";
volumeSpan.innerHTML = "Volume";
rateSpan.innerHTML = "Rate";
pitchSpan.innerHTML = "Pitch";
voiceSpan.innerHTML = "Voice";

enableAddonButton.id = "enableAddonButtonID";
enableBlindfoldButton.id = "enableBlindfoldButtonID";
enableConfirmationButton.id = "enableConfirmationButtonID";
enableNotificationButton.id = "enableNotificationButtonID";
enableTextToSpeechButton.id = "enableTextToSpeechButtonID";

enableAddonButton.classList.add("enableButton");
enableBlindfoldButton.classList.add("button");
enableConfirmationButton.classList.add("button");
enableNotificationButton.classList.add("button");
enableTextToSpeechButton.classList.add("button");
volumeDiv.classList.add("div");
rateDiv.classList.add("div");
pitchDiv.classList.add("div");
voiceDiv.classList.add("div");
volumeSpan.classList.add("span");
rateSpan.classList.add("span");
pitchSpan.classList.add("span");
voiceSpan.classList.add("span");
volumeSlider.classList.add("slider");
rateSlider.classList.add("slider");
pitchSlider.classList.add("slider");
voiceSelect.classList.add("select");
volumeValueSpan.classList.add("valueSpan");
rateValueSpan.classList.add("valueSpan");
pitchValueSpan.classList.add("valueSpan");
notice.classList.add("notice");

document.body.appendChild(enableAddonButton);
document.body.appendChild(enableBlindfoldButton);
document.body.appendChild(enableConfirmationButton);
document.body.appendChild(enableNotificationButton);
document.body.appendChild(enableTextToSpeechButton);
volumeDiv.appendChild(volumeSpan);
volumeDiv.appendChild(volumeSlider);
volumeDiv.appendChild(volumeValueSpan);
rateDiv.appendChild(rateSpan);
rateDiv.appendChild(rateSlider);
rateDiv.appendChild(rateValueSpan);
pitchDiv.appendChild(pitchSpan);
pitchDiv.appendChild(pitchSlider);
pitchDiv.appendChild(pitchValueSpan);
voiceDiv.appendChild(voiceSpan);
voiceDiv.appendChild(voiceSelect);
document.body.appendChild(volumeDiv);
document.body.appendChild(rateDiv);
document.body.appendChild(pitchDiv);
document.body.appendChild(voiceDiv);

/*
	Checks for Chrome browser
*/
if (navigator.userAgent.indexOf("Chrome") != -1) {
	chrome.storage.local.set({
		isChrome: true
	});
} else {
	enableAddonButton.style.display = "none";
	enableBlindfoldButton.style.display = "none";
	enableConfirmationButton.style.display = "none";
	enableNotificationButton.style.display = "none";
	enableTextToSpeechButton.style.display = "none";
	volumeDiv.style.display = "none";
	rateDiv.style.display = "none";
	pitchDiv.style.display = "none";
	voiceDiv.style.display = "none";
	notice.innerHTML = "<br> Please use Chrome";
	document.body.appendChild(notice);
}


/*
	Checks for Lichess URL
*/
chrome.tabs.getSelected(null, function(tab) {
	if (tab.url.indexOf("lichess.org") == -1) {
		notice.innerHTML = "<br><hr> Please use Lichess";
		document.body.appendChild(notice);
	} else {
		chrome.storage.local.get(null, function(item) {
			if (item != null && item.isReady && item.isPlaying) {
				notice.innerHTML = "<br><hr> Joshua Hong";
				document.body.appendChild(notice);
			} else if (item != null && item.isPlaying && !item.isReady) {
				notice.innerHTML = "<br><hr> Please enable keyboard input";
				document.body.appendChild(notice);
			} else {
				notice.innerHTML = "<br><hr> Please join a game";
				document.body.appendChild(notice);
			}
		});
	}
});


/*
	Edits popup menu components based on previously stored data
*/
chrome.storage.local.get(null, function(item) {
	if (item != null && item.addonIsEnabled != null && item.addonIsEnabled) {
		enableAddonButton.innerHTML = "Enabled";
		enableAddonButton.value = "enabled";
		enableAddonButton.classList.remove("disabled");
		enableAddonButton.classList.add("enabled");
	} else {
		enableAddonButton.innerHTML = "Disabled";
		enableAddonButton.value = "disabled";
		enableAddonButton.classList.remove("enabled");
		enableAddonButton.classList.add("disabled");
		enableBlindfoldButton.style.display = "none";
		enableConfirmationButton.style.display = "none";
		enableNotificationButton.style.display = "none";
		enableTextToSpeechButton.style.display = "none";
		volumeDiv.style.display = "none";
		rateDiv.style.display = "none";
		pitchDiv.style.display = "none";
		voiceDiv.style.display = "none";
	}

	if (item != null && item.blindfoldIsEnabled != null && item.blindfoldIsEnabled) {
		enableBlindfoldButton.value = "enabled";
		enableBlindfoldButton.classList.remove("disabled");
		enableBlindfoldButton.classList.add("enabled");
	} else {
		enableBlindfoldButton.value = "disabled";
		enableBlindfoldButton.classList.remove("enabled");
		enableBlindfoldButton.classList.add("disabled");
	}

	if (item != null && item.confirmationIsEnabled != null && !item.confirmationIsEnabled) {
		enableConfirmationButton.value = "disabled";
		enableConfirmationButton.classList.remove("enabled");
		enableConfirmationButton.classList.add("disabled");
	} else {
		enableConfirmationButton.value = "enabled";
		enableConfirmationButton.classList.remove("disabled");
		enableConfirmationButton.classList.add("enabled");
	}

	if (item != null && item.notificationIsEnabled != null && !item.notificationIsEnabled) {
		enableNotificationButton.value = "disabled";
		enableNotificationButton.classList.remove("enabled");
		enableNotificationButton.classList.add("disabled");
	} else {
		enableNotificationButton.value = "enabled";
		enableNotificationButton.classList.remove("disabled");
		enableNotificationButton.classList.add("enabled");
	}

	if (item != null && item.textToSpeechIsEnabled != null && !item.textToSpeechIsEnabled) {
		enableTextToSpeechButton.value = "disabled";
		enableTextToSpeechButton.classList.remove("enabled");
		enableTextToSpeechButton.classList.add("disabled");
		volumeDiv.style.display = "none";
		rateDiv.style.display = "none";
		pitchDiv.style.display = "none";
		voiceDiv.style.display = "none";
	} else {
		enableTextToSpeechButton.value = "enabled";
		enableTextToSpeechButton.classList.remove("disabled");
		enableTextToSpeechButton.classList.add("enabled");
	}

	if (item != null && item.volumeValue != null) {
		volumeSlider.value = item.volumeValue;
		volumeValueSpan.innerHTML = item.volumeValue;
	} else {
		volumeSlider.value = "1";
		volumeValueSpan.innerHTML = "1";
	}

	if (item != null && item.rateValue != null) {
		rateSlider.value = item.rateValue;
		rateValueSpan.innerHTML = item.rateValue;
	} else {
		rateSlider.value = "1";
		rateValueSpan.innerHTML = "1";
	}

	if (item != null && item.pitchValue != null) {
		pitchSlider.value = item.pitchValue;
		pitchValueSpan.innerHTML = item.pitchValue;
	} else {
		pitchSlider.value = "1";
		pitchValueSpan.innerHTML = "1";
	}

	if (item != null && item.voiceValue != null) {
		voiceSelect.selectedIndex = item.voiceValue;
	}
});


/*
	Performs actions based on chosen menu item
*/
document.addEventListener("click", function(event) {
	if (event.target.id == "enableAddonButtonID") {
		if (enableAddonButton.value == "enabled") {
			chrome.storage.local.set({
				addonIsEnabled: false
			});
			enableAddonButton.value = "disabled";
			enableAddonButton.innerHTML = "Disabled";
			enableAddonButton.classList.remove("enabled");
			enableAddonButton.classList.add("disabled");
			enableBlindfoldButton.style.display = "none";
			enableConfirmationButton.style.display = "none";
			enableNotificationButton.style.display = "none";
			enableTextToSpeechButton.style.display = "none";
			volumeDiv.style.display = "none";
			rateDiv.style.display = "none";
			pitchDiv.style.display = "none";
			voiceDiv.style.display = "none";
		} else {
			chrome.storage.local.set({
				addonIsEnabled: true
			});
			enableAddonButton.value = "enabled";
			enableAddonButton.innerHTML = "Enabled";
			enableAddonButton.classList.remove("disabled");
			enableAddonButton.classList.add("enabled");
			enableBlindfoldButton.style.display = "block";
			enableConfirmationButton.style.display = "block";
			enableNotificationButton.style.display = "block";
			enableTextToSpeechButton.style.display = "block";

			if (enableTextToSpeechButton.value == "enabled") {
				volumeDiv.style.display = "flex";
				rateDiv.style.display = "flex";
				pitchDiv.style.display = "flex";
				voiceDiv.style.display = "flex";
			}
		}
	} else if (event.target.id == "enableBlindfoldButtonID") {
		if (enableBlindfoldButton.value == "enabled") {
			chrome.storage.local.set({
				blindfoldIsEnabled: false
			});
			enableBlindfoldButton.value = "disabled";
			enableBlindfoldButton.classList.remove("enabled");
			enableBlindfoldButton.classList.add("disabled");
		} else {
			chrome.storage.local.set({
				blindfoldIsEnabled: true
			});
			enableBlindfoldButton.value = "enabled";
			enableBlindfoldButton.classList.remove("disabled");
			enableBlindfoldButton.classList.add("enabled");
		}
	} else if (event.target.id == "enableConfirmationButtonID") {
		if (enableConfirmationButton.value == "disabled") {
			chrome.storage.local.set({
				confirmationIsEnabled: true
			});
			enableConfirmationButton.value = "enabled";
			enableConfirmationButton.classList.remove("disabled");
			enableConfirmationButton.classList.add("enabled");
		} else {
			chrome.storage.local.set({
				confirmationIsEnabled: false
			});
			enableConfirmationButton.value = "disabled";
			enableConfirmationButton.classList.remove("enabled");
			enableConfirmationButton.classList.add("disabled");
		}
	} else if (event.target.id == "enableNotificationButtonID") {
		if (enableNotificationButton.value == "disabled") {
			chrome.storage.local.set({
				notificationIsEnabled: true
			});
			enableNotificationButton.value = "enabled";
			enableNotificationButton.classList.remove("disabled");
			enableNotificationButton.classList.add("enabled");
		} else {
			chrome.storage.local.set({
				notificationIsEnabled: false
			});
			enableNotificationButton.value = "disabled";
			enableNotificationButton.classList.remove("enabled");
			enableNotificationButton.classList.add("disabled");
		}
	} else if (event.target.id == "enableTextToSpeechButtonID") {
		if (enableTextToSpeechButton.value == "disabled") {
			chrome.storage.local.set({
				textToSpeechIsEnabled: true
			});
			enableTextToSpeechButton.value = "enabled";
			enableTextToSpeechButton.classList.remove("disabled");
			enableTextToSpeechButton.classList.add("enabled");
			volumeDiv.style.display = "flex";
			rateDiv.style.display = "flex";
			pitchDiv.style.display = "flex";
			voiceDiv.style.display = "flex";
		} else {
			chrome.storage.local.set({
				textToSpeechIsEnabled: false
			});
			enableTextToSpeechButton.value = "disabled";
			enableTextToSpeechButton.classList.remove("enabled");
			enableTextToSpeechButton.classList.add("disabled");
			volumeDiv.style.display = "none";
			rateDiv.style.display = "none";
			pitchDiv.style.display = "none";
			voiceDiv.style.display = "none";
		}
	}
});

//loads voices
window.speechSynthesis.onvoiceschanged = function(e) {
	var voices = speechSynthesis.getVoices();

	voices.forEach(function(voice, i) {
		var option = document.createElement('option');
		option.innerHTML = voice.name;
		voiceSelect.appendChild(option);
	});
};

volumeSlider.addEventListener("input", function() {
	chrome.storage.local.set({
		volumeValue: volumeSlider.value
	});
	volumeValueSpan.innerHTML = volumeSlider.value;
});

rateSlider.addEventListener("input", function() {
	chrome.storage.local.set({
		rateValue: rateSlider.value
	});
	rateValueSpan.innerHTML = rateSlider.value;
});

pitchSlider.addEventListener("input", function() {
	chrome.storage.local.set({
		pitchValue: pitchSlider.value
	});
	pitchValueSpan.innerHTML = pitchSlider.value;
});

voiceSelect.addEventListener("input", function() {
	chrome.storage.local.set({
		voiceValue: voiceSelect.selectedIndex
	});
});