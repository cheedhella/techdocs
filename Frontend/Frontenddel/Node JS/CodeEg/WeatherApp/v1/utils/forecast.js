const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=c92d416fb8bfbb5f83cfb488cdab9600&query=${longitude},${latitude}&units=f";
    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to WeatherStack API...');
        } else if(response.body.error) {
            callback('Unable to fetch forecast info. Try another search...');
        } else {
            const weatherCondition = response.body.current.weather_descriptions[0];
            const temperature = response.body.current.temperature;
            const feelsLike = response.body.current.feelslike;
            callback(undefined, {weatherCondition: weatherCondition, temperature: temperature, feelsLike: feelsLike});
        }
    });
};

module.exports = forecast;