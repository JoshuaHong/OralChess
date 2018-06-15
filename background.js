/*
	Stores current tab ID
*/
browser.tabs.onActivated.addListener(handleActivated);

function handleActivated(activeInfo) {
	browser.storage.local.set({
		activeTabID: activeInfo.tabId
	});
}