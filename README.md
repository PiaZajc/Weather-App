# Weather App

A modern React weather app built with Vite, Mantine, Open-Meteo API, Meteocons, and Web3Forms.

## Features

- Search current weather by city
- Sticky mint-gradient navbar with logo and page navigation
- Home, About, and Contact pages
- Current temperature, feels-like temperature, and humidity
- Dynamic weather icons based on current conditions
- Dynamic main weather card background based on weather condition
- Draggable hourly forecast with automatic current-hour position
- Wind, rain, precipitation chance, and current UV index cards
- UV index card with a green-to-red indicator scale
- 7-day forecast list with weather icons and min/max temperatures
- Contact form using Web3Forms
- Glassmorphism UI with a mint-themed background
- Responsive layout for desktop and mobile
- Responsive navbar with hamburger menu on smaller screens
- About and contact pages

## Design palette

The main theme is mint/glassmorphism, with small accents for contrast:

- Sky blue for weather and temperature elements
- Soft sun yellow for highlights and hero details
- Coral for warnings or error states
- Lavender for subtle secondary accents
- Sand yellow for warm forecast details

## Technologies

- React
- Vite
- Mantine UI
- Open-Meteo API
- Meteocons
- Day.js
- React Indiana Drag Scroll
- Web3Forms

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

## Contact form

The Contact page uses Web3Forms. The access key used here is a public client-side key, not a private secret, so it can be included in a public GitHub repository.

The form submits to:

```text
https://api.web3forms.com/submit
```

The access key is stored in:

```text
src/components/ContactPage.jsx
```

No `.env` file is required for the current contact form.

## Notes about environment files

`.env` is ignored by Git and should be used only for private local secrets if the project gets a backend or private API keys later.

`.env.example` is included only as documentation. It does not contain private data.
