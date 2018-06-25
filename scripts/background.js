/*
	Stores current tab ID
*/
chrome.tabs.onActivated.addListener(function (activeInfo) {
	chrome.storage.local.set({
		activeTabID: activeInfo.tabId
	});
});