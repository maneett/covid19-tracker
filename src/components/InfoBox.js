import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox(props) {
  return (
    <Card
      className={`infoBox ${props.active && "infoBox--selected"} ${
        props.isRed && "infoBox--red"
      }`}
      onClick={props.onClick}
    >
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {props.title}
        </Typography>
        <h2
          className={`infoBox__cases ${
            !props.isRed && "infoBox__cases--green"
          }`}
        >
          {props.cases}
        </h2>
        <Typography className="infoBox__total">{props.total} Total</Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
