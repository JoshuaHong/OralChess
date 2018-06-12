//Determines if addon is enabled
let isEnabled = true;

//Toggles between enabled and disabled icons
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
        if (!isEnabled) {
            browser.tabs.sendMessage(
                tab.id,
                {
                    greeting: false
                }
            ).catch(onError);
        } else {
            browser.tabs.sendMessage(
                tab.id,
                {
                    greeting: true
                }
            ).catch(onError);
        }
    }
}

browser.browserAction.onClicked.addListener(() => {
    browser.tabs.query({

    }).then(sendMessageToTabs).catch(onError);
});

function onError(error) {
    console.error(`Error: ${error}`);
}