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
		//alert("END GAME");
	} else {
		//alert("Changed");
	}
});

var config = { attributes: true, childList: true, characterData: true }
 
 //make sure .moves exists first. Uncomment the below line.
//observer.observe(document.querySelector(".moves"), config);

// later, you can stop observing
//observer.disconnect();



var peice = "queen";
var elem = document.querySelectorAll("." + peice);

for (test of elem) {
	//alert(test.getBoundingClientRect().top + window.scrollY);
}



document.addEventListener("click", printMousePos);

function printMousePos(event) {
	//alert(event.pageX);
	//alert(event.pageY);
}


var enableAddonButton = document.createElement("BUTTON");
enableAddonButton.id = "myBtn";
enableAddonButton.innerHTML = "TEST";
document.body.appendChild(enableAddonButton);



//Keypresses
var e = new KeyboardEvent('keydown',{'keyCode':13,'which':13});

document.getElementById("myBtn").addEventListener("click", function(){
    document.dispatchEvent(e);
    document.querySelector(".ready").value = "e5";
    document.dispatchEvent(e);
});