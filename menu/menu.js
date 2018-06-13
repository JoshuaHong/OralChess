document.addEventListener("click", function(event) {
	if (event.target.id == "1") {
		if (event.target.value == "enabled") {
			event.target.value = "disabled";
			event.target.innerHTML = "Disabled";
			console.log(event.target.value);
		} else {
			event.target.value = "enabled"
			event.target.innerHTML = "Enabled";
			alert(event.target.value);
		}
	}
});