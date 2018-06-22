/*
	Creates the popup menu components on opening
*/
var enableAddonButton = document.createElement("BUTTON");
var recalibrateButton = document.createElement("BUTTON");
var enableBlindfoldButton = document.createElement("BUTTON");
var enableTextToSpeechButton = document.createElement("BUTTON");

recalibrateButton.innerHTML = "Recalibrate";
enableBlindfoldButton.innerHTML = "Blindfold Mode";
enableTextToSpeechButton.innerHTML = "Text To Speech";

enableAddonButton.id = "enableAddonButtonID";
recalibrateButton.id = "recalibrateButtonID";
enableBlindfoldButton.id = "enableBlindfoldButtonID";
enableTextToSpeechButton.id = "enableTextToSpeechButtonID";

enableAddonButton.classList.add("button");
recalibrateButton.classList.add("button");
enableBlindfoldButton.classList.add("button");
enableTextToSpeechButton.classList.add("button");

document.body.appendChild(enableAddonButton);
document.body.appendChild(recalibrateButton);
document.body.appendChild(enableBlindfoldButton);
document.body.appendChild(enableTextToSpeechButton);


/*
	Edits popup menu components
	Based on previously stored data
*/
chrome.storage.local.get(null, function(item) {
	if (item != null && item.addonIsEnabled != null && !item.addonIsEnabled) {
		enableAddonButton.innerHTML = "Disabled";
		enableAddonButton.value = "disabled";
		enableAddonButton.classList.remove("enabled");
		enableAddonButton.classList.add("disabled");
		recalibrateButton.style.display = "none";
		enableBlindfoldButton.style.display = "none";
		enableTextToSpeechButton.style.display = "none";
	} else {
		enableAddonButton.innerHTML = "Enabled";
		enableAddonButton.value = "enabled";
		enableAddonButton.classList.remove("disabled");
		enableAddonButton.classList.add("enabled");
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

	if (item != null && item.textToSpeechIsEnabled != null && !item.textToSpeechIsEnabled) {
		enableTextToSpeechButton.value = "disabled";
		enableTextToSpeechButton.classList.remove("enabled");
		enableTextToSpeechButton.classList.add("disabled");
	} else {
		enableTextToSpeechButton.value = "enabled";
		enableTextToSpeechButton.classList.remove("disabled");
		enableTextToSpeechButton.classList.add("enabled");
	}

	if (item != null && item.recalibrateIsEnabled != null && !item.recalibrateIsEnabled) {
		recalibrateButton.value = "disabled";
	} else {
		recalibrateButton.value = "enabled";
	}
});


/*
	Performs actions based on chosen menu item
*/
document.addEventListener("click", function(event) {
	if (event.target.id == "enableAddonButtonID") {
		if (enableAddonButton.value == "disabled") {
			chrome.storage.local.set({
				addonIsEnabled: true
			});
			enableAddonButton.value = "enabled";
			enableAddonButton.innerHTML = "Enabled";
			enableAddonButton.classList.remove("disabled");
			enableAddonButton.classList.add("enabled");
			recalibrateButton.style.display = "block";
			enableBlindfoldButton.style.display = "block";
			enableTextToSpeechButton.style.display = "block";
		} else {
			chrome.storage.local.set({
				addonIsEnabled: false
			});
			enableAddonButton.value = "disabled";
			enableAddonButton.innerHTML = "Disabled";
			enableAddonButton.classList.remove("enabled");
			enableAddonButton.classList.add("disabled");
			recalibrateButton.style.display = "none";
			enableBlindfoldButton.style.display = "none";
			enableTextToSpeechButton.style.display = "none";
		}
	} else if (event.target.id == "recalibrateButtonID") {
		if (recalibrateButton.value == "enabled") {
			chrome.storage.local.set({
				recalibrateIsEnabled: false
			});
			enableBlindfoldButton.value = "disabled";
		} else {
			chrome.storage.local.set({
				recalibrateIsEnabled: true
			});
			enableBlindfoldButton.value = "enabled";
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
	} else if (event.target.id == "enableTextToSpeechButtonID") {
		if (enableTextToSpeechButton.value == "disabled") {
			chrome.storage.local.set({
				textToSpeechIsEnabled: true
			});
			enableTextToSpeechButton.value = "enabled";
			enableTextToSpeechButton.classList.remove("disabled");
			enableTextToSpeechButton.classList.add("enabled");
		} else {
			chrome.storage.local.set({
				textToSpeechIsEnabled: false
			});
			enableTextToSpeechButton.value = "disabled";
			enableTextToSpeechButton.classList.remove("enabled");
			enableTextToSpeechButton.classList.add("disabled");
		}
	}
});