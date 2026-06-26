# Weather App

A modern React weather app built with Vite, Mantine, Open-Meteo API, Meteocons, and Day.js.

## Features

- Search current weather by city
- Display current temperature, feels-like temperature, and humidity
- Show current weather condition with dynamic Meteocons weather icons
- Change the main card background based on the current weather condition
- Show a draggable hourly forecast row that automatically starts at the current hour
- Display wind speed, rain, precipitation chance, and current UV index
- Show current UV index with a green-to-red scale indicator
- Display a 7-day forecast list with icons, minimum temperature, maximum temperature, and temperature range bars
- Glassmorphism UI design with a mint-themed background
- Responsive layout for desktop and mobile

## Technologies

- React
- Vite
- Mantine UI
- Open-Meteo API
- Meteocons
- Day.js
- React Indiana Drag Scroll

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal, usually:

```text
http://localhost:5173/
```

## Build

```bash
npm run build
```

## Notes

The app uses Open-Meteo weather and geocoding endpoints. No API key is required.
