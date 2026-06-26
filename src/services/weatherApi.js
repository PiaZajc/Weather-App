export async function getWeatherByCity(city) {
    
    // 1. convert city name to latitude and longitude
    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);

    const geoData = await geoResponse.json();

    // if the city wasn't found, stop and show an error
    if(!geoData.results || geoData.results.length === 0) {
        throw new Error("Location not found.");
    }


    // get latitude and longitude from the first result
    const {latitude, longitude, name, country} = geoData.results[0];


    // 2. use results to get current weather
    const weatherResponse = await fetch (`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,rain,weather_code,wind_speed_10m&daily=precipitation_probability_max&timezone=auto`);


    const weatherData = await weatherResponse.json();

    // return only the data we need
    return {
        city: name,
        country: country,
        timezone: geoData.results[0].timezone,
        temperature: weatherData.current.temperature_2m,
        feelsLike: weatherData.current.apparent_temperature,
        humidity: weatherData.current.relative_humidity_2m,
        rain: weatherData.current.rain,
        weatherCode: weatherData.current.weather_code,
        windSpeed: weatherData.current.wind_speed_10m,
        
        precipitationChance: weatherData.daily.precipitation_probability_max[0],
        /* [0] = today
        [1] = tomorrow
        [2] = day after tomorrow */
    };
}