import { useEffect, useRef } from "react";
import { Card } from "@mantine/core";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import {
  getWeatherCardClass,
  getWeatherDescription,
  getWeatherIcon,
} from "../utils/weatherIcons.js";

dayjs.extend(utc);
dayjs.extend(timezone);

function MainWeatherCard({ weather }) {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const momentumFrame = useRef(null);
  const lastMoveTime = useRef(0);

  const hourlyForecast = weather.hourlyForecast || [];

  const currentHour = dayjs()
    .tz(weather.timezone)
    .startOf("hour")
    .format("YYYY-MM-DDTHH:mm");

  const sunriseHour = dayjs(weather.sunrise).format("YYYY-MM-DDTHH:mm");
  const sunsetHour = dayjs(weather.sunset).format("YYYY-MM-DDTHH:mm");

  const isCurrentNight = currentHour < sunriseHour || currentHour >= sunsetHour;
  const mainIcon = getWeatherIcon(weather.weatherCode, isCurrentNight);
  const weatherDescription = getWeatherDescription(weather.weatherCode);
  const weatherCardClass = getWeatherCardClass(weather.weatherCode);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (!scrollContainer) return;

    const nowElement = scrollContainer.querySelector(".hourly-item-now");

    if (nowElement) {
      requestAnimationFrame(() => {
        scrollContainer.scrollTo({
          left: nowElement.offsetLeft - scrollContainer.offsetLeft,
          behavior: "auto",
        });
      });
    }
  }, [currentHour, weather.city]);

  const stopMomentum = () => {
    if (momentumFrame.current) {
      cancelAnimationFrame(momentumFrame.current);
      momentumFrame.current = null;
    }
  };

  const startMomentum = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const step = () => {
      if (Math.abs(velocity.current) < 0.1) {
        momentumFrame.current = null;
        return;
      }

      scrollContainer.scrollLeft -= velocity.current;
      velocity.current *= 0.92;

      momentumFrame.current = requestAnimationFrame(step);
    };

    stopMomentum();
    momentumFrame.current = requestAnimationFrame(step);
  };

  const handlePointerDown = (event) => {
    if (event.pointerType !== "mouse") return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    isDragging.current = true;
    lastX.current = event.clientX;
    velocity.current = 0;
    lastMoveTime.current = performance.now();

    stopMomentum();
    scrollContainer.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!isDragging.current || event.pointerType !== "mouse") return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const now = performance.now();
    const deltaX = event.clientX - lastX.current;
    const deltaTime = now - lastMoveTime.current || 16;

    scrollContainer.scrollLeft -= deltaX;

    velocity.current = (deltaX / deltaTime) * 16;
    lastX.current = event.clientX;
    lastMoveTime.current = now;
  };

  const handlePointerUp = (event) => {
    if (event.pointerType !== "mouse") return;

    isDragging.current = false;
    startMomentum();
  };

  return (
    <Card
      className={`main-dashboard-card ${weatherCardClass}`}
      radius="xl"
      padding="xl"
    >
      <div className="dashboard-top">
        <div>
          <h2 className="dashboard-city">
            {weather.city}, {weather.country}
          </h2>
          <p className="dashboard-condition">{weatherDescription}</p>
        </div>

        <div className="dashboard-icon">
          <img src={mainIcon} alt={weatherDescription} draggable={false} />
        </div>
      </div>

      <div className="dashboard-main-temp">
        <span>{Math.round(weather.temperature)}</span>
        <span className="degree">°</span>
      </div>

      <div className="dashboard-details">
        <span>Feels like: {Math.round(weather.feelsLike)}°</span>
        <span>Humidity: {weather.humidity}%</span>
      </div>

      <div className="dashboard-line"></div>

      <div
        className="hourly-scroll"
        ref={scrollRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onDragStart={(event) => event.preventDefault()}
      >
        {hourlyForecast.map((hour) => {
          const isCurrentHour = hour.time === currentHour;
          const hourTime = dayjs(hour.time).format("YYYY-MM-DDTHH:mm");
          const isNight = hourTime < sunriseHour || hourTime >= sunsetHour;
          const hourlyIcon = getWeatherIcon(hour.weatherCode, isNight);
          const hourlyDescription = getWeatherDescription(hour.weatherCode);

          return (
            <div
              className={`hourly-item ${isCurrentHour ? "hourly-item-now" : ""}`}
              key={hour.time}
            >
              <p className="hourly-time">
                {isCurrentHour ? "Now" : dayjs(hour.time).format("HH:mm")}
              </p>

              <div className="hourly-icon">
                <img
                  src={hourlyIcon}
                  alt={hourlyDescription}
                  draggable={false}
                />
              </div>

              <p className="hourly-temp">{Math.round(hour.temperature)}°</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default MainWeatherCard;
