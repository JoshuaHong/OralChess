function onError(error) {
	console.log('Error: ${error}');
}

function onGot(item) {
	localStorage.setItem(item.activeTabID, item.activeTabID);
	alert(localStorage.getItem(item.activeTabID));

	if (item.addonIsEnabled) {
	} else {
	}
}

var testing = browser.storage.local.get();
testing.then(onGot, onError);