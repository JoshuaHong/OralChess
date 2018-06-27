/*
	Creates the popup menu components on opening
*/
var enableAddonButton = document.createElement("BUTTON");
var recalibrateButton = document.createElement("BUTTON");
var enableBlindfoldButton = document.createElement("BUTTON");
var enableConfirmationButton = document.createElement("BUTTON");
var enableTextToSpeechButton = document.createElement("BUTTON");
var notice = document.createTextNode("Please Use Lichess");

recalibrateButton.innerHTML = "Recalibrate";
enableBlindfoldButton.innerHTML = "Blindfold Mode";
enableConfirmationButton.innerHTML = "Confirmation Mode";
enableTextToSpeechButton.innerHTML = "Text To Speech";

enableAddonButton.id = "enableAddonButtonID";
recalibrateButton.id = "recalibrateButtonID";
enableBlindfoldButton.id = "enableBlindfoldButtonID";
enableConfirmationButton.id = "enableConfirmationButtonID";
enableTextToSpeechButton.id = "enableTextToSpeechButtonID";

enableAddonButton.classList.add("button");
recalibrateButton.classList.add("button");
enableBlindfoldButton.classList.add("button");
enableConfirmationButton.classList.add("button");
enableTextToSpeechButton.classList.add("button");

document.body.appendChild(enableAddonButton);
document.body.appendChild(recalibrateButton);
document.body.appendChild(enableBlindfoldButton);
document.body.appendChild(enableConfirmationButton);
document.body.appendChild(enableTextToSpeechButton);


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
		enableTextToSpeechButton.style.display = "none";
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

	if (item != null && item.textToSpeechIsEnabled != null && !item.textToSpeechIsEnabled) {
		enableTextToSpeechButton.value = "disabled";
		enableTextToSpeechButton.classList.remove("enabled");
		enableTextToSpeechButton.classList.add("disabled");
	} else {
		enableTextToSpeechButton.value = "enabled";
		enableTextToSpeechButton.classList.remove("disabled");
		enableTextToSpeechButton.classList.add("enabled");
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
			enableTextToSpeechButton.style.display = "none";
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
			enableTextToSpeechButton.style.display = "block";
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