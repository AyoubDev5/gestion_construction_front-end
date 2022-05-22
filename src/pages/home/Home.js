import React, { Component } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import axios from "axios";
import { URL_NODE_API } from "../../Constant";
import { MoreVert } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggle: false,
      salEmpl: 0,
      empls: [],
      materiels: [],
      prix: 0,
      sal: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
      isToggle: !this.state.isToggle,
    });
  }
  componentDidMount() {
    axios
      .get(URL_NODE_API + `/empls/${this.props.match.params.idTache}`, {})
      .then((response) => {
        this.setState({
          empls: response.data,
        });
        // console.log("empls", response.data);
      });
    axios
      .get(URL_NODE_API + `/materiels/${this.props.match.params.idTache}`, {})
      .then((response) => {
        this.setState({
          materiels: response.data,
        });
        // console.log("materiels", response.data[2]);
      });
    axios
      .get(
        URL_NODE_API +
          `/prixTache/${this.props.match.params.idProjet}/${this.props.match.params.idTache}`,
        {}
      )
      .then((response) => {
        this.setState({
          prix: response.data[0].sum,
        });
        // console.log("prix", response.data[0].sum);
      });
    axios
      .get(
        URL_NODE_API +
          `/prixMaterial/${this.props.match.params.idProjet}/${this.props.match.params.idTache}`,
        {}
      )
      .then((response) => {
        this.setState({
          sal: response.data[0].sum,
        });
        // console.log("sal", response.data);
      });
    axios
      .get(
        URL_NODE_API +
          `/salEmpl/${this.props.match.params.idProjet}/${this.props.match.params.idTache}`,
        {}
      )
      .then((response) => {
        this.setState({
          salEmpl: response.data[0].sum,
        });
        // console.log("salEmpl", response.data);
      });
  }

  render() {
    return (
      <div className="home">
        {/* <FeaturedInfo /> */}
        <div className="featured">
          <div className="featuredItem">
            <span className="featuredTitle">سعر المهمة</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney"> {this.state.prix} MAD</span>
              <span className="featuredMoneyRate">
                {/* -11.4 <ArrowDownward className="featuredIcon negative" /> */}
              </span>
            </div>
          </div>
          <div className="featuredItem">
            <span className="featuredTitle">سعر المواد</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney"> {this.state.sal} MAD</span>
              <span className="featuredMoneyRate">
                {/* -1.4 <ArrowDownward className="featuredIcon negative" /> */}
              </span>
            </div>
          </div>
          <div className="featuredItem">
            <span className="featuredTitle"> رواتب الموظفين</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney"> {this.state.salEmpl} MAD</span>
              <span className="featuredMoneyRate">
                {/* {this.state.salEmpl < 0 ? (
                  <ArrowDownward className="featuredIcon negative" />
                ) : (
                  <ArrowUpward className="featuredIcon" />
                )} */}
              </span>
            </div>
            {/* <span className="featuredSub">
              مقارنة بين سعر المهمة سعر المواد و راتب الموظفين
            </span> */}
          </div>
        </div>

        <Chart data={""} title="User Analytics" grid dataKey="Active User" />

        <div className="homeWidgets">
          <div className="widgetSm">
            <span className="widgetSmTitle">
              قائمة المواد
              <Link
                className="moreMaterial"
                to={`/${this.props.match.params.idProjet}/${this.props.match.params.idTache}/materiels`}
              >
                <MoreVert />
              </Link>
            </span>
            <ul className="widgetSmList">
              {this.state.materiels.map((materiel) => (
                <WidgetSm materiel={materiel} {...this.props} />
              ))}
            </ul>
          </div>

          <div className="widgetLg">
            <h3 className="widgetLgTitle">
              قائمة االعمال
              <Link
                className="moreEmpl"
                to={`/${this.props.match.params.idProjet}/${this.props.match.params.idTache}/employes`}
              >
                <MoreVert />
              </Link>
            </h3>
            <table className="widgetLgTable">
              <tr className="widgetLgTr">
                <th className="widgetLgTh">المدة</th>
                <th className="widgetLgTh">الراتب</th>
                <th className="widgetLgTh">االعمال</th>
              </tr>
              {this.state.empls.map((empl) => (
                <WidgetLg empl={empl} {...this.props} />
              ))}
            </table>
          </div>
        </div>
      </div>
    );
  }
}
