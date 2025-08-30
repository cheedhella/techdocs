const getGeoCodes = require('./utils/geoCodes'); // It looks for utils/geoCodes.js in same folder as appWeather.js
const forecast = require('./utils/forecast'); // It looks for utils/forecast.js in same folder as appWeather.js

getGeoCodes('Guntur', (error, geoCodesData) => {
    if(error) {
        console.log(error);
        return;
    }
    forecast(geoCodesData.latitude, geoCodesData.longitude, (error, forecastData) => {
        if(error) {
            console.log(error);
            return;
        }
        console.log(forecastData.weatherCondition + '. It is currently ' + forecastData.temperature + ' degrees out. It feels like ' + forecastData.rainChance + ' degrees out.');
    });
});