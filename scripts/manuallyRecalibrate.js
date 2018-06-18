function onError(error) {
	console.log('Error: ${error}');
}

function onGot(item) {
	//localStorage.setItem(item.activeTabID, item.activeTabID);
	//alert(localStorage.getItem(item.activeTabID));

	if (item.addonIsEnabled) {
	} else {
	}
}

var testing = browser.storage.local.get();
testing.then(onGot, onError);


//GETS MOVES
var move = document.querySelectorAll('move');
for( var i = 0; i < move.length; i++ ) {
	//alert(move[i].innerHTML);
}


//GETS Changes
var target = document.querySelector('.moves');
 

var observer = new MutationObserver(function(mutations) {
	if (document.querySelector('.result_wrap') != null) {
		alert("END GAME");
	} else {
		alert("changed");
	}
});

var config = { attributes: true, childList: true, characterData: true }
 
observer.observe(target, config);

// later, you can stop observing
//observer.disconnect();