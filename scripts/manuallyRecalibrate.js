function onError(error) {
	console.log('Error: ${error}');
}

function onGot(item) {
	//localStorage.setItem(item.activeTabID, item.activeTabID);
	//alert(localStorage.getItem(item.activeTabID));
	//above unnecessary due to new way of seeing peices in lichess

	if (item.addonIsEnabled) {
		//alert("ENABLED");
	} else {
		//alert("DISABLED");
	}
}




function logStorageChange(changes, area) {
	var testing = browser.storage.local.get();
	testing.then(onGot, onError);
}

browser.storage.onChanged.addListener(logStorageChange);



//GETS MOVES
var move = document.querySelectorAll("move");
for( var i = 0; i < move.length; i++ ) {
	//alert(move[i].innerHTML);
}


//GETS Changes
var observer = new MutationObserver(function(mutations) {
	if (document.querySelector(".result_wrap") != null) {
		alert("END GAME");
	} else {
		alert("Changed");
	}
});

var config = { attributes: true, childList: true, characterData: true }
 
observer.observe(document.querySelector(".moves"), config);

// later, you can stop observing
//observer.disconnect();