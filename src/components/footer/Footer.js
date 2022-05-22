import { ArrowBack, ArrowForward } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  const History = useHistory();

  const goBack = () => {
    History.goBack();
  };
  const goForward = () => {
    History.goForward();
  };

  return (
    <div className="container">
      {/* <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
        <button type="button" className="button">
          <span onClick={goBack} class="button__text">
            <ArrowBack />
            BACK
          </span>
          <span onClick={goForward} class="button__icon">
            Forward
            <ArrowForward />
          </span>
        </button>
      </div> */}
      <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
        <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off"/>
        <label class="btn btn-outline-secondary" for="btncheck1">
          <span onClick={goBack}>
            <ArrowBack />
            BACK
          </span>
        </label>
        <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off"/>
        <label class="btn btn-outline-secondary" for="btncheck2" >
        <span onClick={goForward}>
            Forward
            <ArrowForward />
          </span>
        </label>
      </div>
      {/* <button onClick={goBack}>
        <ArrowBack />
        BACK
      </button>
      <button onClick={goForward}>
        Forward
        <ArrowForward />
      </button> */}
    </div>
  );
}
