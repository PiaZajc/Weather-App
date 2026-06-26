/* This is the main component.

It will:
- store the selected location,
- call the weather API,
- store the weather data,
- display the search bar and weather cards.
*/

import { useState } from "react";
import { getWeatherByCity } from "./services/weatherApi.js";
import WeatherCard from "./components/WeatherCard.jsx";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";


import { Loader, Button, TextInput, Container, Grid } from "@mantine/core"; // UI

dayjs.extend(utc);
dayjs.extend(timezone);


function App() {
    // useState variables
    // functions like handleSearch
    // return (...)

    // Stores what the user types into the input
    const [location, setLocation] = useState("");

    // Stores the weather data we get from the API
    const [weather, setWeather] = useState(null);

    // Stores an error message if something goes wrong
    const [error, setError] = useState("");

    // used while loading data
    const [loader, setLoader] = useState(false); // boolean


    // wait function for loader
    const wait = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };

    // searches for data for the location
    // same as async function handleSearch () {...
    const handleSearch = async() => {
        try {
            setError(""); // clear old error before searching again 
            setLoader(true); // loader true

            // get weather data for the typed location
            const [data] = await Promise.all ([
                getWeatherByCity(location),
                wait(1000),
            ]);

            // save the weather data in state
            setWeather(data);
            console.table(data);

            // loader false after data shown
            setLoader(false);
            
            // clear the input value
            setLocation("");

        } catch(err) {
            // if something goes wrong, remove old weather data
            setWeather(null);

            // remove loader
            setLoader(false);
            
            // show error
            setError(err.message);
        }
    }

    const displayTime = () => {
        const time = dayjs().tz(weather.timezone);

        return time.format("HH:mm");
    }

    // return displays everything in the app inside
    return (
        <main className="app">
            <Container size="lg" className="weather-container">
                <section className="hero-section">
                    <p className="subtitle-top">Simple Weather Search</p>

                    <h1>Weather App</h1>

                    <p className="subtitle-bottom">Check current weather for any city. Enter the name of the city in the search bar.</p>
                </section>
            
            
                {/* Search input and button */}
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
                    {/* Button and TextInput are in uppercase because they are imported from Mantine */}
                        <Button 
                            onClick={handleSearch} 
                            className="glass-button" 
                            size="md"
                            variant="default"
                        >
                            Search
                        </Button>
                    </Grid.Col>
                </Grid>


                {error && <p className="error">{error}</p>}
                
                {/* learning conditional rendering
                {error || <p className="error">{"no error"}</p>}
                */}

                {/* {loader == true ? <p>{"Loading..."}</p> : <p>{"Not loading"}</p>} */}
                {/* {loader ? <p>{"Loading..."}</p> : null} */}

                {loader && (
                    <div className="loader-wrapper">
                        <Loader color="white" size="lg" type="dots" className="loader" />
                    </div>
                    )}
                
                
                
            
                {/* show weather cards only when weather data exists */}
                {weather && !loader && (
                    <> {/*<> lets you group elements without a wrapper node */}
                        <h2 className="result-title">
                            Weather in {weather.city}, {weather.country}
                        </h2>

                        <h2 className="result-time">
                            {displayTime()}
                        </h2>

                        {/* grid system: 
                        base: 12 = mobile, 1 per row
                        sm: 6 = tablet, 2 per row
                        lg: 4 = large desktop, 3 per row 
                        */}
                        
                        <Grid gutter="md" className="cards">
                            <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 3 }}>
                                <WeatherCard title="Temperature" value={weather.temperature} unit="°C" />
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 3 }}>
                                <WeatherCard title="Feels Like" value={weather.feelsLike} unit="°C" />
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 3 }}>
                                <WeatherCard title="Humidity" value={weather.humidity} unit="%" />
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 3 }}>
                                <WeatherCard title="Rain" value={weather.rain} unit="mm" />
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 3 }}>
                                <WeatherCard title="Precipitation" value={weather.precipitationChance} unit="%"/>
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 3 }}>
                                <WeatherCard title="Wind" value={weather.windSpeed} unit="km/h" />
                            </Grid.Col>
                        </Grid>
                    </>
                )}
            </Container>
        </main>
    );
}

export default App;
    
    
