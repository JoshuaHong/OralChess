/*
	Creates the popup menu components on opening
*/
var enableAddonButton = document.createElement("BUTTON");
var automaticallyRecalibrateButton = document.createElement("BUTTON");
var manuallyRecalibrateButton = document.createElement("BUTTON");
var enableBlindfoldButton = document.createElement("BUTTON");
var enableTextToSpeechButton = document.createElement("BUTTON");

automaticallyRecalibrateButton.innerHTML = "Automatically Recalibrate";
manuallyRecalibrateButton.innerHTML = "Manually Recalibrate";
enableBlindfoldButton.innerHTML = "Blindfold Mode";
enableTextToSpeechButton.innerHTML = "Text To Speech";

enableAddonButton.id = "enableAddonButtonID";
automaticallyRecalibrateButton.id = "automaticallyRecalibrateButtonID";
manuallyRecalibrateButton.id = "manuallyRecalibrateButtonID";
enableBlindfoldButton.id = "enableBlindfoldButtonID";
enableTextToSpeechButton.id = "enableTextToSpeechButtonID";

enableAddonButton.classList.add("button");
automaticallyRecalibrateButton.classList.add("button");
manuallyRecalibrateButton.classList.add("button");
enableBlindfoldButton.classList.add("button");
enableTextToSpeechButton.classList.add("button");

document.body.appendChild(enableAddonButton);
document.body.appendChild(automaticallyRecalibrateButton);
document.body.appendChild(manuallyRecalibrateButton);
document.body.appendChild(enableBlindfoldButton);
document.body.appendChild(enableTextToSpeechButton);


/*
	Edits popup menu components
	Based on previously stored data
*/
var startup = browser.storage.local.get();
startup.then(onOpen, onError);

function onOpen(item) {
	if (item != null && item.addonIsEnabled != null && !item.addonIsEnabled) {
		enableAddonButton.innerHTML = "Disabled";
		enableAddonButton.value = "disabled";
		enableAddonButton.classList.remove("enabled");
		enableAddonButton.classList.add("disabled");
		automaticallyRecalibrateButton.style.display = "none";
		manuallyRecalibrateButton.style.display = "none";
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
}

function onError(error) {
	console.log('Error: ${error}');
}


/*
	Performs actions based on chosen menu item
*/
document.addEventListener("click", function(event) {
	if (event.target.id == "enableAddonButtonID") {
		if (enableAddonButton.value == "disabled") {
			browser.storage.local.set({
				addonIsEnabled: true
			});
			enableAddonButton.value = "enabled";
			enableAddonButton.innerHTML = "Enabled";
			enableAddonButton.classList.remove("disabled");
			enableAddonButton.classList.add("enabled");
			automaticallyRecalibrateButton.style.display = "block";
			manuallyRecalibrateButton.style.display = "block";
			enableBlindfoldButton.style.display = "block";
			enableTextToSpeechButton.style.display = "block";
		} else {
			browser.storage.local.set({
				addonIsEnabled: false
			});
			enableAddonButton.value = "disabled";
			enableAddonButton.innerHTML = "Disabled";
			enableAddonButton.classList.remove("enabled");
			enableAddonButton.classList.add("disabled");
			automaticallyRecalibrateButton.style.display = "none";
			manuallyRecalibrateButton.style.display = "none";
			enableBlindfoldButton.style.display = "none";
			enableTextToSpeechButton.style.display = "none";
		}
	} else if (event.target.id == "automaticallyRecalibrateButtonID") {
		
	} else if (event.target.id == "manuallyRecalibrateButtonID") {

	} else if (event.target.id == "enableBlindfoldButtonID") {
		if (enableBlindfoldButton.value == "enabled") {
			browser.storage.local.set({
				blindfoldIsEnabled: false
			});
			enableBlindfoldButton.value = "disabled";
			enableBlindfoldButton.classList.remove("enabled");
			enableBlindfoldButton.classList.add("disabled");
		} else {
			browser.storage.local.set({
				blindfoldIsEnabled: true
			});
			enableBlindfoldButton.value = "enabled";
			enableBlindfoldButton.classList.remove("disabled");
			enableBlindfoldButton.classList.add("enabled");
		}
	} else if (event.target.id == "enableTextToSpeechButtonID") {
		if (enableTextToSpeechButton.value == "disabled") {
			browser.storage.local.set({
				textToSpeechIsEnabled: true
			});
			enableTextToSpeechButton.value = "enabled";
			enableTextToSpeechButton.classList.remove("disabled");
			enableTextToSpeechButton.classList.add("enabled");
		} else {
			browser.storage.local.set({
				textToSpeechIsEnabled: false
			});
			enableTextToSpeechButton.value = "disabled";
			enableTextToSpeechButton.classList.remove("enabled");
			enableTextToSpeechButton.classList.add("disabled");
		}
	}
});