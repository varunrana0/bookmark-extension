document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("fetchBookmarks").addEventListener("click", () => {
		chrome.bookmarks.getTree(function (bookmarks) {
			console.log("Bookmark Extension installed!", { bookmarks });
			displayBookmarks(bookmarks);
		});
	});

	function displayBookmarks(bookmarks) {
		const bookmarkTitles = [];
		// Ensure 'bookmarks' is an array
		const bookmarksArray = Array.isArray(bookmarks)
			? bookmarks
			: [bookmarks];

		// Iterate over top-level bookmarks
		bookmarksArray.forEach(function (item) {
			processBookmarkItem(item, bookmarkTitles);
		});

		// console.log({ bookmarkTitles });

		// Create HTML page content with bookmark titles
		const newPageContent = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Bookmarks</title>
			</head>
			<body>
				<h1>Bookmarks</h1>
				<ul style="list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap:5px;">${bookmarkTitles
					.map(
						(item) =>
							`<li style="">
							<a href=${item.url}
							style="text-decoration: none;
							display: inline-block;
							color: black;
							font-weight: 600;
							text-transform: capitalize;
							padding: 1.5rem 1rem;
							font-size: 1.5rem;
							border: 1px solid #444;
							border-radius: 5px;"
							target="_blank">${item?.title}</a>
						</li>`,
					)
					.join("")}</ul>
			</body>
			</html>
		`;

		// Open a new window with the HTML content
		const newWindow = window.open("", "_blank");
		newWindow.document.write(newPageContent);
	}

	function processBookmarkItem(item, bookmarkTitles) {
		// Check if 'children' property exists and if it is an array
		if (item?.children && Array.isArray(item.children)) {
			// Recursively call the function for nested bookmarks
			item.children.forEach(function (nestedItem) {
				processBookmarkItem(nestedItem, bookmarkTitles);
			});
		} else if (item?.children) {
			// If 'children' is not an array, treat it as a single bookmark
			handleBookmarkItem(item.children, bookmarkTitles);
		} else {
			// If 'children' doesn't exist, treat it as a single bookmark
			handleBookmarkItem(item, bookmarkTitles);
		}
	}

	function handleBookmarkItem(item, bookmarkTitles) {
		// Check if 'children' property exists and if it is an array
		if (Array.isArray(item)) {
			// Iterate over item if it's an array
			item.forEach(function (nestedItem) {
				handleBookmarkItem(nestedItem, bookmarkTitles);
			});
		} else {
			// If 'children' is not an array, treat it as a single bookmark
			bookmarkTitles.push(item || "");
		}
	}
});
