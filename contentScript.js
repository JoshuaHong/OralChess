//Checks if addon is enabled
var isEnabled = 0;

//Gets message from background script
browser.runtime.onMessage.addListener(request => {
	isEnabled += request.greeting;
	alert(isEnabled);
});

//Gets position of mouse click
function getPosition(event) {
	return {
		x: event.pageX,
		y: event.pageY
	};
}

document.onclick = function(event) {
	alert(getPosition(event).x);
}