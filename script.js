/* 	This application takes in a user input for location. 
	Expected input may be Address, city, zipcode, or point of interest.
	The application will output the local sunrise and sunset time.
*/


 function appear(elm, i, steps, speed){
        var t_o;
        i = i || 0;
        steps = steps || 5;
        speed = speed || 50;

        t_o = setInterval(function(){
          opacity = i / 100;
          i = i + steps;
          if(opacity > 1 || opacity < 0){
            clearInterval(t_o);
            return;
          }
          elm.style.opacity = opacity;
          elm.style.filter = 'alpha(opacity=' + opacity*100 + ')';
        }, speed);
      }    

document.getElementById("userInput")
	.addEventListener("keypress", function(event) {
    	if (event.keyCode == 13){
    	event.preventDefault();

			//Retrieve longitude and latitude (geocode) of user inputted location using google maps   
			var geocoder = new google.maps.Geocoder();
			var userLocation = document.getElementById('userInput').value;
			geocoder.geocode( { "address": userLocation}, function(results, status) {
    			if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
        			var location = results[0].geometry.location;
        			lat = location.lat();
        			lng = location.lng();
     
					//Retrieve sunset and sunrise time of input latitude and longitude using sunrise API      
        			var sunriseEndpoint = 'https://api.sunrise-sunset.org/json?';
					sunriseEndpoint += 'lat=' + lat + '&' + 'lng=' + lng + '&formatted=0';


					//XMLHttpRequest to sunrise API
					var request = new XMLHttpRequest();
					request.open('GET', sunriseEndpoint)
					request.onload = function(){
						var json = JSON.parse(request.responseText);

						//Creating Date objects of sunrise and sunset times and converting to unix time
						var sunriseTime = new Date(json.results.sunrise);
						var sunsetTime = new Date(json.results.sunset);
						var unixsunsetTime = JSON.stringify(sunsetTime.getTime()) / 1000;
						var unixsunriseTime = JSON.stringify(sunriseTime.getTime()) / 1000;
				


						//Call for timezone API in order to get local adjusted time for user inputted location
						var timezoneAPI = 'https://maps.googleapis.com/maps/api/timezone/json?location='
						var apikey = '&key=AIzaSyBg70uBXWb-Akwa9fy8q70E91SgPhlXWok';
						timezoneAPI += lat + ',' + lng + '&timestamp=' + unixsunriseTime + apikey;
				
						var request2 = new XMLHttpRequest()
						request2.open('GET', timezoneAPI)
						request2.onload = function(){
					
							var json2 = JSON.parse(request2.responseText);
							var dstoffset = json2.dstOffset;
							var offset = json2.rawOffset;
					
							//Adjusting time from UTP to input local time
							var adjustedSunrise = unixsunriseTime + dstoffset + offset;
							var adjustedSunriseDate = new Date(adjustedSunrise *1000);

							var adjustedSunset = unixsunsetTime + dstoffset + offset;
							var adjustedSunsetDate = new Date(adjustedSunset * 1000);

							//Display adjusted times using Date javascript library
							var hourSunset = adjustedSunsetDate.getUTCHours() - 12;
							var minSunset = '0'+adjustedSunsetDate.getUTCMinutes();
							var hourSunrise = adjustedSunriseDate.getUTCHours(); 
							var minSunrise = '0'+adjustedSunriseDate.getUTCMinutes();
					
							var sunsetDisplay =  hourSunset+ ':' + minSunset.substr(-2) + ' PM';
							var sunriseDisplay =  hourSunrise+':'+minSunrise.substr(-2) + ' AM'
							
							document.getElementById('sunrise').innerHTML = sunriseDisplay;
							appear(document.getElementById('sunrise'),0, 5,40);
							
							document.getElementById('sunset').innerHTML = sunsetDisplay;
							appear(document.getElementById('sunset'),0,5,40);
						}
						request2.send();

					}
					request.send();
				}
			});
		}  
	});










