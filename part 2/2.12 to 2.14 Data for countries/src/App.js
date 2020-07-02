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
      setCountry(match);
    } else if (match.length > 10) {
      setfilterResult([{ name: "Too many searches, specify another filter" }]);
      setCountry([]);
    } else {
      setfilterResult(match);
      setCountry([]);
    }
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
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
