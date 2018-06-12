//Toggles between enabled and disabled icons
let isEnabled = true;
browser.browserAction.onClicked.addListener((tab) => {
    isEnabled = !isEnabled
    if (isEnabled) {
        browser.browserAction.setIcon({
            path: {
                19: "icons/icon.png"
            }
        });
    } else {
        browser.browserAction.setIcon({
            path: {
                19: "icons/iconDisabled.jpeg"
            }
        });
    }
})

//Sends message to content script
function sendMessageToTabs(tabs) {
    for (let tab of tabs) {
        browser.tabs.sendMessage(
            tab.id,
            {
                greeting: 1
            }
        );
    }
}

browser.browserAction.onClicked.addListener(() => {
    browser.tabs.query({
        currentWindow: true,
        active: true
    }).then(sendMessageToTabs).catch(onError);
});

function onError(error) {
  console.error(`Error: ${error}`);
}