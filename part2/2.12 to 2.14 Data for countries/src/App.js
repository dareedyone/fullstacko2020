import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [filterResult, setfilterResult] = useState([]);
  const [country, setCountry] = useState([]);
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => setCountries(res.data))
      .catch((err) => console.log(err));
  }, []);
  const handleChange = (e) => {
    const re = new RegExp(e.target.value, "i");
    const match = countries.filter((country) => re.test(country.name));
    if (match.length === 1) {
      setfilterResult([]);
      getWeather(match[0].capital).then((res) =>
        setCountry([{ ...match[0], weather: res }])
      );
    } else if (match.length > 10) {
      setfilterResult([{ name: "Too many searches, specify another filter" }]);
      setCountry([]);
    } else {
      setfilterResult(match);
      setCountry([]);
    }
  };

  const getWeather = (query) => {
    let api_key = process.env.REACT_APP_API_KEY;
    return axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${query}`
      )
      .then((res) => res.data);
  };

  const handleShow = (country) => {
    setCountry([country]);
    setfilterResult([]);
  };

  return (
    <>
      <div>
        <div>
          Find Countries: <input onChange={handleChange} type="text" />
        </div>
        <div>
          {filterResult.map((country, i) => (
            <p key={i}>
              {country.name}{" "}
              {country.name === "Too many searches, specify another filter" ? (
                ""
              ) : (
                <button onClick={() => handleShow(country)}>show</button>
              )}
            </p>
          ))}

          {country.length === 1 && (
            <>
              <h3>{country[0].name}</h3>
              <p>Capital {country[0].capital}</p>
              <p>Population {country[0].population}</p>
              <h4>Languages</h4>
              <ul>
                {country[0].languages.map((language, i) => (
                  <li key={i}>{language.name}</li>
                ))}
              </ul>

              <img
                style={{ width: "100px", height: "100px" }}
                src={country[0].flag}
                alt="flag"
              />

              <h3>Weather in {country[0].capital}</h3>
              <p>
                <strong>Temperature:</strong>{" "}
                {country[0].weather.current.temperature} Celcius
              </p>
              <img
                style={{ width: 60, height: 70 }}
                src={country[0].weather.current.weather_icons}
                alt="weather icon"
              />
              <p>
                <strong>Wind:</strong> {country[0].weather.current.wind_speed}{" "}
                SSW
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
