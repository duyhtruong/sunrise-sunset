document.getElementById("btn")
	.addEventListener("click", function(event) {
    event.preventDefault();
    
    	//setting endpoint for geocode with user input
var geocode = 'https://maps.googleapis.com/maps/api/geocode/json&address=san%20jose&key=AIzaSyBg70uBXWb-Akwa9fy8q70E91SgPhlXWok'
var searchValue = document.getElementById('city');
var apiKey = '&key=AIzaSyBg70uBXWb-Akwa9fy8q70E91SgPhlXWok'
var geoEndPoint = geocode + searchValue

	var request = new XMLHttpRequest();

	request.open('GET', geocode, true);

	request.onload = function() {
		var data = JSON.parse(this.response);
		document.getElementById('userInput').innerHTML = data;
	}	

	request.send();

     

     

   

/*
//accessing geocode API 
var request = new XMLHttpRequest();

request.open('GET', geocode, true);

request.onload = function () {
	var json = JSON.parse(request.reponseText);
	 document.getElementById('userInput').innerHTML = json;

}

request.send();


*/


      
    
});










