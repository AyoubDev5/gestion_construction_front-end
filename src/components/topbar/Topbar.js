import React from "react";
import dark_logo from "../../images/dark_logo.png";
import light_logo from "../../images/light_logo.png";
import { Language } from "@material-ui/icons";
import "./topbar.css";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";

export default function Topbar(props) {
  return (
    <nav className={props.darkMode ? "dark" : "topbar"}>
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/">
            <img
              src={props.darkMode ? dark_logo : light_logo}
              alt="logo"
              className="logo"
            />
          </Link>
          {/* <span className="logo">HOME TEAM</span> */}
        </div>
        <div className="topRight">
          <div className="toggler">
            <p className="toggler--light">Light</p>
            <div className="toggler--slider" onClick={props.toggleDarkMode}>
              <div className="toggler--slider--circle"></div>
            </div>
            <p className="toggler--dark">Dark</p>
          </div>
          <div className="topbarIconContainer">
            <Footer />
          </div>
          {/* <img src={pers} alt="صورة " className="topAvatar" /> */}
        </div>
      </div>
    </nav>
  );
}
