import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import { Card, CardContent } from "@material-ui/core";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";
import "leaflet/dist/leaflet.css";
import { prettyPrintStat } from "./util";
import numeral from "numeral";

function App() {
  const [data, setData] = useState({});
  const [tabelData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

  const getdata = (data) => {
    setData(data);
  };
  const tableDataHandler = (data) => {
    setTableData(data);
  };
  const locationHandler = (location) => {
    setMapCenter(location);
  };
  const zoomHandler = (zoom) => {
    setMapZoom(zoom);
  };
  const countryData = (data) => {
    setMapCountries(data);
  };
  console.log(mapCountries);
  return (
    <div className="app">
      <div className="app__left">
        <Header
          data={getdata}
          tableDataForward={tableDataHandler}
          onChangeLocation={locationHandler}
          onChangeLocationZoom={zoomHandler}
          mapCountrydata={countryData}
        />

        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(data.todayCases)}
            total={numeral(data.cases).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(data.todayRecovered)}
            total={numeral(data.recovered).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(data.todayDeaths)}
            total={numeral(data.deaths).format("0.0a")}
          />
        </div>
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tabelData} />
          <h3>Wordwide new {casesType}</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
