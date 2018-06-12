//Determines if addon is enabled
var isEnabled = true;

//Gets message from background script
browser.runtime.onMessage.addListener(request => {
	isEnabled = request.greeting;
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