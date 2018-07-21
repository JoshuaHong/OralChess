/*
	Sets addon icon on startup
*/
chrome.storage.local.get(null, function(item) {
	if (item != null && item.addonIsEnabled != null && item.addonIsEnabled) {
		chrome.browserAction.setIcon({
			path : "../icons/iconEnabled.png"
		});
	} else {
		chrome.browserAction.setIcon({
			path : "../icons/iconDisabled.png"
		});
	}
});


/*
	Sets updated addon icon
*/
chrome.storage.onChanged.addListener(function() {
	chrome.storage.local.get(null, function(item) {
		if (item != null && item.addonIsEnabled != null && item.addonIsEnabled) {
			chrome.browserAction.setIcon({
				path : "../icons/iconEnabled.png"
			});
		} else {
			chrome.browserAction.setIcon({
				path : "../icons/iconDisabled.png"
			});
		}
	});
});