/*
	Stores current tab ID
*/
chrome.tabs.onActivated.addListener(handleActivated);

function handleActivated(activeInfo) {
	chrome.storage.local.set({
		activeTabID: activeInfo.tabId
	});
}