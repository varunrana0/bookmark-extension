// background.js

chrome.runtime.onInstalled.addListener(function () {
	// Perform actions when the extension is installed or updated
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action === "getBookmarks") {
		chrome.storage.local.get("bookmarks", function (data) {
			const bookmarks = data.bookmarks || [];
			sendResponse({ bookmarks });
		});
		return true; // Indicates that sendResponse will be called asynchronously
	}
});
