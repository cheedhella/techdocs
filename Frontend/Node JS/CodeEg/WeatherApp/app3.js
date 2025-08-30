/*
    What if there are no location with specified name?
    What if the API is down?
*/
const request = require('request');
const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angles.json?access_token=pk.eyJ1IjoiY2hlZWRoZWxsYSIsImEiOiJja2dzOGhoY28waW01MnpreXI0b3dmNm5xIn0.b_vroCT4PBgJi7c3hzrVVg";

// Only one of the parameters to the callback is defined, while the other is undefined; 
// If there are no errors, error is undifined;
// If there are any errors, response is undefined;
request({url: url, json: true}, (error, response) => {
    if(error) {
        console.log('Unable to connect to Mapbox API...');
    } else if(response.body.features.length == 0) {
        console.log('Unable to find location. Try another search...');
    } else {
        const longitude = response.body.features[0].center[0];
        const latitude = response.body.features[0].center[1];
        console.log('longitude: ' + longitude + ', latitude: ' + latitude);  
    }
});