WeatherAPP

Goal: 
    Take user location(such as California) as input and print weather information of that location;

HowTo:
    mapbox.com API takes location(such as California) as input and outputs it's <latitude, longitude>;
    weatherstack.com API take <latitude, longitude> and outputs it's weather information;
---------------------------------------------------------------------------------------------
MapBox API -> It offers location based services; Free API, free for 50000 requests per month;
    Geocoding -> It takes location as input and converts it into <latitude, longitude>;
    Reverse Geocoding -> opposite of above;

    Web UserName/Password: cheedhella/Welcome123 
    API Access Key: pk.eyJ1IjoiY2hlZWRoZWxsYSIsImEiOiJja2dzOGhoY28waW01MnpreXI0b3dmNm5xIn0.b_vroCT4PBgJi7c3hzrVVg
    URL: https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angles.json?access_token=pk.eyJ1IjoiY2hlZWRoZWxsYSIsImEiOiJja2dzOGhoY28waW01MnpreXI0b3dmNm5xIn0.b_vroCT4PBgJi7c3hzrVVg
        There are many cities with name 'Los Angels'. By default, response.features contains 5 most relevant results;
        response.features[0].center -> contains geo coordinates;
        Optional Parameters 
            limit=1 -> used to limit the number of results to whatever you want;
---------------------------------------------------------------------------------------------
WeatherStack API
    https://weatherstack.com -> Free API, free for 1000 requests per month;
    - While signing up, check 'Receive important maintanance and service notifications', so that
      You'll get advanced notifications for any API changes and any downtime;
    - Once signup is complete, You'll be given:
        -- API access key, like a password, unique to you; 
        -- API endpoints
            Current weather ->
            Historical weather -> 
            Forecast weather -> 

    - cheedhella@gmail.com/Welcome123
    - c92d416fb8bfbb5f83cfb488cdab9600
    - http://api.weatherstack.com/current?access_key=c92d416fb8bfbb5f83cfb488cdab9600&query=16.4805,79.8891
      Optional Parameters:
        units = m -> celcius/degrees; s -> kelvin; f -> fahrenhet;
        language = en 
        callback = MY_CALLBACK
---------------------------------------------------------------------------------------------
> touch WeatherApp
> cd WeatherApp
> npm init -y
> npm install request@2.88.0        // For calling REST API;
> touch app.js

---------------------------------------------------------------------------------------------