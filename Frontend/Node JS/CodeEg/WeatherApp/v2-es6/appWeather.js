const getGeoCodes = require('./utils/geoCodes'); // It looks for utils/geoCodes.js in same folder as appWeather.js
const forecast = require('./utils/forecast'); // It looks for utils/forecast.js in same folder as appWeather.js

getGeoCodes('Guntur', (error, {longitude, latitude}) => {
    if(error) {
        console.log(error);
        return;
    }
    forecast(latitude, longitude, (error, {weatherCondition, temperature, rainChance}) => {
        if(error) {
            console.log(error);
            return;
        }
        console.log(weatherCondition + '. It is currently ' + temperature + ' degrees out. It feels like ' + rainChance + ' degrees out.');
    });
});