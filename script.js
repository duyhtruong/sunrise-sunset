

//click
document.getElementById("city")
	.addEventListener("keypress", function(event) {
    if (event.keyCode == 13){
    event.preventDefault();

//geocoder API call with user INPUT    
var geocoder = new google.maps.Geocoder();
var loc = document.getElementById('city').value;
geocoder.geocode( { "address": loc}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
        var location = results[0].geometry.location;
        lat = location.lat();
        lng = location.lng();
     
//sunrise API call with lat and long of user INPUT       
        var endpoint = 'https://api.sunrise-sunset.org/json?';
		var latt = 'lat='+ lat +'&';
		var longg = 'lng='+ lng;
		var formatted = '&formatted=0'
		var complete_endpoint = endpoint + latt + longg + formatted;


		var request = new XMLHttpRequest();
		request.open('GET', complete_endpoint)
		request.onload = function(){
				var json = JSON.parse(request.responseText);
				var sunriseTime = new Date(json.results.sunrise);
				var sunsetTime = new Date(json.results.sunset);
				var unixsunsetTime = JSON.stringify(sunsetTime.getTime()) / 1000;
				var unixsunriseTime = JSON.stringify(sunriseTime.getTime()) / 1000;
				


// call timezone API to get timezone of user input to get difference
				var timezoneAPI = 'https://maps.googleapis.com/maps/api/timezone/json?location='
				var apikey = '&key=AIzaSyBg70uBXWb-Akwa9fy8q70E91SgPhlXWok';
				var timezoneendpoint = timezoneAPI +lat+ ',' + lng + '&timestamp='+unixsunriseTime+apikey;
				
				var request2 = new XMLHttpRequest()
				request2.open('GET', timezoneendpoint)
				request2.onload = function(){
					var json2 = JSON.parse(request2.responseText);
					var dstoffset = json2.dstOffset;
					var offset = json2.rawOffset;
					var adjustedSunrise = unixsunriseTime + dstoffset + offset;
					var adjustedSunriseDate = new Date(adjustedSunrise *1000);

					var adjustedSunset = unixsunsetTime + dstoffset + offset;
					var adjustedSunsetDate = new Date(adjustedSunset * 1000);

// displaying time
					var hourSunset = adjustedSunsetDate.getUTCHours() - 12;
					var minSunset = '0'+adjustedSunsetDate.getUTCMinutes();
					var hourtest = adjustedSunriseDate.getUTCHours(); 
					var mintest = '0'+adjustedSunriseDate.getUTCMinutes();
					
					var sunsetDisplay = 'Sunset:' + '<br>' + hourSunset+ ':' + minSunset.substr(-2) + ' PM';
					var sunriseDisplay = 'Sunrise:'+ '<br>'+ hourtest+':'+mintest.substr(-2) + ' AM'
					document.getElementById('userInput').innerHTML = sunriseDisplay;
					document.getElementById('userInput2').innerHTML = sunsetDisplay;
					
				}
				request2.send();

}
request.send();




    }
});

}  
});

