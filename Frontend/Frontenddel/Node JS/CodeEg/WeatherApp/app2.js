const request = require('request');
const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angles.json?access_token=pk.eyJ1IjoiY2hlZWRoZWxsYSIsImEiOiJja2dzOGhoY28waW01MnpreXI0b3dmNm5xIn0.b_vroCT4PBgJi7c3hzrVVg";

request({url: url, json: true}, (error, response) => {
    const longitude = response.body.features[0].center[0];
    const latitude = response.body.features[0].center[1];
    console.log('longitude: ' + longitude + ', latitude: ' + latitude);
});

/*
> node app2.js
ongitude: -114.1395056, latitude: 32.6732956
*/