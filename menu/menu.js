/*
	Creates the popup menu components on opening
*/
var enableAddonButton = document.createElement("BUTTON");
var automaticallyRecalibrateButton = document.createElement("BUTTON");
var manuallyRecalibrateButton = document.createElement("BUTTON");
var enableBlindfoldModeButton = document.createElement("BUTTON");
var enableTextToSpeechButton = document.createElement("BUTTON");

automaticallyRecalibrateButton.innerHTML = "Automatically Recalibrate";
manuallyRecalibrateButton.innerHTML = "Manually Recalibrate";
enableBlindfoldModeButton.innerHTML = "Blindfold Mode";
enableTextToSpeechButton.innerHTML = "Text To Speech";

enableAddonButton.id = "enableAddonButtonID";
automaticallyRecalibrateButton.id = "automaticallyRecalibrateButtonID";
manuallyRecalibrateButton.id = "manuallyRecalibrateButtonID";
enableBlindfoldModeButton.id = "enableBlindfoldModeButtonID";
enableTextToSpeechButton.id = "enableTextToSpeechButtonID";

enableAddonButton.classList.add("button");
automaticallyRecalibrateButton.classList.add("button");
manuallyRecalibrateButton.classList.add("button");
enableBlindfoldModeButton.classList.add("button");
enableTextToSpeechButton.classList.add("button");

document.body.appendChild(enableAddonButton);
document.body.appendChild(automaticallyRecalibrateButton);
document.body.appendChild(manuallyRecalibrateButton);
document.body.appendChild(enableBlindfoldModeButton);
document.body.appendChild(enableTextToSpeechButton);


/*
	Edits popup menu components
	Based on previously stored data
*/
var startup = browser.storage.local.get();
startup.then(onOpen, onError);

function onOpen(item) {
	if (item.menu != null && !item.menu.addonIsEnabled) {
		enableAddonButton.innerHTML = "Disabled";
		enableAddonButton.value = "disabled";
		enableAddonButton.classList.remove("enabled");
		enableAddonButton.classList.add("disabled");
		automaticallyRecalibrateButton.style.display = "none";
		manuallyRecalibrateButton.style.display = "none";
		enableBlindfoldModeButton.style.display = "none";
		enableTextToSpeechButton.style.display = "none";
	} else {
		enableAddonButton.innerHTML = "Enabled";
		enableAddonButton.value = "enabled";
		enableAddonButton.classList.remove("disabled");
		enableAddonButton.classList.add("enabled");

		if (item.menu == null) {
			//FILL ME
		}
		

		//continue the if statements here for tts and blindfold
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
		if (event.target.value == "disabled") {
			browser.storage.local.set({
				menu: {addonIsEnabled: true}
			});
			event.target.value = "enabled";
			event.target.innerHTML = "Enabled";
			enableAddonButton.classList.remove("disabled");
			enableAddonButton.classList.add("enabled");
			automaticallyRecalibrateButton.style.display = "block";
			manuallyRecalibrateButton.style.display = "block";
			enableBlindfoldModeButton.style.display = "block";
			enableTextToSpeechButton.style.display = "block";
		} else {
			browser.storage.local.set({
				menu: {addonIsEnabled: false}
			});
			event.target.value = "disabled";
			event.target.innerHTML = "Disabled";
			enableAddonButton.classList.remove("enabled");
			enableAddonButton.classList.add("disabled");
			automaticallyRecalibrateButton.style.display = "none";
			manuallyRecalibrateButton.style.display = "none";
			enableBlindfoldModeButton.style.display = "none";
			enableTextToSpeechButton.style.display = "none";
		}
	} else if (true) {
		
	}
});