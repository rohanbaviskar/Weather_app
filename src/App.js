import "./App.css";
import { useState } from "react";

// Use the URL of the image
const logoUrl = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-1024.png";

const api = {
  key: "43a8a13ad667286177eab50aacb556d8",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(""); 

  const searchPressed = () => {
    setError("");

    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("City not found");
        }
        return res.json();
      })
      .then((result) => {
        setWeather(result);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Logo on the left side */}
        <div className="logo-container">
          {/* Use the logo URL */}
          <img src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-1024.png" alt="Logo" className="App-logo" />
        </div>

        {/* HEADER  */}
        <h1>Weather App</h1>

        <div>
          <input
            type="text"
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-button" onClick={searchPressed}>Search</button>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {typeof weather.main !== "undefined" && !error ? (
          <div>
            <p>{weather.name}</p>
            <p>{weather.main.temp}°C</p>
            <p>{weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>
          </div>
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default App;
