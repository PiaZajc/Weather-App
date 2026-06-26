function getCurrentHourForTimezone(timezone) {
  const parts = new Intl.DateTimeFormat("sv-SE", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

  // sv-SE gives: 2026-06-26 22:37
  // Open-Meteo hourly time uses: 2026-06-26T22:00
  return `${parts.slice(0, 13).replace(" ", "T")}:00`;
}

export async function getWeatherByCity(city) {
  const cleanCity = city.trim();

  if (!cleanCity) {
    throw new Error("Please enter a city.");
  }

  const geoResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      cleanCity
    )}&count=1`
  );

  const geoData = await geoResponse.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("Location not found.");
  }

  const { latitude, longitude, name, country, timezone } = geoData.results[0];

  const weatherResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,rain,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max,sunrise,sunset&timezone=auto`
  );

  const weatherData = await weatherResponse.json();

  if (!weatherData.current || !weatherData.hourly || !weatherData.daily) {
    throw new Error("Weather data could not be loaded.");
  }

  const todayDate = weatherData.daily.time[0];

  const hourlyForecast = weatherData.hourly.time
    .map((time, index) => {
      return {
        time: time,
        temperature: weatherData.hourly.temperature_2m[index],
        weatherCode: weatherData.hourly.weather_code[index],
        uvIndex: weatherData.hourly.uv_index?.[index] ?? null,
      };
    })
    .filter((hour) => hour.time.startsWith(todayDate));


  const currentHour = getCurrentHourForTimezone(weatherData.timezone || timezone);
  const currentHourIndex = weatherData.hourly.time.findIndex((time) => {
    return time === currentHour;
  });

  const currentUvIndex =
    currentHourIndex !== -1 && weatherData.hourly.uv_index
      ? weatherData.hourly.uv_index[currentHourIndex]
      : weatherData.daily.uv_index_max[0];

  const dailyForecast = weatherData.daily.time.map((date, index) => {
    return {
      date: date,
      weatherCode: weatherData.daily.weather_code[index],
      minTemp: weatherData.daily.temperature_2m_min[index],
      maxTemp: weatherData.daily.temperature_2m_max[index],
      precipitationChance: weatherData.daily.precipitation_probability_max[index],
      uvIndex: weatherData.daily.uv_index_max[index],
    };
  });

  return {
    city: name,
    country: country,
    timezone: weatherData.timezone || timezone,

    sunrise: weatherData.daily.sunrise[0],
    sunset: weatherData.daily.sunset[0],

    temperature: weatherData.current.temperature_2m,
    feelsLike: weatherData.current.apparent_temperature,
    humidity: weatherData.current.relative_humidity_2m,
    rain: weatherData.current.rain,
    weatherCode: weatherData.current.weather_code,
    windSpeed: weatherData.current.wind_speed_10m,

    precipitationChance: weatherData.daily.precipitation_probability_max[0],
    // UV index right now, matched to the current local forecast hour.
    currentUvIndex: currentUvIndex,

    // Highest UV index expected today.
    uvIndex: weatherData.daily.uv_index_max[0],

    hourlyForecast: hourlyForecast,
    dailyForecast: dailyForecast,
  };
}
