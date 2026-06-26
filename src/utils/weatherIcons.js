import clearDay from "@meteocons/svg/fill/clear-day.svg";
import clearNight from "@meteocons/svg/fill/clear-night.svg";
import partlyCloudyDay from "@meteocons/svg/fill/partly-cloudy-day.svg";
import partlyCloudyNight from "@meteocons/svg/fill/partly-cloudy-night.svg";
import cloudy from "@meteocons/svg/fill/cloudy.svg";
import fog from "@meteocons/svg/fill/fog.svg";
import drizzle from "@meteocons/svg/fill/drizzle.svg";
import rain from "@meteocons/svg/fill/rain.svg";
import snow from "@meteocons/svg/fill/snow.svg";
import thunderstorms from "@meteocons/svg/fill/thunderstorms.svg";

export function getWeatherIcon(weatherCode, isNight = false) {
  if (weatherCode === 0) {
    return isNight ? clearNight : clearDay;
  }

  if (weatherCode === 1 || weatherCode === 2) {
    return isNight ? partlyCloudyNight : partlyCloudyDay;
  }

  if (weatherCode === 3) {
    return cloudy;
  }

  if (weatherCode === 45 || weatherCode === 48) {
    return fog;
  }

  if ([51, 53, 55, 56, 57].includes(weatherCode)) {
    return drizzle;
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
    return rain;
  }

  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return snow;
  }

  if ([95, 96, 99].includes(weatherCode)) {
    return thunderstorms;
  }

  return isNight ? clearNight : clearDay;
}

export function getWeatherDescription(weatherCode) {
  if (weatherCode === 0) return "Clear sky";
  if (weatherCode === 1) return "Mostly clear";
  if (weatherCode === 2) return "Partly cloudy";
  if (weatherCode === 3) return "Cloudy";
  if (weatherCode === 45 || weatherCode === 48) return "Fog";
  if ([51, 53, 55, 56, 57].includes(weatherCode)) return "Drizzle";
  if ([61, 63, 65, 66, 67].includes(weatherCode)) return "Rain";
  if ([71, 73, 75, 77].includes(weatherCode)) return "Snow";
  if ([80, 81, 82].includes(weatherCode)) return "Rain showers";
  if ([85, 86].includes(weatherCode)) return "Snow showers";
  if ([95, 96, 99].includes(weatherCode)) return "Thunderstorm";

  return "Current weather";
}

export function getWeatherCardClass(weatherCode) {
  if (weatherCode === 0) return "weather-bg-sunny";
  if (weatherCode === 1 || weatherCode === 2) return "weather-bg-partly-cloudy";
  if (weatherCode === 3) return "weather-bg-cloudy";
  if (weatherCode === 45 || weatherCode === 48) return "weather-bg-fog";
  if ([51, 53, 55, 56, 57].includes(weatherCode)) return "weather-bg-drizzle";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) return "weather-bg-rain";
  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) return "weather-bg-snow";
  if ([95, 96, 99].includes(weatherCode)) return "weather-bg-thunderstorm";

  return "weather-bg-default";
}
