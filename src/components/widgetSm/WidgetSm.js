import React, { Component } from "react";
import { RemoveShoppingCart, ShoppingCart } from "@material-ui/icons";
import axios from "axios";
import "./widgetSm.css";

export default class WidgetSm extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggle: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({ isToggle: !this.state.isToggle });
  }
  render() {
    const { id_materiel, type_materiel, prix_unitaire, quantite } =
      this.props.materiel;
    return (
      <li className="widgetSmListItem" key={id_materiel}>
        <div className="widgetSmUser">
          <span className="widgetSmUsername">{type_materiel}</span>
          <span className="widgetSmUserTitle">
            {prix_unitaire * quantite} DH
          </span>
        </div>
        <button
          className="widgetSmButton"
          onClick={this.handleClick}
          style={{ background: this.state.isToggle ? "#8FBC8F" : "#B22222" }}
        >
          {this.state.isToggle ? (
            <ShoppingCart className="widgetSmIcon" />
          ) : (
            <RemoveShoppingCart className="widgetSmIcon" />
          )}
          Display
        </button>
      </li>
    );
  }
}
