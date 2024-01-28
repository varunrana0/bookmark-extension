chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action === "getBookmarks") {
		chrome.bookmarks.getTree(function (bookmarks) {
			chrome.runtime.sendMessage({ action: "sendBookmarks", bookmarks });
		});
	}
});
