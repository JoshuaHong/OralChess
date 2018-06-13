/*
	Creates the popup menu components on opening
	Retrieves previously stored data
*/
var startup = browser.storage.local.get("addonIsEnabled");
startup.then(onOpen, onError);

function onOpen(item) {
	var enableAddonButton = document.createElement("BUTTON");
	enableAddonButton.id = "enableAddonButtonID";

	if (item.addonIsEnabled == false) {
		text = document.createTextNode("Disabled");
		enableAddonButton.appendChild(text);
		document.body.appendChild(enableAddonButton);
		enableAddonButton.value = "disabled";
	} else {
		text = document.createTextNode("Enabled");
		enableAddonButton.appendChild(text);
		document.body.appendChild(enableAddonButton);
		enableAddonButton.value = "enabled";
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
		if(event.target.value == "disabled") {
			browser.storage.local.set({
				addonIsEnabled: true
			});
			event.target.value = "enabled";
			event.target.innerHTML = "Enabled";
		} else {
			browser.storage.local.set({
				addonIsEnabled: false
			});
			event.target.value = "disabled";
			event.target.innerHTML = "Disabled";
		}
	} else {
		
	}
});