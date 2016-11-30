
document.querySelector("input[type=\"range\"]").onmouseup = function() {
    var theRange = this.value;
    if(theRange == 100) {

			unlock();

		} else {
			document.init = setInterval(function() {
				if(document.querySelector("input[type=\"range\"]").value != 0) {
					document.querySelector("input[type=\"range\"]").value = theRange--;
				}
			}, 1);
		}
}

document.querySelector("input[type=\"range\"]").onmousedown = function() {
		clearInterval(document.init);
}

function unlock() {
    document.querySelector("input[type=\"range\"]").style.opacity = "0";
}




var iconen = [
    getImage("icons/1.png"),
    getImage("icons/1.png"),
    getImage("icons/1.png"),
    getImage("icons/1.png"),
   
];