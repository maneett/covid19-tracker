import React from "react";
import "./Table.css";
import { prettyPrintStat } from "../util";

function Table(props) {
  return (
    <div className="table">
      {props.countries.map((country) => (
        <tr>
          <td>{country.country}</td>
          <td>{prettyPrintStat(country.cases)}</td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
