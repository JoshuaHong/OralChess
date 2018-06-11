let isEnabled = true

browser.browserAction.onClicked.addListener((tab) => {
    isEnabled = !isEnabled
    if (isEnabled) {
        browser.browserAction.setIcon({
            path: {
                19: "icons/logo.png"
            }
        });
    } else {
        browser.browserAction.setIcon({
            path: {
                19: "icons/logoDisabled.jpeg"
            }
        });
    }
})