
var LCButton = "https://linux.cn";

function onBrowserActionClick() {
    window.open(LCButton);
    chrome.browserAction.setBadgeText ( { text: "wait..." } );
	setTimeout(function () {
	    chrome.browserAction.setBadgeText( { text: "" } );
	}, 1000);
	
};

chrome.browserAction.onClicked.addListener(onBrowserActionClick);




