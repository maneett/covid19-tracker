import React from "react";
import { useState, useEffect } from "react";
import "../App.css";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import { sortData } from "../util";

function Header(props) {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tabledata, setTableData] = useState([]);
  const [location, setLocation] = useState({ lat: 34.80746, lng: -40.4796 });
  const [zoom, setZoom] = useState(3);
  const [mapcountry, setMapCountry] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          setCountries(countries);
          setTableData(sortedData);
          setMapCountry(data);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
    const url =
      countryCode === "Worldwide"
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url).then((response) =>
      response.json().then((data) => {
        setCountryInfo(data);
        setLocation([data.countryInfo.lat, data.countryInfo.long]);
        setZoom(4);
      })
    );
  };
  console.log(countryInfo);
  props.data(countryInfo);
  props.tableDataForward(tabledata);
  props.onChangeLocation(location);
  props.onChangeLocationZoom(zoom);
  props.mapCountrydata(mapcountry);
  return (
    <div className="app__header">
      <h1>COVID-19 Tracker</h1>
      <FormControl className="app__dropdown">
        <Select variant="outlined" value={country} onChange={onCountryChange}>
          <MenuItem value="Worldwide">Worldwide</MenuItem>
          {countries.map((country) => (
            <MenuItem value={country.value}>{country.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Header;
