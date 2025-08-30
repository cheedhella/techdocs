// Use callbacks
const request = require('request');

const getGeoCodes = (address, callback) => {
    const encodedAddress = encodeURIComponent(address); // 
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodedAddress + ".json?access_token=pk.eyJ1IjoiY2hlZWRoZWxsYSIsImEiOiJja2dzOGhoY28waW01MnpreXI0b3dmNm5xIn0.b_vroCT4PBgJi7c3hzrVVg";
    request({url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to Mapbox API...');
        } else if(response.body.features.length == 0) {
            callback('Unable to find geoCodes. Try another search...');
        } else {
            const {center, location: place_name} = response.body.features[0];
            callback(undefined, {center[0]: latitude, center[1]: longitude, location});
        }
    });
};

module.exports = getGeoCodes;