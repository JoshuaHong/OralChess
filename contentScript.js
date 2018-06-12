//Determines if addon is enabled
var isEnabled = true;

//Determines if addon was clicked
var isClicked = false;

//Gets message from background script
browser.runtime.onMessage.addListener(request => {
	isEnabled = request.greeting;
	isClicked = true;
});

//Gets position of mouse click
function getPosition(event) {
	return {
		x: event.pageX,
		y: event.pageY
	};
}

document.onclick = function(event) {
	if (isEnabled && isClicked) {
		alert(getPosition(event).x);
	}
}