function getPosition(event) {
	return {
		x: event.pageX,
		y: event.pageY
	};
}

document.onclick = function(event) {
	alert(getPosition(event).x);
}