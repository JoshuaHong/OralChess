var button1 = document.createElement("BUTTON");

function onGot(item) {
	if (item.color == null) {
		text = document.createTextNode("@@@@@");
		button1.appendChild(text);
		document.body.appendChild(button1);
	} else {
		text = document.createTextNode(item.color);
		button1.appendChild(text);
		document.body.appendChild(button1);
	}
}

function onError(error) {
	console.log('Error: ${error}');
}

var testing = browser.storage.local.get("color");
testing.then(onGot, onError);



document.addEventListener("click", function(event) {
	if (event.target.id == "1") {
		if (event.target.value == "enabled") {
			browser.storage.local.set({
				color: "red"
			});
		} else {
			
		}
	} else {
		browser.storage.local.set({
			color: "blue"
		});
	}
});