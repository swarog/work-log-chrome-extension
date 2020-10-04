// Listen to messages sent from other parts of the extension.
/*chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // onMessage must return "true" if response is async.
    let isResponseAsync = false;

    if (request.popupMounted) {
        console.log('eventPage notified that Popup.tsx has mounted.');
    }

    return isResponseAsync;
});*/

function logUrlCallback(tab: chrome.tabs.Tab) {
    fetch("http://localhost:32768/", {
        method: "POST",
        body: JSON.stringify({url: tab.url, dateTime: Math.round(new Date().getTime()/1000)})
    }).then((response) => {console.log(response)})
}

chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId,(tab) => {
        logUrlCallback(tab)
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo.url) {
        logUrlCallback(tab)
    }
})
