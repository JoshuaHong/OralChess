function onError(error) {
	console.log('Error: ${error}');
}

function onGot(item) {
	alert(item.activeTabID);

	if (item.addonIsEnabled) {
	} else {
	}
}

var testing = browser.storage.local.get();
testing.then(onGot, onError);


//Try this to push array to local storage
/*
var names = [];
names[0] = prompt("New member name?");
localStorage.setItem("names", JSON.stringify(names));

//...
var storedNames = JSON.parse(localStorage.getItem("names"));
/*