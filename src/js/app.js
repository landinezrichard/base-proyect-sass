/* ==================== MAIN MENU ====================*/
function mainMenu() {
	/*Mostrar Menu en Movil*/
	$('.Menu-btn').on("click",function() {
		$('.Menu').slideToggle();
		$( this ).toggleClass("change");
	});
}
/*=============== SCROLL ===============*/
function scrollSmooth() {
	let altoHeader = 79px;
	$('a[href*="#"]').on('click', function (e) {
		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== "") {
		// e.preventDefault();
		// Store hash
		let hash = this.hash;
		$('html, body').animate({
			scrollTop: $(hash).offset().top - altoHeader
		}, 500, 'linear', function () {

			// Add hash (#) to URL when done scrolling (default click behavior)
			window.location.hash = hash;
		});
	} // End if
	});
}

/*=============== DOCUMENT READY ===============*/
// Shorthand for $( document ).ready()
$(function () {
    console.log("Listo");    
	mainMenu();
	scrollSmooth();
});