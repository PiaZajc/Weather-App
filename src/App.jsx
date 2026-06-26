/*
Main app component.
It stores the selected location, calls the weather API,
stores weather data, and displays page navigation.
*/

import { useState } from "react";
import { Loader, Button, TextInput, Container, Grid } from "@mantine/core";

import { getWeatherByCity } from "./services/weatherApi.js";
import Navbar from "./components/Navbar.jsx";
import AboutPage from "./components/AboutPage.jsx";
import ContactPage from "./components/ContactPage.jsx";
import WeatherCard from "./components/WeatherCard.jsx";
import UVIndexCard from "./components/UVIndexCard.jsx";
import MainWeatherCard from "./components/MainWeatherCard.jsx";
import DailyForecastList from "./components/DailyForecastList.jsx";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const wait = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleSearch = async () => {
    const cleanLocation = location.trim();

    if (!cleanLocation) {
      setWeather(null);
      setError("Please enter a city.");
      return;
    }

    try {
      setError("");
      setLoader(true);

      const [data] = await Promise.all([
        getWeatherByCity(cleanLocation),
        wait(700),
      ]);

      setWeather(data);
      setLocation("");
    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoader(false);
    }
  };

  const handleNavigate = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar activePage={activePage} onNavigate={handleNavigate} />

      {activePage === "home" && (
        <main className="app">
          <Container size="lg" className="weather-container">
            <section className="hero-section">
              <p className="subtitle-top">Simple Weather Search</p>

              <h1>Weather App</h1>

              <p className="subtitle-bottom">
                Check current weather for any city. Enter the name of the city in
                the search bar.
              </p>
            </section>

            <Grid gutter="md" className="search-box">
              <Grid.Col span={{ base: 12, xs: 9 }}>
                <TextInput
                  placeholder="Enter location, e.g. Ljubljana"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  className="glass-input"
                  size="md"
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, xs: 3 }}>
                <Button
                  onClick={handleSearch}
                  className="glass-button"
                  size="md"
                  variant="default"
                  fullWidth
                >
                  Search
                </Button>
              </Grid.Col>
            </Grid>

            {error && <p className="error">{error}</p>}

            {loader && (
              <div className="loader-wrapper">
                <Loader color="white" size="lg" type="dots" className="loader" />
              </div>
            )}

            {weather && !loader && (
              <>
                <MainWeatherCard weather={weather} />

                <Grid gutter="md" className="cards">
                  <Grid.Col span={{ base: 12, xs: 6, md: 3 }}>
                    <WeatherCard
                      title="Wind"
                      value={Math.round(weather.windSpeed)}
                      unit="km/h"
                      description="Current wind speed"
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, xs: 6, md: 3 }}>
                    <WeatherCard
                      title="Rain"
                      value={weather.rain}
                      unit="mm"
                      description="Current rainfall"
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, xs: 6, md: 3 }}>
                    <WeatherCard
                      title="Precipitation"
                      value={weather.precipitationChance}
                      unit="%"
                      description="Chance today"
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, xs: 6, md: 3 }}>
                    <UVIndexCard uvIndex={weather.currentUvIndex} />
                  </Grid.Col>
                </Grid>

                <DailyForecastList dailyForecast={weather.dailyForecast} />
              </>
            )}
          </Container>
        </main>
      )}

      {activePage === "about" && (
        <main className="page-shell">
          <AboutPage />
        </main>
      )}

      {activePage === "contact" && (
        <main className="page-shell">
          <ContactPage />
        </main>
      )}
    </>
  );
}

export default App;
