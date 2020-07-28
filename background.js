var last = ""


chrome.runtime.onInstalled.addListener(function () {
	console.log('installong');
	chrome.downloads.onDeterminingFilename.addListener(function (item, suggest) {
		if (item.filename.endsWith("song_name_for_obs.txt")) {
			suggest({filename: '..', conflictAction: 'overwrite'});
		}
	});
});

function doStuffWithDom(song) {
	if (typeof song !== `undefined` && song != last) {
		last = song;
		
		var blob = new Blob([song + "               "], {type: "text/plain;charset=UTF-8"});
		
		var url = window.URL.createObjectURL(blob)
		
		var a = document.createElement('a');
		a.setAttribute('href', url);
		a.setAttribute('download', "song_name_for_obs.txt");

		// Create Click event
		var clickEvent = document.createEvent ("MouseEvent");
		clickEvent.initMouseEvent('click', true, true, window, 0, 0, 0, 80,
					  20, false, false, false, false, 0, null);

		// dispatch click event to simulate download
		a.dispatchEvent (clickEvent);
	}
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tab.url.startsWith('https://play.google.com/music/listen') && typeof(changeInfo.title) !== 'undefined') {
        chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);
	}
});