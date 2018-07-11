/*
	Creates the popup menu components on opening
*/
var enableAddonButton = document.createElement("BUTTON");
var recalibrateButton = document.createElement("BUTTON");
var enableBlindfoldButton = document.createElement("BUTTON");
var enableConfirmationButton = document.createElement("BUTTON");
var enableNotificationButton = document.createElement("BUTTON");
var enableTextToSpeechButton = document.createElement("BUTTON");
var volumeSlider = document.createElement("INPUT");
var rateSlider = document.createElement("INPUT");
var pitchSlider = document.createElement("INPUT");
var volumeSpan = document.createElement("SPAN");
var rateSpan = document.createElement("SPAN");
var pitchSpan = document.createElement("SPAN");
var voiceSelect = document.createElement("SELECT");
var notice = document.createTextNode("Please Use Lichess");

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

recalibrateButton.innerHTML = "Recalibrate";
enableBlindfoldButton.innerHTML = "Blindfold";
enableConfirmationButton.innerHTML = "Confirmation";
enableNotificationButton.innerHTML = "Notifications";
enableTextToSpeechButton.innerHTML = "Text To Speech";

enableAddonButton.id = "enableAddonButtonID";
recalibrateButton.id = "recalibrateButtonID";
enableBlindfoldButton.id = "enableBlindfoldButtonID";
enableConfirmationButton.id = "enableConfirmationButtonID";
enableNotificationButton.id = "enableNotificationButtonID";
enableTextToSpeechButton.id = "enableTextToSpeechButtonID";

enableAddonButton.classList.add("button");
recalibrateButton.classList.add("button");
enableBlindfoldButton.classList.add("button");
enableConfirmationButton.classList.add("button");
enableNotificationButton.classList.add("button");
enableTextToSpeechButton.classList.add("button");
volumeSlider.classList.add("slider");
rateSlider.classList.add("slider");
pitchSlider.classList.add("slider");
volumeSpan.classList.add("span");
rateSpan.classList.add("span");
pitchSpan.classList.add("span");
voiceSelect.classList.add("select");

document.body.appendChild(enableAddonButton);
document.body.appendChild(recalibrateButton);
document.body.appendChild(enableBlindfoldButton);
document.body.appendChild(enableConfirmationButton);
document.body.appendChild(enableNotificationButton);
document.body.appendChild(enableTextToSpeechButton);
document.body.appendChild(volumeSlider);
document.body.appendChild(volumeSpan);
document.body.appendChild(rateSlider);
document.body.appendChild(rateSpan);
document.body.appendChild(pitchSlider);
document.body.appendChild(pitchSpan);
document.body.appendChild(voiceSelect);

/*
	Checks for Chrome browser
*/
if (navigator.userAgent.indexOf("Chrome") != -1) {
	chrome.storage.local.set({
		isChrome: true
	});
} else {
	document.body.innerHTML = "Please use Chrome";  //@@@@@@@@@@@@@@@@@@@@@@@@@@ Make notices pretty. See below (make it flash if clicked refesh without being on Lichess)
}


/*
	Checks for Lichess URL
*/
chrome.tabs.getSelected(null, function(tab){
	if (tab.url.indexOf("lichess.org") == -1) {
		document.body.appendChild(notice);  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Notices shoudl have its own div/class not just innerHTML
	}
});

/*chrome.browserAction.setIcon({
	path : {
		"16": "icons/iconEnabled16.png",
		"24": "icons/iconEnabled24.png",
		"32": "icons/iconEnabled32.png"
	}
});*/

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
		recalibrateButton.style.display = "none";
		enableBlindfoldButton.style.display = "none";
		enableConfirmationButton.style.display = "none";
		enableNotificationButton.style.display = "none";
		enableTextToSpeechButton.style.display = "none";
		volumeSlider.style.display = "none";
		rateSlider.style.display = "none";
		pitchSlider.style.display = "none";
		volumeSpan.style.display = "none";
		rateSpan.style.display = "none";
		pitchSpan.style.display = "none";
		voiceSelect.style.display = "none";
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
		volumeSlider.style.display = "none";
		rateSlider.style.display = "none";
		pitchSlider.style.display = "none";
		volumeSpan.style.display = "none";
		rateSpan.style.display = "none";
		pitchSpan.style.display = "none";
		voiceSelect.style.display = "none";
	} else {
		enableTextToSpeechButton.value = "enabled";
		enableTextToSpeechButton.classList.remove("disabled");
		enableTextToSpeechButton.classList.add("enabled");
	}

	if (item != null && item.volumeValue != null) {
		volumeSlider.value = item.volumeValue;
		volumeSpan.innerHTML = item.volumeValue;
	} else {
		volumeSlider.value = "0.5";
		volumeSpan.innerHTML = "0.5";
	}

	if (item != null && item.rateValue != null) {
		rateSlider.value = item.rateValue;
		rateSpan.innerHTML = item.rateValue;
	} else {
		rateSlider.value = "1";
		rateSpan.innerHTML = "1";
	}

	if (item != null && item.pitchValue != null) {
		pitchSlider.value = item.pitchValue;
		pitchSpan.innerHTML = item.pitchValue;
	} else {
		pitchSlider.value = "1";
		pitchSpan.innerHTML = "1";
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
			recalibrateButton.style.display = "none";
			enableBlindfoldButton.style.display = "none";
			enableConfirmationButton.style.display = "none";
			enableNotificationButton.style.display = "none";
			enableTextToSpeechButton.style.display = "none";
			volumeSlider.style.display = "none";
			rateSlider.style.display = "none";
			pitchSlider.style.display = "none";
			volumeSpan.style.display = "none";
			rateSpan.style.display = "none";
			pitchSpan.style.display = "none";
			voiceSelect.style.display = "none";
		} else {
			chrome.storage.local.set({
				addonIsEnabled: true
			});
			enableAddonButton.value = "enabled";
			enableAddonButton.innerHTML = "Enabled";
			enableAddonButton.classList.remove("disabled");
			enableAddonButton.classList.add("enabled");
			recalibrateButton.style.display = "block";
			enableBlindfoldButton.style.display = "block";
			enableConfirmationButton.style.display = "block";
			enableNotificationButton.style.display = "block";
			enableTextToSpeechButton.style.display = "block";

			if (enableTextToSpeechButton.value == "enabled") {
				volumeSlider.style.display = "block";
				rateSlider.style.display = "block";
				pitchSlider.style.display = "block";
				volumeSpan.style.display = "block";
				rateSpan.style.display = "block";
				pitchSpan.style.display = "block";
				voiceSelect.style.display = "block";
			}
		}
	} else if (event.target.id == "recalibrateButtonID") {
		chrome.tabs.getSelected(null, function(tab){
			if (tab.url.indexOf("lichess.org") > -1) {
				chrome.tabs.reload({bypassCache: true});
			} else {
				//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Make it flash or something @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
			}
		});
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
			volumeSlider.style.display = "block";
			rateSlider.style.display = "block";
			pitchSlider.style.display = "block";
			volumeSpan.style.display = "block";
			rateSpan.style.display = "block";
			pitchSpan.style.display = "block";
			voiceSelect.style.display = "block";
		} else {
			chrome.storage.local.set({
				textToSpeechIsEnabled: false
			});
			enableTextToSpeechButton.value = "disabled";
			enableTextToSpeechButton.classList.remove("enabled");
			enableTextToSpeechButton.classList.add("disabled");
			volumeSlider.style.display = "none";
			rateSlider.style.display = "none";
			pitchSlider.style.display = "none";
			volumeSpan.style.display = "none";
			rateSpan.style.display = "none";
			pitchSpan.style.display = "none";
			voiceSelect.style.display = "none";
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
	volumeSpan.innerHTML = volumeSlider.value;
});

rateSlider.addEventListener("input", function() {
	chrome.storage.local.set({
		rateValue: rateSlider.value
	});
	rateSpan.innerHTML = rateSlider.value;
});

pitchSlider.addEventListener("input", function() {
	chrome.storage.local.set({
		pitchValue: pitchSlider.value
	});
	pitchSpan.innerHTML = pitchSlider.value;
});

voiceSelect.addEventListener("input", function() {
	chrome.storage.local.set({
		voiceValue: voiceSelect.selectedIndex
	});
});