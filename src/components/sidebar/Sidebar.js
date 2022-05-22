import React, { Component } from "react";
import {
  LineStyle,
  PermIdentity,
  Storefront,
  BarChart,
  MailOutline,
  ChatBubbleOutline,
  Home,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import "./sidebar.css";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taches: [],
      idTaches: 0,
    };
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">لوحة القيادة</h3>
            <ul className="sidebarList">
              <Link to="/" className="link">
                <li className="sidebarListItem active">
                  <LineStyle className="sidebarIcon" />
                  القائمة
                </li>
              </Link>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">القائمة السريعة</h3>
            {/* <ul className="sidebarList">
              <Link to={`/154/employes`} className="link">
                <li className="sidebarListItem">
                  <PermIdentity className="sidebarIcon" />
                  العمال
                </li>
              </Link>
              <Link to="/materiels" className="link">
                <li className="sidebarListItem">
                  <Storefront className="sidebarIcon" />
                  المواد
                </li>
              </Link>
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                تقارير
              </li>
            </ul> */}
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">اشعارات</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem">
                <MailOutline className="sidebarIcon" />
                  بريد  
              </li>
              <li className="sidebarListItem">
                <ChatBubbleOutline className="sidebarIcon" />
                رسائل
              </li>
            </ul>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
