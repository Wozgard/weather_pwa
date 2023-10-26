import { useState } from "react";
import "./App.css";
import { fetchWeather } from "./api/fetchWeather";
import { fetchPhotos } from "./api/featchBG";

const defaultBackground = './images/bg.jpg'

function App() { 
  const [query, setQuery] = useState("");
  const [background, setBackground] = useState(defaultBackground);
  const [weather, setWeather] = useState({
    name: "",
    weather: [{description: ""}],
  });
  const [weatherNotFound, setWeatherNotFound] = useState(false);

  const search = async (e) => {
    if (e.key === "Enter") {
      const res = await fetchWeather(query);

      if (res.status === 200) {
        setWeatherNotFound(false);
        setWeather(res.data);
        const queryBG = query + " " + res.data.name + " " + res.data.weather[0].description;
        const bg = await fetchPhotos(queryBG);
        setBackground(bg);
      } else {
        setWeather({});
        setWeatherNotFound(true);
      }
      setQuery("");
    }
  };
  return (
    <div
      className="main-container"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.418)), url(${background}) 0 0/cover no-repeat`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <input
        type="text"
        className="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={search}
      />
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
      {weatherNotFound && (
        <div className="city">
          <h2 className="city-name">
            <span>City not found</span>
          </h2>
        </div>
      )}
    </div>
  );
}

export default App;
