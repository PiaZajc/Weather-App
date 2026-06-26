import { Card } from "@mantine/core";
import dayjs from "dayjs";

import {
  getWeatherDescription,
  getWeatherIcon,
} from "../utils/weatherIcons.js";

function DailyForecastList({ dailyForecast = [] }) {
  if (!dailyForecast.length) return null;

  const temperatures = dailyForecast.flatMap((day) => [day.minTemp, day.maxTemp]);
  const lowestTemp = Math.min(...temperatures);
  const highestTemp = Math.max(...temperatures);
  const tempRange = Math.max(highestTemp - lowestTemp, 1);

  return (
    <Card className="forecast-list-card" radius="xl" padding="lg">
      <div className="forecast-list-header">
        <span className="forecast-list-calendar">▦</span>
        <span>7-day forecast</span>
      </div>

      <div className="forecast-list-divider"></div>

      <div className="forecast-list">
        {dailyForecast.slice(0, 7).map((day, index) => {
          const label = index === 0 ? "Today" : dayjs(day.date).format("ddd");
          const icon = getWeatherIcon(day.weatherCode, false);
          const description = getWeatherDescription(day.weatherCode);

          const leftPercent = ((day.minTemp - lowestTemp) / tempRange) * 100;
          const widthPercent = Math.max(
            ((day.maxTemp - day.minTemp) / tempRange) * 100,
            14
          );

          return (
            <div className="forecast-row" key={day.date}>
              <p className="forecast-day">{label}</p>

              <img
                src={icon}
                alt={description}
                className="forecast-icon"
                draggable={false}
              />

              <p className="forecast-low">{Math.round(day.minTemp)}°</p>

              <div className="forecast-temp-bar" aria-hidden="true">
                <span
                  className="forecast-temp-fill"
                  style={{
                    left: `${leftPercent}%`,
                    width: `${widthPercent}%`,
                  }}
                ></span>
              </div>

              <p className="forecast-high">{Math.round(day.maxTemp)}°</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default DailyForecastList;
