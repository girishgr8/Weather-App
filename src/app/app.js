window.onload = function(){
	document.getElementById("menu").addEventListener('click', function(){
		var element = document.getElementsByTagName('ul')[0];
		element.classList.toggle("active");
	});
}
