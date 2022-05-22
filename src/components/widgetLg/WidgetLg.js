import React, { Component } from "react";
import axios from "axios";
import "./widgetLg.css";

export default class WidgetLg extends Component {
  render() {
    const { id_empl, fname, lname, date_fin, date_debut, price } =
      this.props.empl;
    return (
      <>
        <tr className="widgetLgTr" key={id_empl}>
          <td className="widgetLgAmount">{price}DH</td>
          <td className="widgetLgDate">
            <span>{date_fin}</span>
            -//-
            <span>{date_debut}</span>
          </td>
          <td className="widgetLgUser">
            <span className="widgetLgName">
              {fname}
              {lname}
            </span>
          </td>
        </tr>
        <hr />
      </>
    );
  }
}
