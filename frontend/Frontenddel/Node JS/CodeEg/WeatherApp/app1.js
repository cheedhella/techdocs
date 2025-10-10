const request = require('request');
const url = "http://api.weatherstack.com/current?access_key=c92d416fb8bfbb5f83cfb488cdab9600&query=16.4805,79.8891&units=f";

request({url: url}, (error, response) => {
    const data = JSON.parse(response.body);
    console.log(data.current); // print current weather info!
});

// Better version of above!
request({url: url, json: true}, (error, response) => {
    console.log(response.body.current);
});