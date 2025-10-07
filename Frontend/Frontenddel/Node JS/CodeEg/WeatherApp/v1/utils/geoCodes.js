// Use callbacks
const request = require('request');

const getGeoCodes = (address, callback) => {
    const encodedAddress = encodeURIComponent(address); // 
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodedAddress + ".json?access_token=pk.eyJ1IjoiY2hlZWRoZWxsYSIsImEiOiJja2dzOGhoY28waW01MnpreXI0b3dmNm5xIn0.b_vroCT4PBgJi7c3hzrVVg";
    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to Mapbox API...');
        } else if(response.body.features.length == 0) {
            callback('Unable to find geoCodes. Try another search...');
        } else {
            const longitude = response.body.features[0].center[0];
            const latitude = response.body.features[0].center[1];
            const location = response.body.features[0].place_name;
            callback(undefined, {longitude: longitude, latitude: latitude, location: location});
        }
    });
};

module.exports = getGeoCodes;