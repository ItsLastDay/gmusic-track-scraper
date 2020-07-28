// https://developer.chrome.com/extensions/content_scripts


// https://developer.chrome.com/extensions/messaging
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'report_back') {
        sendResponse(
		document.getElementById('player-artist').textContent + ' --- ' 
		+document.getElementById('currently-playing-title').textContent
		);
    }
});
