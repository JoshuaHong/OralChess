function onError(error) {
	console.log('Error: ${error}');
}

function onGot(item) {
	if (item.color == null) {
		alert("NULL");
	} else {
		alert(item.color);
	}
}

var testing = browser.storage.local.get("color");
testing.then(onGot, onError);