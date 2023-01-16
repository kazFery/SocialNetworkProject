import { Fragment, useState } from "react";
import Search from "./Search-City/search";
import CurrentWeather from "./weather/current-weather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./Search-City/api";
import Forecast from "./weather/forecast";
import News from "./News/News";

export default function Sidebar() {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);

    const handleOnSearchChnage = (searchData) => {
        const [lat, lon] = searchData.value.split(" ");

        const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
        const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

        Promise.all([currentWeatherFetch, forecastFetch])
            .then(async (response) => {
                const weatherResponse = await response[0].json();
                const forecastResponse = await response[1].json();

                setCurrentWeather({ city: searchData.label, ...weatherResponse });
                setForecast({ city: searchData.label, ...forecastResponse });
            })
            .catch((err) => console.log(err));
    }

    console.log(currentWeather);
    console.log(forecast);

    return (
        <Fragment>
            <div className="col-md-3 p-2 mt-3">
                <h4 className="fw-bold mb-0">Weather</h4>
                <hr className="mt-0" />
                <Search onSearchChange={handleOnSearchChnage} />
                {currentWeather && <CurrentWeather data={currentWeather} />}
                {forecast && <Forecast data={forecast} />}
                <h4 className="fw-bold mb-0 mt-4">News</h4>
                <hr className="mt-0" />
                <News />
            </div>
        </Fragment>
    )
}